import { useState } from 'react'
import { BasicIconButton, PlusIcon, Tab } from '@idbrnd/design-system'
import type { TabItem } from '@idbrnd/design-system'

const basicItems: TabItem[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'done', label: '완료' },
]

const badgeItems: TabItem[] = [
  { value: 'inbox', label: '받은 메시지' },
  { value: 'unread', label: '안읽은 메시지', badge: true },
  { value: 'sent', label: '보낸 메시지', numberBadge: 12 },
]

const disabledItems: TabItem[] = [
  { value: 'a', label: '사용 가능' },
  { value: 'b', label: '비활성화', disabled: true },
  { value: 'c', label: '사용 가능' },
]

/** 기본 사용 */
export function TabBasicDemo() {
  const [tab, setTab] = useState<string | number>('all')

  return <Tab items={basicItems} value={tab} onChange={setTab} />
}

/** 뱃지 + 숫자 뱃지 */
export function TabBadgeDemo() {
  const [tab, setTab] = useState<string | number>('inbox')

  return <Tab items={badgeItems} value={tab} onChange={setTab} />
}

/** fill 모드 — 탭이 컨테이너 너비를 균등 분배 */
export function TabFillDemo() {
  const [tab, setTab] = useState<string | number>('all')

  return <Tab items={basicItems} value={tab} onChange={setTab} resize="fill" />
}

/** 왼쪽 패딩 + trailing 아이콘 버튼 */
export function TabTrailingIconDemo() {
  const [tab, setTab] = useState<string | number>('all')

  return (
    <Tab
      items={basicItems}
      value={tab}
      onChange={setTab}
      horizontalPadding
      trailingIcon={
        <BasicIconButton aria-label="탭 추가" onClick={() => console.log('탭 추가')}>
          <PlusIcon />
        </BasicIconButton>
      }
    />
  )
}

/** 비활성화 탭 포함 */
export function TabDisabledDemo() {
  const [tab, setTab] = useState<string | number>('a')

  return <Tab items={disabledItems} value={tab} onChange={setTab} />
}
