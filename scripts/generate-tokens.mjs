// node_modules/@idbrnd/design-system/dist/tokens.css 를 파싱해
// lib/tokens.generated.json 을 생성한다. (prebuild 훅에서 실행)
// 설치된 패키지 버전과 문서가 항상 동기화되도록 하는 것이 목적.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const cssPath = join(root, 'node_modules/@idbrnd/design-system/dist/tokens.css')
const outPath = join(root, 'lib/tokens.generated.json')

const css = readFileSync(cssPath, 'utf8')

// 1) --name: value; 쌍 추출 (주석 제거)
const raw = new Map()
const declRe = /--([\w-]+)\s*:\s*([^;]+);/g
for (const [, name, value] of css.matchAll(declRe)) {
  raw.set(name, value.replace(/\/\*[\s\S]*?\*\//g, '').trim())
}

// 2) var(--x) 참조 해석 (표시용 resolved 값)
function resolve(value, depth = 0) {
  if (depth > 10) return value
  return value.replace(/var\(--([\w-]+)\)/g, (m, ref) =>
    raw.has(ref) ? resolve(raw.get(ref), depth + 1) : m,
  )
}

const entries = [...raw.entries()]
  .filter(([name]) => !name.endsWith('-rgb')) // -rgb 보조 변수 제외
  .map(([name, value]) => ({
    name,
    varName: `--${name}`,
    value,
    resolved: resolve(value),
  }))

const byPrefix = (prefix) =>
  entries.filter((e) => e.name.startsWith(`${prefix}-`))

// 3) 그룹핑
const paletteNames = ['main', 'gray', 'green', 'red', 'blue', 'orange']
const palette = Object.fromEntries(
  paletteNames.map((p) => [
    p,
    byPrefix(p).filter((e) => /^\d+$/.test(e.name.slice(p.length + 1))),
  ]),
)

const typographyAtoms = ['default', 'semibold600', 'regular400', 'light300']

const tokens = {
  palette,
  category: byPrefix('category'),
  alpha: byPrefix('alpha').filter((e) => e.name !== 'alpha'),
  semantic: byPrefix('semantic'),
  interaction: byPrefix('interaction'),
  etc: entries.filter(
    (e) =>
      ['black', 'white', 'alpha'].includes(e.name) ||
      e.name.startsWith('dim-') ||
      e.name.startsWith('opacity') ||
      e.name.startsWith('inv-opacity') ||
      e.name.startsWith('component-'),
  ),
  typography: byPrefix('text').map((e) => {
    // 값 형태: var(--semibold600) 56px var(--default) → weight / size / family
    const m = e.resolved.match(/^(\d+)\s+([\d.]+px)\s+(.+)$/)
    return {
      ...e,
      fontWeight: m?.[1] ?? '',
      fontSize: m?.[2] ?? '',
      fontFamily: m?.[3] ?? '',
    }
  }),
  dimension: entries.filter((e) => /^\d+$/.test(e.name)),
  layout: byPrefix('layout'),
  radius: byPrefix('radius'),
  shadow: byPrefix('shadow-level'),
}

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, JSON.stringify(tokens, null, 2))

const count = Object.values(tokens).reduce(
  (n, v) => n + (Array.isArray(v) ? v.length : Object.values(v).flat().length),
  0,
)
console.log(`✓ tokens.generated.json — ${count}개 토큰 (원본 변수 ${raw.size}개)`)
