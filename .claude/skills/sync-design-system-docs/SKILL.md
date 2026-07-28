---
name: sync-design-system-docs
description: Use when @idbrnd/design-system 패키지가 새 버전으로 릴리스됐을 때, 또는 이 가이드 사이트의 Props 표·아이콘 개수·토큰 문서가 실제 설치 패키지와 어긋났는지 확인·정정해야 할 때. "디자인 시스템 변경 반영", "문서 최신화", "Props 표 맞는지 확인" 같은 요청이 트리거.
---

# 디자인 시스템 문서 동기화

## Overview

`@idbrnd/design-system`의 변경을 이 가이드 사이트(`pages/**/*.mdx`)에 반영한다.

**핵심 원칙: 정답은 컴포넌트 소스의 실제 기본값이다.** 원본 레포의 README와 JSDoc은 둘 다 실제 코드와 어긋난 전례가 있다. 그것들은 "무엇이 바뀌었는지 찾는 단서"이지 "무엇이 맞는지 판정하는 기준"이 아니다.

## 정답 소스 우선순위

Props 표의 타입·기본값을 판정할 때 이 순서로 신뢰한다.

| 순위 | 소스 | 신뢰도 |
| --- | --- | --- |
| 1 | 컴포넌트 함수 구조분해 기본값 (`variant = 'primary',`) | **확정** — 런타임 실제 동작 |
| 2 | `export type` / `*.types.ts` 선언 | **확정** — 허용 값 집합 |
| 3 | JSDoc `@defaultValue` / `@default` | 참고만. 1번과 어긋나면 **1번이 맞다** |
| 4 | 원본 레포 `README.md` | 참고만. 이 사이트가 더 정확한 경우가 있다 |

3·4번이 1·2번과 어긋나면 **원본 레포 쪽 버그**다. 이 저장소를 고치지 말고 사용자에게 보고한다.

## 절차

### 1. 버전 확인

```bash
node -p "require('./node_modules/@idbrnd/design-system/package.json').version"
npm view @idbrnd/design-system version
```

같으면 패키지 변경은 없다. 그래도 3·4단계(문서 정합성 검사)는 의미가 있으니 사용자에게 범위를 확인한다.

### 2. 실제 변경 확인

버전만 올랐고 내용은 같을 수 있다. 스크래치패드에서 새 tarball을 받아 `dist`를 직접 비교한다.

```bash
cd <scratchpad> && npm pack @idbrnd/design-system@<새버전> --silent && tar -xzf *.tgz
diff <repo>/node_modules/@idbrnd/design-system/dist/index.d.ts package/dist/index.d.ts
diff <repo>/node_modules/@idbrnd/design-system/dist/tokens.css package/dist/tokens.css
cmp <repo>/node_modules/@idbrnd/design-system/dist/style.css package/dist/style.css
```

- `tokens.css`가 같으면 → `pages/tokens/*`는 볼 필요 없다 (토큰은 `prebuild`가 자동 재생성)
- `index.d.ts`가 같으면 → public API 변경 없음. Props 표 변경 가능성 낮음

**export 목록을 반드시 비교한다.** 5단계 매핑 표는 고정 목록이라, 신규 컴포넌트는 표에 없어서 "검사 대상 없음"으로 조용히 지나간다.

```bash
extract_exports() {
  grep -E "^export \{" "$1" \
    | sed -E 's/^export \{ *//; s/ *\} from.*//; s/default as //g' \
    | tr ',' '\n' | sed 's/^[[:space:]]*//; s/[[:space:]]*$//' | grep -v '^$' | sort -u
}
diff <(extract_exports <repo>/node_modules/@idbrnd/design-system/dist/index.d.ts) \
     <(extract_exports package/dist/index.d.ts)
```

`>` = 신규 export, `<` = 삭제된 export. (`export type {...}`는 제외되고 컴포넌트·함수만 잡힌다)

- 신규가 있으면 → **6단계**로 문서 페이지를 새로 만든다
- 삭제가 있으면 → 해당 문서·데모를 제거해야 한다. **breaking change이므로 지우기 전에 사용자에게 확인**한다

### 3. 변경 내역 파악

원본 레포는 `~/Desktop/IDB/Design-System` (없으면 사용자에게 경로를 묻는다).

```bash
cd ~/Desktop/IDB/Design-System
git log --oneline <이전버전_커밋>..HEAD
git diff --stat <이전버전_커밋>..HEAD
```

