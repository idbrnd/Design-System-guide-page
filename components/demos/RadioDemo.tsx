import { useState } from 'react'
import { Radio } from '@idbrnd/design-system'

/** 그룹: checked 비교로 단일 선택을 직접 제어 */
export function RadioGroupDemo() {
  const [selected, setSelected] = useState('A')

  return (
    <>
      {['A', 'B', 'C'].map((v) => (
        <Radio
          key={v}
          name="radio-demo"
          value={v}
          checked={selected === v}
          onChange={(isChecked) => isChecked && setSelected(v)}
        >
          Option {v}
        </Radio>
      ))}
    </>
  )
}
