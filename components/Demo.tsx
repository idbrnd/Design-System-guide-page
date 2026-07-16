import type { CSSProperties, ReactNode } from 'react'

interface DemoProps {
  children: ReactNode
  /** 프리뷰 영역에 적용할 추가 스타일 (배경색, 정렬 등) */
  style?: CSSProperties
  /** true면 세로 방향 정렬 */
  column?: boolean
}

/**
 * 라이브 데모 프리뷰 박스.
 * 코드는 이 컴포넌트 바로 아래 fenced 코드블록으로 두어
 * Nextra의 하이라이팅·복사 버튼을 그대로 활용한다.
 */
export default function Demo({ children, style, column }: DemoProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: column ? 'column' : 'row',
        flexWrap: 'wrap',
        alignItems: column ? 'stretch' : 'center',
        gap: 12,
        padding: '1.5rem',
        margin: '1.25rem 0 0.5rem',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        background: '#fff',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
