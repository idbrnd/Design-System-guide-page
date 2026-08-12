import { useState } from 'react'
import { TertiaryButton, Textarea } from '@idbrnd/design-system'

/** Textarea 기본 데모 — controlled 값 + 안내 문구. */
export function TextareaBasicDemo() {
  const [value, setValue] = useState('')

  return (
    <Textarea
      headingContent="문의 내용"
      placeholder="문의하실 내용을 입력해 주세요."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      description="접수 후 영업일 기준 2일 이내에 답변드립니다."
    />
  )
}

/** Textarea 상태 데모 — error / success / disabled. */
export function TextareaStatesDemo() {
  const [error, setError] = useState('금지어가 포함된 문장')
  const [success, setSuccess] = useState('검증을 통과한 문장입니다.')

  return (
    <>
      <Textarea
        headingContent="에러 상태"
        value={error}
        onChange={(e) => setError(e.target.value)}
        errorMessage="사용할 수 없는 단어가 포함되어 있습니다."
      />
      <Textarea
        headingContent="성공 상태"
        variant="success"
        value={success}
        onChange={(e) => setSuccess(e.target.value)}
        successMessage="사용할 수 있는 문장입니다."
      />
      <Textarea headingContent="비활성화" value="수정할 수 없는 값" onChange={() => {}} disabled />
    </>
  )
}

/** Textarea 하단 영역 데모 — 글자 수 카운터 + 보조 액션 슬롯. */
export function TextareaBottomDemo() {
  const [value, setValue] = useState('')

  return (
    <Textarea
      headingContent="자기소개"
      placeholder="자신을 소개하는 글을 작성해 주세요."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      minRows={4}
      bottom
      leadingContent
      maxLength={100}
      trailingContent={<TertiaryButton size="small">등록</TertiaryButton>}
    />
  )
}
