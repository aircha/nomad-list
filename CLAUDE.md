# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code (claude.ai/code)에 대한 가이드를 제공합니다.

## 프로젝트 개요

Nomad List는 Next.js 15.2.4 (App Router), React 19, TypeScript로 구축된 디지털 노마드 도시 정보 플랫폼입니다. UI 및 콘텐츠의 주요 언어는 **한국어(ko)**입니다.

## 명령어

### 개발
```bash
npm run dev          # http://localhost:3000에서 개발 서버 시작
npm run build        # 프로덕션 빌드
npm start            # 프로덕션 서버 실행
npm run lint         # ESLint 검사
```

### UI 컴포넌트 추가
```bash
npx shadcn@latest add [component-name]  # shadcn/ui 컴포넌트 설치
```

## 아키텍처

### 기술 스택
- **Next.js 15.2.4**: 기본적으로 Server Components를 사용하는 App Router
- **React 19**: 최신 React 기능
- **TypeScript 5**: Strict mode 활성화, ES6 타겟
- **shadcn/ui**: New York 스타일, Radix UI 기반 접근성 컴포넌트
- **Tailwind CSS 4.1.9**: 테마를 위한 CSS 변수를 사용한 utility-first 스타일링
- **폼 관리**: react-hook-form + @hookform/resolvers + zod
- **날짜 처리**: date-fns 4.1.0
- **차트**: recharts 2.15.4
- **폰트**: Inter (본문), Geist Mono (코드)

### 디렉토리 구조
```
app/                    # Next.js App Router
  ├── layout.tsx       # 루트 레이아웃 (메타데이터, 폰트)
  ├── page.tsx         # 필터 로직이 있는 메인 페이지
  └── globals.css      # 글로벌 스타일, Tailwind directives, CSS 변수

components/            # React 컴포넌트
  ├── ui/             # shadcn/ui 프리미티브 (50+ 컴포넌트)
  ├── header.tsx      # 사이트 헤더
  ├── footer.tsx      # 사이트 푸터
  ├── hero.tsx        # 히어로 섹션
  ├── city-card.tsx   # 개별 도시 카드
  ├── city-grid.tsx   # 도시 그리드 레이아웃
  ├── category-filters.tsx   # 카테고리 필터 버튼
  ├── continent-filters.tsx  # 대륙 필터 탭
  └── theme-provider.tsx     # 다크 모드 프로바이더

lib/                   # 유틸리티 및 데이터
  ├── types.ts        # TypeScript 타입 정의
  ├── data.ts         # 도시 데이터 배열 + 필터 함수
  └── utils.ts        # 유틸리티 함수 (클래스명용 cn)

hooks/                 # 커스텀 React Hooks
  ├── use-mobile.ts   # 모바일 감지
  └── use-toast.ts    # 토스트 알림

public/cities/         # 도시 이미지 (네이밍: {도시}-{국가}.jpg)
scripts/               # 이미지 다운로드용 유틸리티 스크립트
```

### 핵심 데이터 모델

**City 인터페이스** (`lib/types.ts`):
```typescript
interface City {
  id: string                    // kebab-case: "bangkok-thailand"
  name: string                  // 도시명
  country: string               // 국가명
  continent: "Asia" | "Europe" | "North America" | "South America" | "Africa" | "Oceania" | "Middle East"
  cost: number                  // 월 생활비 (USD)
  temperature: number           // 평균 온도 (°C)
  feelsLike?: number           // 체감 온도 (°C)
  internetSpeed: number         // 인터넷 속도 (Mbps)
  airQuality: number           // AQI 지수
  nomadScore: number           // 점수 1-5
  image: string                // 이미지 경로
  safety: "low" | "medium" | "high"
  weather: "cold" | "mild" | "warm" | "hot"
}
```

**필터 타입**:
```typescript
type FilterCategory = "cheap" | "weather" | "internet" | "safety" | "air" | "warm"
type Continent = City["continent"] | "All"
```

### 필터 로직 (`lib/data.ts`)

애플리케이션은 순수 필터링 함수를 사용합니다:
- `filterByCategory(cities, category)`: 카테고리 기준으로 도시 필터링
  - `cheap`: 비용 < $2000
  - `weather`: 20-28°C
  - `internet`: 속도 > 20 Mbps
  - `safety`: 안전도 높음만
  - `air`: AQI < 50
  - `warm`: 온도 > 25°C
