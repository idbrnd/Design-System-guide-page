import { useState } from 'react'
import { FillButton, Modal, Popup } from '@idbrnd/design-system'
import type { ModalSize } from '@idbrnd/design-system'

/** Modal 데모 — size 프리셋별로 열어 본다. */
export function ModalDemo() {
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState<ModalSize>('medium')

  const openWithSize = (next: ModalSize) => {
    setSize(next)
    setOpen(true)
  }

  return (
    <>
      <FillButton onClick={() => openWithSize('small')}>small 모달</FillButton>
      <FillButton onClick={() => openWithSize('medium')}>medium 모달</FillButton>
      <FillButton onClick={() => openWithSize('large')}>large 모달</FillButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        heading="모달 타이틀"
        mainAction={{ label: '확인', onClick: () => setOpen(false) }}
        subAction={{ label: '취소', onClick: () => setOpen(false) }}
      >
        <p style={{ margin: 0 }}>
          모달 콘텐츠 영역입니다. 임의의 ReactNode를 children으로 전달합니다.
        </p>
      </Modal>
    </>
  )
}

/** Popup 데모 — variant·액션 색상 조합별로 열어 본다. */
export function PopupDemo() {
  const [openBasic, setOpenBasic] = useState(false)
  const [openText, setOpenText] = useState(false)
  const [openError, setOpenError] = useState(false)

  return (
    <>
      <FillButton onClick={() => setOpenBasic(true)}>basic 팝업</FillButton>
      <FillButton variant="assistive" onClick={() => setOpenText(true)}>
        text 팝업
      </FillButton>
      <FillButton variant="error" onClick={() => setOpenError(true)}>
        파괴적 액션 확인
      </FillButton>

      <Popup
        open={openBasic}
        onClose={() => setOpenBasic(false)}
        heading="변경 사항을 저장할까요?"
        body="저장하지 않으면 지금까지의 수정 내용이 사라집니다."
        mainAction={{ label: '저장', onClick: () => setOpenBasic(false) }}
        subAction={{ label: '취소', onClick: () => setOpenBasic(false) }}
      />
      <Popup
        open={openText}
        onClose={() => setOpenText(false)}
        variant="text"
        heading="알림을 켤까요?"
        body="언제든지 설정에서 변경할 수 있습니다."
        mainAction={{ label: '켜기', onClick: () => setOpenText(false) }}
        subAction={{ label: '나중에', onClick: () => setOpenText(false) }}
      />
      <Popup
        open={openError}
        onClose={() => setOpenError(false)}
        heading="게시글을 삭제할까요?"
        body="삭제한 게시글은 복구할 수 없습니다."
        mainAction={{ label: '삭제', variant: 'error', onClick: () => setOpenError(false) }}
        subAction={{ label: '취소', onClick: () => setOpenError(false) }}
      />
    </>
  )
}
