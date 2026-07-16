import { useState } from 'react'
import {
  BarchartIcon,
  MapPinnedIcon,
  MenuIcon,
  SegmentedControl,
} from '@idbrnd/design-system'
import type { SegmentedControlItem } from '@idbrnd/design-system'

const periodItems: SegmentedControlItem[] = [
  { value: 'day', label: '일' },
  { value: 'week', label: '주' },
  { value: 'month', label: '월' },
]

const viewItems: SegmentedControlItem[] = [
  { value: 'list', label: '목록', icon: <MenuIcon /> },
  { value: 'chart', label: '차트', icon: <BarchartIcon /> },
  { value: 'map', label: '지도', icon: <MapPinnedIcon /> },
]

const iconOnlyItems: SegmentedControlItem[] = [
  { value: 'list', icon: <MenuIcon />, ariaLabel: '목록 보기' },
  { value: 'chart', icon: <BarchartIcon />, ariaLabel: '차트 보기' },
  { value: 'map', icon: <MapPinnedIcon />, ariaLabel: '지도 보기' },
]

/** 기본 (fill 타입, medium) */
export function SegmentedControlBasicDemo() {
  const [period, setPeriod] = useState('day')

  return <SegmentedControl items={periodItems} value={period} onChange={setPeriod} />
}

/** outlined 타입 + large 크기 */
export function SegmentedControlOutlinedDemo() {
  const [period, setPeriod] = useState('day')

  return (
    <SegmentedControl
      type="outlined"
      size="large"
      items={periodItems}
      value={period}
      onChange={setPeriod}
    />
  )
}

/** 아이콘 + 텍스트 (icon=true) */
export function SegmentedControlIconTextDemo() {
  const [view, setView] = useState('list')

  return <SegmentedControl icon items={viewItems} value={view} onChange={setView} />
}

/** 아이콘 전용 (variant="icon") */
export function SegmentedControlIconOnlyDemo() {
  const [view, setView] = useState('list')

  return (
    <SegmentedControl
      variant="icon"
      label="뷰 전환"
      items={iconOnlyItems}
      value={view}
      onChange={setView}
    />
  )
}

/** layout="hug" vs layout="fill" 비교 */
export function SegmentedControlLayoutDemo() {
  const [hug, setHug] = useState('day')
  const [fill, setFill] = useState('day')

  return (
    <>
      {/* hug: 내부 세그먼트 크기에 맞춰 컨테이너가 축소됩니다 */}
      <SegmentedControl items={periodItems} value={hug} onChange={setHug} layout="hug" />

      {/* fill: 부모 너비를 최대한 채우고 세그먼트가 균등하게 늘어납니다 (basic 기본값) */}
      <SegmentedControl items={periodItems} value={fill} onChange={setFill} layout="fill" />
    </>
  )
}
