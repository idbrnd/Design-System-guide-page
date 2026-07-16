import { useState } from 'react'
import { SearchBar } from '@idbrnd/design-system'

/** 기본: Enter 또는 우측 검색 버튼으로 onSearch 실행 */
export function SearchBarBasicDemo() {
  const [keyword, setKeyword] = useState('')
  const [searched, setSearched] = useState('')

  return (
    <div style={{ width: '100%' }}>
      <SearchBar
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={(value) => setSearched(value)}
        placeholder="검색어를 입력하세요"
      />
      {searched && (
        <p style={{ margin: '8px 0 0', fontSize: 14, color: '#6b7280' }}>
          검색 실행: {searched}
        </p>
      )}
    </div>
  )
}

/** 에러: 검증 규칙과 문구는 사용하는 쪽에서 직접 제어 */
export function SearchBarErrorDemo() {
  const [keyword, setKeyword] = useState('a')

  const errorMessage =
    keyword.length === 1
      ? '검색어를 2자 이상 입력해 주세요.'
      : keyword.length >= 20
        ? '검색어는 19자 이하로 입력해 주세요.'
        : undefined

  return (
    <SearchBar
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      onSearch={(value) => console.log('search:', value)}
      errorMessage={errorMessage}
      placeholder="검색어를 입력하세요"
    />
  )
}
