# IDB Design System — 가이드 페이지

[`@idbrnd/design-system`](https://github.com/idbrnd/Design-System) 컴포넌트 라이브러리의 공식 문서 사이트입니다. 설치된 패키지의 **실제 컴포넌트를 문서 안에서 라이브 렌더링**하여 사용법·Props·디자인 토큰을 함께 안내합니다.

## 기술 스택

| 항목 | 내용 |
| --- | --- |
| 프레임워크 | Next.js 14 (Pages Router) |
| 문서 엔진 | Nextra 3 + `nextra-theme-docs` |
| 런타임 | React 18 |
| 언어 | TypeScript |
| 대상 패키지 | `@idbrnd/design-system@4.2.2` |

> 문서 사이트 자체는 라이트 모드 전용입니다(`theme.config.tsx`의 `forcedTheme: 'light'`).

## 시작하기

```bash
npm install
npm run dev      # http://localhost:3000
```

| 스크립트 | 설명 |
| --- | --- |
| `npm run dev` | 토큰 생성(`predev`) 후 개발 서버 실행 |
| `npm run build` | 토큰 생성(`prebuild`) 후 프로덕션 빌드 |
| `npm run start` | 빌드된 프로덕션 서버 실행 |
| `npm run typecheck` | `tsc --noEmit` 타입 검사 (별도 테스트 러너 없음) |

## 문서 구조

라우팅은 Nextra의 파일 기반입니다. `pages/**/*.mdx`가 문서이고, 각 디렉터리의 `_meta.ts`가 사이드바 순서·라벨을 정의합니다.

```text
pages/
├─ index.mdx              # 소개
├─ getting-started.mdx    # 시작하기 (설치·스타일 로드)
├─ icons.mdx              # 아이콘 갤러리
├─ tokens/                # 디자인 토큰 (색상·타이포그래피·간격·라운드&그림자)
└─ components/            # 컴포넌트 14종 (버튼·입력·Dialog·Picker·테이블 등)
```

MDX 안에서 `@idbrnd/design-system`의 컴포넌트를 직접 import해 렌더링합니다. `next.config.mjs`의 `transpilePackages` 설정이 이를 지원합니다.

## 디자인 토큰 자동 동기화

이 프로젝트의 핵심은 **문서가 설치된 패키지 버전과 항상 일치하도록 토큰을 자동 생성**하는 파이프라인입니다.

```text
node_modules/@idbrnd/design-system/dist/tokens.css
        │  scripts/generate-tokens.mjs (predev / prebuild 훅)
        ▼
lib/tokens.generated.json   ← git 미추적, 빌드 시 재생성 (직접 수정 금지)
        │  lib/tokens.ts (타입 부여)
        ▼
components/tokens/*          ← 토큰 시각화 컴포넌트
```

`generate-tokens.mjs`는 패키지의 CSS 변수를 파싱하고 `var(--x)` 참조를 해석한 뒤 팔레트·타이포그래피·간격·radius·shadow 등으로 그룹핑합니다. 따라서 대상 패키지를 업데이트하면 문서의 토큰 값도 다음 실행에서 자동 반영됩니다.

## 라이브 데모 작성 패턴

- **`components/Demo.tsx`** — 프리뷰 박스. 데모 컴포넌트를 감싸고, 코드는 바로 아래 fenced 코드블록으로 따로 두어 Nextra의 하이라이팅·복사 버튼을 활용합니다.
- **`components/demos/*.tsx`** — 상태(hook)가 필요한 인터랙티브 데모는 별도 클라이언트 컴포넌트로 분리한 뒤 MDX에서 import합니다.
- **`components/IconGallery.tsx`** — 패키지의 `iconMap`을 순회해 190여 개 아이콘을 검색·복사 가능한 갤러리로 렌더링합니다.

## 주요 파일

| 파일 | 역할 |
| --- | --- |
| `theme.config.tsx` | Nextra 테마 설정 (로고, head 메타, footer) |
| `pages/_app.tsx` | 전역 CSS import (패키지 style/tokens → `styles/globals.css` 순서) |
| `styles/globals.css` | 테마 위 CSS 보정 (예: 사이드바 토글 버튼 재배치) |
| `next.config.mjs` | Nextra + `transpilePackages` 설정 |
| `scripts/generate-tokens.mjs` | 토큰 생성 스크립트 |