버전 커밋은 `chore: 버전 업데이트` 메시지로 찾는다. `docs:` 커밋은 무엇이 어긋났었는지 알려주는 좋은 단서지만, **그 내용을 그대로 복사하지 말고 1·2번 소스로 재확인**한다.

### 4. 패키지 업그레이드

```bash
npm install @idbrnd/design-system@<새버전>
```

`npm install`은 `"^3.0.2"`처럼 캐럿을 붙인다. **이 저장소는 정확한 버전 고정 관례**이므로 `package.json`에서 `^`를 제거하고 `npm install`을 한 번 더 돌려 lock을 맞춘다.

### 5. Props 표 대조

문서 ↔ 소스 매핑:

| 문서 | 소스 (`src/components/`) |
| --- | --- |
| `buttons.mdx` | `Button/{Fill,Outline,Text,Weak}` |
| `icon-buttons.mdx` | `IconButton/{BasicIcon,FillIcon,OutlineIcon}` |
| `chips.mdx` | `Chip/{Chip,ChipGroup,FilterChip,FilterBar}` |
| `content.mdx` | `Content/{Avatar,AvatarStack,ContentBadge,StateBadge}` |
| `controls.mdx` | `Control/{CheckBox,Radio,ToggleSwitch}` |
| `dropdown.mdx` | `Dropdown/` |
| `inputs.mdx` | `Input/`, `SearchBar/` |
| `select.mdx` | `Select/` |
| `segmented-control.mdx` | `SegmentedControl/` |
| `tab.mdx` | `Tab/` |
| `table.mdx` | `Table/`, `Pagination/` |
| `feedback.mdx` | `Feedback/{Toast,Snackbar,PushBadge}`, `Tooltip/`, `Spinner/` |

대조 방법:

```bash
# 문서의 Props 표 행만 뽑기
grep -n "^| \`" pages/components/<page>.mdx

# 소스의 타입 선언 + 구조분해 기본값 (보통 상단 60줄 안에 다 있다)
sed -n '1,60p' <원본레포>/src/components/<경로>.tsx
```

`Tooltip`, `Spinner`, `FilterChip`/`FilterBar`, `Pagination`은 전용 페이지가 없고 다른 문서에 얹혀 있다 — 페이지 이름만 보고 빠뜨리지 않는다.

### 6. 신규 컴포넌트 문서 작성

2단계에서 신규 export를 찾았을 때만 수행한다. 기존 계열에 속하면(예: 새 버튼 variant 컴포넌트) 새 페이지 대신 해당 문서에 섹션을 추가한다.

**작성 전에 사용자에게 확인한다** — 새 페이지인지 기존 문서의 섹션인지, 사이드바 라벨을 무엇으로 할지는 판단이 갈린다.

**1) `pages/components/<name>.mdx` 생성** — 파일명은 kebab-case.

````mdx
import Demo from '../../components/Demo'
import { NewComponent } from '@idbrnd/design-system'

# 컴포넌트명

무엇을 하는 컴포넌트인지 한 문단. controlled 여부, 키보드·ARIA 동작 등 주요 특징을 함께 적는다.

## 기본 사용

<Demo>
  <NewComponent />
</Demo>

```tsx
import { NewComponent } from '@idbrnd/design-system'

<NewComponent />
```

### Props

| Prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'assistive'` | `'primary'` | 색상 변형 |
````

**2) `pages/components/_meta.ts`에 등록** — 등록하지 않으면 사이드바에 안 뜬다. 키는 확장자 뺀 파일명, 값은 라벨.

라벨 관례: 계열·카테고리성이면 한국어(`버튼`, `입력`, `컨트롤`, `피드백`, `콘텐츠`, `테이블`), 고유 컴포넌트명이면 영어 그대로(`Select`, `Dropdown`, `Tab`, `Chip`, `SegmentedControl`).

**3) 상태가 필요한 데모는 분리** — MDX는 서버에서 정적 생성되므로 **hook을 MDX 안에서 직접 쓸 수 없다.** `components/demos/<Name>Demo.tsx`(데모 여러 개면 `<Name>Demos.tsx`)로 빼고 named export한 뒤 MDX에서 import한다.

**4) 5단계 매핑 표에 행 추가** — 이 스킬 파일(`SKILL.md`) 자체를 갱신한다. 안 하면 다음 동기화 때 또 누락된다.

**MDX 작성 관례** (기존 문서와 어긋나지 않게):

| 관례 | 내용 |
| --- | --- |
| 프리뷰와 코드 분리 | `<Demo>`에는 **라이브 렌더링만**. 코드는 바로 아래 별도 fenced ```tsx 블록 (Nextra 하이라이팅·복사 버튼 활용) |
| 세로 정렬 | `<Demo column>` |
| Props 표 | 4열 고정: `Prop \| 타입 \| 기본값 \| 설명` |
| 필수 prop | 기본값 칸은 `—`, 설명 앞에 `**(필수)**` |
| 유니온 타입 | 표 안에서는 `\|`로 이스케이프 |
| 계열이 여러 개 | 상단에 `## 공통 Props` 두고, 각 섹션은 차이나는 Prop만 적은 뒤 `나머지는 [공통 Props](#공통-props)와 동일합니다.` |