- `filterByContinent(cities, continent)`: 대륙별 필터링
- `getContinentCounts()`: 대륙별 도시 수 반환

필터는 `app/page.tsx`에서 `useMemo`를 사용하여 순차적으로 적용됩니다.

## 코딩 규칙

### TypeScript
- `type` 키워드 사용 (City를 제외하고 `interface` 사용 안 함)
- Strict mode 활성화
- 명시적 타입 어노테이션 필수
- 함수형 컴포넌트: `React.FC` 또는 직접 타입 정의 사용

### 컴포넌트 가이드라인
- 함수형 컴포넌트만 사용
- 기본적으로 Server Components (필요시 `"use client"` 추가)
- Props 타입 정의 필수
- 파일 네이밍: `kebab-case.tsx`
- 컴포넌트 네이밍: `PascalCase`

### Import 별칭
```typescript
@/components   → components/
@/lib          → lib/
@/hooks        → hooks/
@/ui           → components/ui/
@/utils        → lib/utils
```

### 스타일링
- Tailwind CSS 유틸리티 클래스 사용
- 조건부 클래스 병합에는 `cn()` 유틸리티 사용
- 테마 색상은 CSS 변수 사용 (`app/globals.css`에 정의)
- 반응형 브레이크포인트: `sm:`, `md:`, `lg:`
- 다크 모드: `dark:` 접두사

### 언어
- 모든 UI 텍스트와 주석은 **한국어**
- 컴포넌트 로직과 타입은 영어

## 데이터 추가

### 새 도시 추가
1. `lib/data.ts`의 `cities` 배열에 City 객체 추가
2. 대륙별로 그룹화 (주석으로 구분)
3. ID 형식: `{도시}-{국가}` (kebab-case)
4. `/public/cities/{도시}-{국가}.jpg`에 이미지 추가
5. Unsplash 이미지 다운로드는 `scripts/` 폴더의 스크립트 사용

### 대륙 추가
`lib/types.ts`의 `continent` 타입을 업데이트하고 필터 로직에 추가합니다.

### 필터 카테고리 추가
1. `lib/types.ts`의 `FilterCategory` 타입에 추가
2. `lib/data.ts`의 `filterByCategory` switch 문 업데이트
3. `components/category-filters.tsx`에 버튼 추가

## 중요한 설정 사항

### Next.js 설정 (`next.config.mjs`)
```javascript
eslint: { ignoreDuringBuilds: true }      // 빌드 시 ESLint 에러 무시
typescript: { ignoreBuildErrors: true }   // 빌드 시 TS 에러 무시
images: { unoptimized: true }             // 이미지 최적화 비활성화
```

⚠️ 이 설정은 개발에는 편리하지만 프로덕션 배포 전에 반드시 수정해야 합니다.

### shadcn/ui 설정
- 스타일: "new-york"
- RSC: 활성화 (Server Components)
- 기본 색상: neutral
- CSS 변수: 활성화
- 아이콘 라이브러리: lucide-react

## 일반적인 패턴

### 새 페이지 추가
`app/` 디렉토리에 파일 생성:
```
app/about/page.tsx           # → /about 경로
app/cities/[id]/page.tsx    # → /cities/bangkok-thailand (동적 라우트)
```

### 기능 컴포넌트 추가
1. `components/` 디렉토리에 생성
2. `components/ui/`의 기존 shadcn/ui 컴포넌트 사용
3. `@/lib/types`에서 타입 import
4. Tailwind CSS로 스타일링

### 상태 관리 패턴
앱은 `app/page.tsx`의 필터링 로직에서 `useState`와 `useMemo`를 사용한 React 상태를 사용합니다. 필터는 순차적으로 적용됩니다: 먼저 대륙 필터, 그 다음 카테고리 필터가 결과를 reduce합니다.

## 패키지 관리
- 주 도구: npm (package-lock.json)
- 참고: pnpm-lock.yaml도 존재 - 일관성 유지 필요

## 한국어 우선순위
이 저장소에서 코드를 작성할 때:
- UI 텍스트 문자열은 반드시 한국어
- 컴포넌트 주석은 한국어로 작성
- 메타데이터 (title, description)는 한국어
- 에러 메시지는 한국어
