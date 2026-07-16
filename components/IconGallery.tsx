import { useMemo, useState } from 'react'
import { Input, SearchIcon, iconMap } from '@idbrnd/design-system'
import { copyWithToast } from './copy'

/** kebab-case 아이콘 이름 → 개별 컴포넌트 import 이름 (chevron-down → ChevronDownIcon) */
function toComponentName(name: string) {
  return (
    name
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('') + 'Icon'
  )
}

const allIcons = Object.entries(iconMap).map(([name, Component]) => ({
  name,
  componentName: toComponentName(name),
  Component,
  fixedColor: name.startsWith('dashboard-'),
}))

export default function IconGallery() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allIcons
    return allIcons.filter(
      (i) =>
        i.name.includes(q) || i.componentName.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{ maxWidth: 360, marginBottom: '1rem' }}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="아이콘 이름 검색 (예: chevron)"
          leadingIcon={<SearchIcon size={20} />}
        />
      </div>
      <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 1rem' }}>
        {filtered.length}개 / 전체 {allIcons.length}개 · 클릭하면 컴포넌트 이름이
        복사됩니다.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))',
          gap: 8,
        }}
      >
        {filtered.map(({ name, componentName, Component, fixedColor }) => (
          <button
            key={name}
            type="button"
            onClick={() => copyWithToast(componentName)}
            title={`${componentName} 복사`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: '14px 6px 10px',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              background: '#fff',
              cursor: 'pointer',
              font: 'inherit',
            }}
          >
            <Component size={24} />
            <span
              style={{
                fontSize: 11,
                color: '#374151',
                wordBreak: 'break-all',
                lineHeight: 1.3,
              }}
            >
              {name}
            </span>
            {fixedColor && (
              <span
                style={{
                  fontSize: 10,
                  color: 'var(--main-60, #3f60d9)',
                  background: 'var(--main-5, #f7f9ff)',
                  borderRadius: 4,
                  padding: '1px 5px',
                }}
              >
                고정 색상
              </span>
            )}
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem 0' }}>
          &ldquo;{query}&rdquo;에 해당하는 아이콘이 없습니다.
        </p>
      )}
    </div>
  )
}
