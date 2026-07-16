import { useState } from 'react'
import {
  Chip,
  ChipGroup,
  FilterBar,
  FilterChip,
  FilterIcon,
  TextButton,
} from '@idbrnd/design-system'
import type { DropdownOption } from '@idbrnd/design-system'

/* ------------------------------------------------------------------ */
/* 공용 데이터                                                          */
/* ------------------------------------------------------------------ */

const categories: DropdownOption[] = [
  { label: '전체', value: 'all' },
  { label: '공지', value: 'notice' },
  { label: '점검', value: 'inspection' },
  { label: '교육', value: 'education' },
  { label: '안전', value: 'safety' },
]

const suggestions: DropdownOption[] = [
  { label: '설비 점검', value: 'facility' },
  { label: '안전 교육', value: 'safety-edu' },
  { label: '작업 일지', value: 'worklog' },
  { label: '근태 관리', value: 'attendance' },
  { label: '생산 현황', value: 'production' },
  { label: '품질 검사', value: 'quality' },
  { label: '재고 조회', value: 'stock' },
  { label: '설비 이력', value: 'history' },
]

const sortOptions: DropdownOption[] = [
  { label: '최신순', value: 'latest' },
  { label: '이름순', value: 'name' },
  { label: '근속순', value: 'years' },
]

const teamOptions: DropdownOption[] = [
  { label: '1공장 A조', value: 'a1' },
  { label: '2공장 B조', value: 'b2' },
  { label: '3공장 C조', value: 'c3' },
  { label: '4공장 C조', value: 'c4' },
]

const brandOptions: DropdownOption[] = [
  { label: '아이디비', value: 'idb' },
  { label: '브랜드원', value: 'brand1' },
  { label: '브랜드투', value: 'brand2' },
  { label: '브랜드쓰리', value: 'brand3' },
  { label: '브랜드포', value: 'brand4' },
]

/* ------------------------------------------------------------------ */
/* Chip                                                                */
/* ------------------------------------------------------------------ */

/** 클릭으로 선택 상태를 토글하는 칩 */
export function ChipToggleDemo() {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <Chip variant="outline" selected={isSelected} onClick={() => setIsSelected((p) => !p)}>
      토글
    </Chip>
  )
}

/* ------------------------------------------------------------------ */
/* ChipGroup                                                           */
/* ------------------------------------------------------------------ */

function toggle(prev: DropdownOption[], item: DropdownOption) {
  return prev.some((o) => o.value === item.value)
    ? prev.filter((o) => o.value !== item.value)
    : [...prev, item]
}

/** selection 타입 — 줄바꿈 다중 선택 */
export function ChipGroupSelectionDemo() {
  const [selected, setSelected] = useState<DropdownOption[]>([])

  return (
    <ChipGroup type="selection" leadingSlot={<span>카테고리</span>}>
      {categories.map(({ label, value }) => (
        <Chip
          key={value}
          variant="outline"
          selected={selected.some((o) => o.value === value)}
          onClick={() => setSelected((prev) => toggle(prev, { label, value }))}
        >
          {label}
        </Chip>
      ))}
    </ChipGroup>
  )
}

/** suggestion 타입 — 가로 드래그 캐러셀 + 그라데이션 */
export function ChipGroupSuggestionDemo() {
  return (
    <div style={{ maxWidth: 420, minWidth: 0 }}>
      <ChipGroup type="suggestion" gradient>
        {suggestions.map(({ label, value }) => (
          <Chip key={value} variant="fillWeak">
            {label}
          </Chip>
        ))}
      </ChipGroup>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* FilterChip                                                          */
/* ------------------------------------------------------------------ */

export function FilterChipDemo() {
  const [sort, setSort] = useState<DropdownOption | undefined>()
  const [team, setTeam] = useState<DropdownOption | undefined>()
  const [brand, setBrand] = useState<DropdownOption | undefined>()

  return (
    <>
      {/* 기본 */}
      <FilterChip
        variant="outline"
        options={sortOptions}
        selectedValue={sort?.value}
        onSelect={setSort}
      >
        {sort?.label ?? '정렬'}
      </FilterChip>

      {/* showSelectedLabel — "소속 4공장 C조" 형태로 표시 */}
      <FilterChip
        variant="outline"
        options={teamOptions}
        selectedValue={team?.value}
        onSelect={setTeam}
        showSelectedLabel
      >
        소속
      </FilterChip>

      {/* 검색형 드롭다운 + 너비 고정 */}
      <FilterChip
        variant="outline"
        options={brandOptions}
        selectedValue={brand?.value}
        onSelect={setBrand}
        dropdownType="search"
        dropdownWidth={280}
      >
        {brand?.label ?? '브랜드'}
      </FilterChip>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* FilterBar                                                           */
/* ------------------------------------------------------------------ */

export function FilterBarDemo() {
  const [sort, setSort] = useState<DropdownOption | undefined>()
  const [team, setTeam] = useState<DropdownOption | undefined>()

  const handleReset = () => {
    setSort(undefined)
    setTeam(undefined)
  }

  return (
    <div style={{ width: '100%', minWidth: 0 }}>
      <FilterBar
        leadingElementSlot={<FilterIcon size={24} />}
        trailingElementSlot={
          <TextButton size="small" onClick={handleReset}>
            초기화
          </TextButton>
        }
      >
        <FilterChip
          options={sortOptions}
          selectedValue={sort?.value}
          onSelect={setSort}
          showSelectedLabel
        >
          정렬
        </FilterChip>
        <FilterChip
          options={teamOptions}
          selectedValue={team?.value}
          onSelect={setTeam}
          showSelectedLabel
        >
          소속
        </FilterChip>
      </FilterBar>
    </div>
  )
}
