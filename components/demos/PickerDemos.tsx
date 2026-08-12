import { useState } from 'react'
import { DatePicker, TimePicker } from '@idbrnd/design-system'
import type { DatePickerDateRange, TimePickerValue } from '@idbrnd/design-system'

/** DatePicker 기본 데모 — 단일 날짜(normal) + 트리거 2종. */
export function DatePickerBasicDemo() {
  const [icon, setIcon] = useState<Date | null>(null)
  const [field, setField] = useState<Date | null>(null)

  return (
    <>
      <DatePicker heading="날짜 (icon 트리거)" value={icon} onChange={setIcon} />
      <DatePicker heading="날짜 (field 트리거)" trigger="field" value={field} onChange={setField} />
    </>
  )
}

/** DatePicker 기간 선택 데모 — period(1개월)와 range(2개월). */
export function DatePickerRangeDemo() {
  const [period, setPeriod] = useState<DatePickerDateRange>({ start: null, end: null })
  const [range, setRange] = useState<DatePickerDateRange>({ start: null, end: null })

  return (
    <>
      <DatePicker heading="기간 (period)" variant="period" value={period} onChange={setPeriod} />
      <DatePicker heading="기간 (range)" variant="range" value={range} onChange={setRange} />
    </>
  )
}

/** DatePicker 시간 포함 데모 — hasTime으로 날짜+시간을 함께 선택한다. */
export function DatePickerTimeDemo() {
  const [value, setValue] = useState<Date | null>(null)

  return <DatePicker heading="일시" hasTime value={value} onChange={setValue} />
}

/** TimePicker 기본 데모 — variant 3종. */
export function TimePickerBasicDemo() {
  const [aaHhMm, setAaHhMm] = useState<TimePickerValue | null>(null)
  const [aaHh, setAaHh] = useState<TimePickerValue | null>(null)
  const [hhMm, setHhMm] = useState<TimePickerValue | null>(null)

  return (
    <>
      <TimePicker heading="시간 (aa-hh-mm)" value={aaHhMm} onChange={setAaHhMm} />
      <TimePicker heading="시간 (aa-hh)" variant="aa-hh" value={aaHh} onChange={setAaHh} />
      <TimePicker heading="시간 (hh-mm)" variant="hh-mm" value={hhMm} onChange={setHhMm} />
    </>
  )
}

/** TimePicker 트리거 데모 — field·compact 트리거. */
export function TimePickerTriggerDemo() {
  const [field, setField] = useState<TimePickerValue | null>(null)
  const [compact, setCompact] = useState<TimePickerValue | null>(null)

  return (
    <>
      <TimePicker heading="시간 (field 트리거)" trigger="field" value={field} onChange={setField} />
      <TimePicker trigger="compact" value={compact} onChange={setCompact} />
    </>
  )
}
