import { tokens } from '../../lib/tokens'
import { copyWithToast } from '../copy'

/** 라운드(border-radius) 토큰 미리보기 */
export function RadiusScale() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 16,
        margin: '1.5rem 0',
      }}
    >
      {tokens.radius.map((t) => (
        <button
          key={t.name}
          type="button"
          onClick={() => copyWithToast(`var(${t.varName})`)}
          title={`클릭하여 var(${t.varName}) 복사`}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            font: 'inherit',
            padding: 0,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              display: 'block',
              height: 72,
              background: 'var(--main-10, #edf1ff)',
              border: '2px solid var(--main-50, #4a71ff)',
              borderRadius: t.resolved,
              marginBottom: 8,
            }}
          />
          <code style={{ fontSize: 12 }}>{t.varName}</code>
          <span style={{ display: 'block', fontSize: 12, color: '#6b7280' }}>
            {t.value} → {t.resolved}
          </span>
        </button>
      ))}
    </div>
  )
}

/** 그림자(shadow-level) 토큰 미리보기 */
export function ShadowScale() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 24,
        margin: '1.5rem 0',
        padding: 8,
      }}
    >
      {tokens.shadow.map((t) => (
        <button
          key={t.name}
          type="button"
          onClick={() => copyWithToast(`var(${t.varName})`)}
          title={`클릭하여 var(${t.varName}) 복사`}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            font: 'inherit',
            padding: 0,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              display: 'block',
              height: 88,
              background: '#fff',
              borderRadius: 12,
              boxShadow: t.resolved,
              marginBottom: 10,
            }}
          />
          <code style={{ fontSize: 12 }}>{t.varName}</code>
        </button>
      ))}
    </div>
  )
}
