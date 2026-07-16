import { FillButton } from '@idbrnd/design-system'
import { useRouter } from 'next/router'

/**
 * 랜딩 페이지의 "라이브 렌더링 예시" 버튼.
 * 실제 컴포넌트를 렌더링해 보여주는 동시에, 클릭하면 버튼 문서로 이동한다.
 */
export default function LandingDemoButton() {
  const router = useRouter()
  return (
    <div style={{ display: 'flex', gap: 12, margin: '2rem 0' }}>
      <FillButton
        size="large"
        onClick={() => router.push('/components/buttons')}
      >
        라이브 렌더링 예시
      </FillButton>
    </div>
  )
}