### 7. 하드코딩된 값 갱신

토큰·아이콘 목록은 자동 반영되지만, **문서에 숫자로 박아둔 값은 수동 갱신**이 필요하다.

```bash
grep -rn "개 아이콘\|[0-9]개\|3\.0\.[0-9]" pages/ README.md
```

알려진 위치:
- `pages/index.mdx` — 아이콘 개수 ("193개 아이콘")
- `README.md` — 대상 패키지 버전 표기

아이콘 개수 세기 (BSD grep은 `\s`를 지원하지 않으니 `[[:space:]]`를 쓴다):

```bash
sed -n '/^export const iconMap = {/,/^} as const;/p' <원본레포>/src/icons/iconMap.ts \
  | grep -cE '^[[:space:]]+"[^"]+":'
```

`components/IconGallery.tsx`는 `iconMap`을 순회하므로 아이콘 추가 시 코드 수정이 필요 없다.

### 8. 검증

```bash
npm run typecheck && npm run build
```

테스트 러너가 없으므로 이 둘이 유일한 자동 검증이다. Props 표는 텍스트라 빌드로는 안 잡히니, **정정한 행마다 1·2번 소스와 다시 눈으로 대조**한다.

## Common Mistakes

| 실수 | 결과 | 대신 |
| --- | --- | --- |
| 원본 README의 정정 내용을 그대로 옮김 | 이 사이트가 이미 더 정확했던 부분을 오히려 망가뜨림 | 1·2번 소스로 재판정 |
| JSDoc `@defaultValue`를 믿음 | 실제 기본값과 반대로 적음 (`Pagination.boundary`가 실제 전례) | 구조분해 기본값 확인 |
| 버전만 보고 문서를 대량 수정 | 버전은 올랐지만 `dist`가 동일한 경우가 있음 | 2단계 diff 먼저 |
| `npm install` 후 `package.json` 방치 | 캐럿이 붙어 버전 고정 관례가 깨짐 | `^` 제거 후 재설치 |
| `lib/tokens.generated.json` 직접 수정 | 다음 빌드에서 덮어써짐 | 건드리지 않는다 (자동 생성물) |
| `grep -E '^\s+'` 사용 | macOS BSD grep에서 매칭 실패, 개수가 틀림 | `[[:space:]]` |
| 전용 페이지 없는 컴포넌트 누락 | `Tooltip`·`Spinner`·`Pagination` 등 검사 안 됨 | 5단계 매핑 표 사용 |
| 매핑 표만 보고 신규 컴포넌트 판단 | 표는 고정 목록이라 신규는 "검사 대상 없음"으로 조용히 누락 | 2단계 export diff를 먼저 |
| 새 MDX만 만들고 `_meta.ts` 등록 누락 | 페이지는 빌드되지만 사이드바에 안 뜸 | 6-2단계 |
| MDX 안에서 `useState` 사용 | 정적 생성이라 빌드 실패 | `components/demos/`로 분리 |
| 신규 페이지 추가 후 매핑 표 방치 | 다음 동기화 때 같은 컴포넌트가 또 누락 | 6-4단계에서 `SKILL.md` 갱신 |

## 보고 형식

작업 후 다음을 구분해서 보고한다.

1. **변경한 것** — 파일별로 무엇을 왜 고쳤는지
2. **검사했고 이상 없던 것** — 어떤 컴포넌트를 대조했는지 나열 (검사 범위를 알 수 있어야 한다)
3. **범위 밖 발견 사항** — 원본 레포의 JSDoc/README 오류 등. 이 저장소에서 고치지 말고 보고만 한다
