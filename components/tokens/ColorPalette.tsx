import { tokens, type TokenEntry } from '../../lib/tokens'
import { copyWithToast } from '../copy'

function Swatch({ token, showRef }: { token: TokenEntry; showRef?: boolean }) {
  const isRef = token.value.startsWith('var(')
  return (
    <button
      type="button"
      onClick={() => copyWithToast(`var(${token.varName})`)}
      title={`클릭하여 var(${token.varName}) 복사`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        padding: '6px 8px',
        border: 'none',
        borderRadius: 6,
        background: 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        font: 'inherit',
      }}
    >
      <span
        style={{
          width: 48,
          height: 32,
          flexShrink: 0,
          borderRadius: 6,
          border: '1px solid rgba(0,0,0,0.08)',
          background: token.resolved,
          // 투명 색상 확인용 체커보드
          backgroundImage:
            token.resolved.includes('rgba')
              ? `linear-gradient(${token.resolved}, ${token.resolved}), repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%)`
              : undefined,
          backgroundSize: token.resolved.includes('rgba') ? 'auto, 12px 12px' : undefined,
        }}
      />
      <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <code style={{ fontSize: 13 }}>{token.varName}</code>
        <span style={{ fontSize: 12, color: '#6b7280' }}>
          {showRef && isRef ? `${token.value} → ` : ''}
          {token.resolved}
        </span>
      </span>
    </button>
  )
}

function Grid({ items, showRef }: { items: TokenEntry[]; showRef?: boolean }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 4,
        margin: '1rem 0 2rem',
      }}
    >
      {items.map((t) => (
        <Swatch key={t.name} token={t} showRef={showRef} />
      ))}
    </div>
  )
}

/** 팔레트 스케일 (main / gray / green / red / blue / orange) */
export function PaletteScales() {
  return (
    <>
      {Object.entries(tokens.palette).map(([group, items]) => (
        <section key={group}>
          <h3 style={{ margin: '1.5rem 0 0', fontSize: 18, fontWeight: 600 }}>
            {group}
          </h3>
          <Grid items={items} />
        </section>
      ))}
    </>
  )
}

/** 시맨틱 컬러 (팔레트 참조 표시 포함) */
export function SemanticColors() {
  return <Grid items={tokens.semantic} showRef />
}

export function CategoryColors() {
  return <Grid items={tokens.category} />
}

export function AlphaColors() {
  return <Grid items={[...tokens.alpha, ...tokens.etc]} showRef />
}

export function InteractionColors() {
  return <Grid items={tokens.interaction} showRef />
}
