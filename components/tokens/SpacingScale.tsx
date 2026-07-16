import { tokens } from '../../lib/tokens'
import { copyWithToast } from '../copy'

function Row({ name, varName, resolved }: { name: string; varName: string; resolved: string }) {
  const px = parseFloat(resolved)
  return (
    <button
      type="button"
      onClick={() => copyWithToast(`var(${varName})`)}
      title={`클릭하여 var(${varName}) 복사`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        width: '100%',
        padding: '6px 8px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        font: 'inherit',
        textAlign: 'left',
      }}
    >
      <code style={{ width: 180, flexShrink: 0, fontSize: 13 }}>{varName}</code>
      <span style={{ width: 64, flexShrink: 0, fontSize: 13, color: '#6b7280' }}>
        {resolved}
      </span>
      <span
        style={{
          height: 16,
          width: Math.min(px, 480),
          background: 'var(--main-50, #4a71ff)',
          borderRadius: 3,
          flexShrink: 0,
        }}
      />
    </button>
  )
}

/** px 스케일 (--1 ~ --999) */
export function DimensionScale() {
  const items = [...tokens.dimension].sort(
    (a, b) => parseFloat(a.resolved) - parseFloat(b.resolved),
  )
  return (
    <div style={{ margin: '1.5rem 0' }}>
      {items.map((t) => (
        <Row key={t.name} name={t.name} varName={t.varName} resolved={t.resolved} />
      ))}
    </div>
  )
}

/** 레이아웃 토큰 (margin / gutter / spacing 등) */
export function LayoutScale() {
  return (
    <div style={{ margin: '1.5rem 0' }}>
      {tokens.layout.map((t) => (
        <Row key={t.name} name={t.name} varName={t.varName} resolved={t.resolved} />
      ))}
    </div>
  )
}
