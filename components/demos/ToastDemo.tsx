import { FillButton, OutlineButton, dismissToast, showToast } from '@idbrnd/design-system'

/** Toast 데모 — 버튼 클릭 시 showToast/dismissToast를 호출한다. */
export default function ToastDemo() {
  return (
    <>
      <FillButton onClick={() => showToast({ message: '작업이 완료되었습니다.' })}>
        기본 토스트
      </FillButton>
      <FillButton
        variant="assistive"
        onClick={() => showToast({ variant: 'positive', message: '저장되었습니다.' })}
      >
        성공 토스트
      </FillButton>
      <FillButton
        variant="error"
        onClick={() => showToast({ variant: 'negative', message: '오류가 발생했습니다.' })}
      >
        오류 토스트
      </FillButton>
      <OutlineButton variant="assistive" onClick={() => dismissToast()}>
        토스트 닫기
      </OutlineButton>
    </>
  )
}
