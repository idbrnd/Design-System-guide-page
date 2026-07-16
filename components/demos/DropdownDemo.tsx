import { useState } from 'react'
import {
  CopyIcon,
  Dropdown,
  FillButton,
  OutlineButton,
  TrashIcon,
  WriteIcon,
} from '@idbrnd/design-system'
import type { DropdownOption } from '@idbrnd/design-system'

const menuOptions: DropdownOption[] = [
  { label: '수정', value: 'edit', icon: <WriteIcon size={16} /> },
  { label: '복제', value: 'duplicate', icon: <CopyIcon size={16} /> },
  { label: '삭제', value: 'delete', icon: <TrashIcon size={16} /> },
]

const disabledOptions: DropdownOption[] = [
  { label: '수정', value: 'edit' },
  { label: '삭제 (권한 없음)', value: 'delete', disabled: true },
]

/** 기본 Dropdown 데모 — 선택한 옵션을 옆에 표시한다. */
export function BasicDropdownDemo() {
  const [last, setLast] = useState<DropdownOption | null>(null)

  return (
    <>
      <Dropdown options={menuOptions} onSelect={setLast} width={200}>
        <OutlineButton variant="assistive">메뉴 열기</OutlineButton>
      </Dropdown>
      <span style={{ fontSize: 14, color: '#6b7280' }}>
        {last ? `선택: ${last.label}` : '아직 선택 없음'}
      </span>
    </>
  )
}

/** 검색 + 선택 상태 표시 Dropdown 데모 */
export function SearchDropdownDemo() {
  const [selected, setSelected] = useState<DropdownOption | null>(null)

  return (
    <Dropdown
      type="search"
      options={menuOptions}
      onSelect={setSelected}
      selectedValue={selected?.value}
      width={240}
    >
      <OutlineButton variant="assistive">{selected?.label ?? '선택하세요'}</OutlineButton>
    </Dropdown>
  )
}

/** 아이콘 포함 + 커스텀 색상 Dropdown 데모 */
export function IconDropdownDemo() {
  const [selected, setSelected] = useState<DropdownOption | null>(null)

  return (
    <Dropdown
      content
      options={menuOptions}
      onSelect={setSelected}
      selectedValue={selected?.value}
      textColor="#6366f1"
      width={240}
    >
      <FillButton variant="primary">아이콘 메뉴</FillButton>
    </Dropdown>
  )
}

/** 특정 옵션 비활성화 Dropdown 데모 */
export function DisabledOptionDropdownDemo() {
  const [selected, setSelected] = useState<DropdownOption | null>(null)

  return (
    <Dropdown
      options={disabledOptions}
      onSelect={setSelected}
      selectedValue={selected?.value}
      width={200}
    >
      <OutlineButton variant="assistive">메뉴 열기</OutlineButton>
    </Dropdown>
  )
}
