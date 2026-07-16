import { tokens } from '../../lib/tokens'
import { copyWithToast } from '../copy'

/** 타이포그래피 토큰을 실제 폰트로 렌더링하는 표 */
export default function TypeScale() {
  // display → title → heading → body → label → caption 순으로 크기순 정렬 유지
  const items = [...tokens.typography].sort(
    (a, b) => parseFloat(b.fontSize) - parseFloat(a.fontSize),
  )

  return (
    <div style={{ margin: '1.5rem 0' }}>
      {items.map((t) => (
        <button
          key={t.name}
          type="button"
          onClick={() => copyWithToast(`var(${t.varName})`)}
          title={`클릭하여 var(${t.varName}) 복사`}
          style={{
            display: 'block',
            width: '100%',
            padding: '12px 8px',
            border: 'none',
            borderBottom: '1px solid #f3f4f6',
            background: 'transparent',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <span
            style={{
              display: 'block',
              fontWeight: t.fontWeight,
              fontSize: t.fontSize,
              // style.css 내장 폰트의 실제 @font-face 이름 (토큰의 'Pretendard Variable'과 다름)
              fontFamily: "PretendardMetricAdjusted, 'Pretendard Variable', sans-serif",
              lineHeight: 1.35,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            다람쥐 헌 쳇바퀴에 타고파 Sphinx 0123
          </span>
          <span style={{ fontSize: 12, color: '#6b7280' }}>
            <code>{t.varName}</code> · {t.fontSize} / {t.fontWeight}
          </span>
        </button>
      ))}
    </div>
  )
}
