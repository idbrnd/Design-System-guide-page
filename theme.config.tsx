import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'
import SidebarToggle from './components/SidebarToggle'

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>
      IDB Design System
    </span>
  ),
  // 사이드바 접기/펼치기 버튼을 내비게이션 바에 직접 렌더링 (CSS 로 로고 오른쪽에 배치)
  navbar: {
    extraContent: <SidebarToggle />,
  },
  project: {
    link: 'https://github.com/idbrnd/Design-System',
  },
  docsRepositoryBase: 'https://github.com/idbrnd/Design-System-guide-page/blob/main',
  darkMode: false,
  nextThemes: {
    defaultTheme: 'light',
    forcedTheme: 'light',
  },
  head() {
    const { title } = useConfig()
    const pageTitle =
      title && title !== 'IDB Design System'
        ? `${title} – IDB Design System`
        : 'IDB Design System'
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content="@idbrnd/design-system 설치부터 컴포넌트 사용법까지 안내하는 가이드"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%234A71FF%22/><text x=%2250%22 y=%2268%22 font-size=%2252%22 font-weight=%22700%22 font-family=%22sans-serif%22 fill=%22white%22 text-anchor=%22middle%22>D</text></svg>"
        />
      </>
    )
  },
  footer: {
    content: `© ${new Date().getFullYear()} IDB. @idbrnd/design-system 가이드`,
  },
  feedback: { content: null },
  editLink: { content: null },
  toc: { title: '목차' },
  search: { placeholder: '검색...' },
}

export default config
