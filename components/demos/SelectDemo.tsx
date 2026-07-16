import { useState } from 'react'
import { BellIcon, PersonIcon, Select, SettingIcon } from '@idbrnd/design-system'
import type { DropdownOption } from '@idbrnd/design-system'

const fruitOptions: DropdownOption[] = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '포도', value: 'grape' },
]

const iconOptions: DropdownOption[] = [
  { label: '프로필', value: 'profile', icon: <PersonIcon size={16} /> },
  { label: '알림', value: 'notification', icon: <BellIcon size={16} /> },
  { label: '설정', value: 'setting', icon: <SettingIcon size={16} /> },
]

const disabledOptions: DropdownOption[] = [
  { label: '사용 가능', value: 'a' },
  { label: '선택 불가', value: 'b', disabled: true },
  { label: '사용 가능', value: 'c' },
]

/** 기본 Select 데모 */
export function BasicSelectDemo() {
  const [selected, setSelected] = useState<DropdownOption | null>(null)

  return (
    <div style={{ width: 240 }}>
      <Select
        heading="과일 선택"
        placeholder="선택해주세요."
        options={fruitOptions}
        selectedValue={selected}
        onSelect={setSelected}
      />
    </div>
  )
}

/** 검색 + 아이콘 표시 Select 데모 */
export function SearchSelectDemo() {
  const [selected, setSelected] = useState<DropdownOption | null>(null)

  return (
    <div style={{ width: 240 }}>
      <Select
        heading="검색 가능한 셀렉트"
        required
        type="search"
        content
        options={iconOptions}
        selectedValue={selected}
        onSelect={setSelected}
      />
    </div>
  )
}

/** 에러 상태 Select 데모 */
export function ErrorSelectDemo() {
  const [selected, setSelected] = useState<DropdownOption | null>(null)

  return (
    <div style={{ width: 240 }}>
      <Select
        heading="필수 항목"
        variant="error"
        description="항목을 선택해주세요."
        options={fruitOptions}
        selectedValue={selected}
        onSelect={setSelected}
      />
    </div>
  )
}

/** 특정 옵션 비활성화 Select 데모 */
export function DisabledOptionSelectDemo() {
  const [selected, setSelected] = useState<DropdownOption | null>(null)

  return (
    <div style={{ width: 240 }}>
      <Select
        heading="옵션 비활성화"
        options={disabledOptions}
        selectedValue={selected}
        onSelect={setSelected}
      />
    </div>
  )
}
