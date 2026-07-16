import { useState } from 'react'
import { CheckBox } from '@idbrnd/design-system'

/** 기본: checked + onChange로 제어 */
export function CheckBoxBasicDemo() {
  const [checked, setChecked] = useState(false)

  return (
    <CheckBox checked={checked} onChange={(value) => setChecked(value)}>
      알림 받기
    </CheckBox>
  )
}
