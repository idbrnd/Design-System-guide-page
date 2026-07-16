import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>
      IDB Design System
    </span>
  ),
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
    const pageTitle = title ? `${title} – IDB Design System` : 'IDB Design System'
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content="@idbrnd/design-system 설치부터 컴포넌트 사용법까지 안내하는 가이드"
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
