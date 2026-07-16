import { useState } from 'react'

/**
 * 내비게이션 바 로고 오른쪽에 배치되는 사이드바 접기/펼치기 버튼.
 *
 * Nextra 테마의 기본 토글 버튼(.nextra-sidebar-footer 안)은 사이드바 컨테이너의
 * 스태킹 컨텍스트에 갇혀 내비게이션 바 위로 끌어올리기 어렵다(내비게이션 바의
 * backdrop-filter 뒤로 깔림). 그래서 기본 버튼은 CSS 로 숨기고(DOM 에는 남김),
 * 내비게이션 바의 정식 자식인 이 버튼이 클릭을 기본 버튼으로 프록시한다.
 * 접힘/펼침 상태는 이 버튼을 통해서만 바뀌므로 로컬 state 로 동기화된다.
 */
export default function SidebarToggle() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <button
      type="button"
      className="idb-sidebar-toggle"
      aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
      title={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
      onClick={() => {
        document
          .querySelector<HTMLButtonElement>('.nextra-sidebar-footer button')
          ?.click()
        setCollapsed((v) => !v)
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{
          transform: collapsed ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s ease',
        }}
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M9 4v16" />
      </svg>
    </button>
  )
}
