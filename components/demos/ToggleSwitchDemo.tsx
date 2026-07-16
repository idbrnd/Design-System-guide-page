import { useState } from 'react'
import { ToggleSwitch } from '@idbrnd/design-system'

/** 기본 + 크기: 하나의 상태를 세 가지 크기로 표시 */
export function ToggleSwitchBasicDemo() {
  const [active, setActive] = useState(false)

  return (
    <>
      <ToggleSwitch size="large" active={active} onChange={setActive} />
      <ToggleSwitch active={active} onChange={setActive} />
      <ToggleSwitch size="small" active={active} onChange={setActive} />
    </>
  )
}
