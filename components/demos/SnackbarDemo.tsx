import { FillButton, OutlineButton, dismissSnackbar, showSnackbar } from '@idbrnd/design-system'

/** Snackbar 데모 — 버튼 클릭 시 showSnackbar/dismissSnackbar를 호출한다. */
export default function SnackbarDemo() {
  return (
    <>
      <FillButton
        onClick={() =>
          showSnackbar({
            heading: '저장되었습니다.',
            description: '변경 사항이 서버에 반영되었습니다.',
          })
        }
      >
        기본 스낵바
      </FillButton>
      <FillButton
        variant="assistive"
        onClick={() =>
          showSnackbar({
            heading: '메시지가 삭제되었습니다.',
            actionLabel: '실행 취소',
            onActionClick: () => dismissSnackbar(),
            closeButton: true,
          })
        }
      >
        액션 버튼 포함
      </FillButton>
      <FillButton
        variant="assistive"
        onClick={() =>
          showSnackbar({
            variant: 'loading',
            heading: '업로드 중...',
            description: '잠시 기다려 주세요.',
          })
        }
      >
        로딩 스낵바
      </FillButton>
      <OutlineButton variant="assistive" onClick={() => dismissSnackbar()}>
        스낵바 닫기
      </OutlineButton>
    </>
  )
}
