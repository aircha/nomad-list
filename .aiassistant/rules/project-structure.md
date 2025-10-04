---
적용: 항상
---

# 프로젝트 구조

## 📋 프로젝트 개요

### 기본 정보
- **프로젝트명**: Nomad List
- **설명**: 디지털 노마드와 원격근무자를 위한 전세계 도시 정보 비교 플랫폼
- **주요 기능**: 생활비, 인터넷 속도, 날씨, 안전도, 공기질 등 도시 정보 제공
- **언어**: 한국어 (ko)
- **버전**: 0.1.0

### 기술 스택
- **프레임워크**: Next.js 15.2.4 (App Router)
- **UI 라이브러리**: React 19
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS 4.1.9
- **UI 컴포넌트**: shadcn/ui (New York 스타일) + Radix UI
- **폰트**: Inter (본문), Geist Mono (코드)

---

## 🗂️ 디렉토리 구조

```
nomad-list/
│
├── app/                        # Next.js App Router (페이지 라우팅)
│   ├── layout.tsx             # 루트 레이아웃 (메타데이터, 폰트 설정)
│   ├── page.tsx               # 메인 페이지 (/)
│   └── globals.css            # 글로벌 스타일 + Tailwind directives
│
├── components/                 # React 컴포넌트
│   ├── ui/                    # shadcn/ui 기본 UI 프리미티브 (50+ 컴포넌트)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ... (모든 UI 프리미티브)
│   │
│   ├── header.tsx             # 사이트 헤더
│   ├── footer.tsx             # 사이트 푸터
│   ├── hero.tsx               # 히어로 섹션
│   ├── city-card.tsx          # 개별 도시 카드
│   ├── city-grid.tsx          # 도시 그리드 레이아웃
│   ├── category-filters.tsx   # 카테고리 필터
│   ├── continent-filters.tsx  # 대륙 필터
│   ├── loading-spinner.tsx    # 로딩 인디케이터
│   └── theme-provider.tsx     # 다크모드 테마 프로바이더
│
├── lib/                        # 유틸리티 및 데이터 레이어
│   ├── types.ts               # TypeScript 타입 정의
│   ├── data.ts                # 도시 데이터 배열
│   └── utils.ts               # 유틸리티 함수
│
├── hooks/                      # 커스텀 React Hooks
│   ├── use-mobile.ts          # 모바일 기기 감지
│   └── use-toast.ts           # 토스트 알림 훅
│
├── public/                     # 정적 파일
│   ├── cities/                # 도시 이미지
│   └── hero-*.jpg             # 히어로 이미지
│
├── scripts/                    # 유틸리티 스크립트
│   └── download-unsplash-images.js
│
└── .aiassistant/              # AI Assistant 설정
    └── rules/                 # 프로젝트 규칙 문서
```

## 📦 주요 의존성

### UI 라이브러리
- `@radix-ui/*`: 접근성 높은 UI 프리미티브
- `lucide-react`: 아이콘
- `next-themes`: 다크모드 테마
- `tailwind-merge`: Tailwind 클래스 병합
- `tailwindcss-animate`: 애니메이션

### 폼 및 유효성 검사
- `react-hook-form`: 폼 상태 관리
- `zod`: 스키마 유효성 검사

### 기타
- `date-fns`: 날짜 처리
- `recharts`: 차트
- `embla-carousel-react`: 캐러셀
- `sonner`: 토스트 알림

## 🎯 디렉토리별 역할

### `app/` - Next.js App Router
- **역할**: 페이지 라우팅, 레이아웃, 메타데이터 관리
- **특징**: 서버 컴포넌트 기본
- **주요 파일**:
  - `layout.tsx`: 루트 레이아웃 (폰트, 메타데이터)
  - `page.tsx`: 메인 페이지
  - `globals.css`: 글로벌 스타일

### `components/` - React 컴포넌트
- **역할**: UI 컴포넌트 모음
- **하위 디렉토리**:
  - `ui/`: shadcn/ui 기본 컴포넌트 (50+)
  - 기타: 도메인 특화 컴포넌트

### `lib/` - 유틸리티 및 데이터
- **역할**: 데이터 레이어, 타입 정의, 유틸리티
- **주요 파일**:
  - `types.ts`: TypeScript 타입
  - `data.ts`: 도시 데이터
  - `utils.ts`: 유틸리티 함수 (cn 등)

### `hooks/` - 커스텀 Hooks
- **역할**: 재사용 가능한 React Hooks
- **네이밍**: `use-*.ts` 형식

### `public/` - 정적 파일
- **역할**: 이미지, 아이콘 등 정적 에셋
- **하위 디렉토리**:
  - `cities/`: 도시 이미지 (`도시명-국가명.jpg`)

### `scripts/` - 유틸리티 스크립트
- **역할**: 이미지 다운로드, 데이터 수정 등
- **실행**: `node scripts/[파일명].js`

## 📐 Import Alias

```typescript
@/components   → /components
@/lib          → /lib
@/hooks        → /hooks
@/ui           → /components/ui
@/utils        → /lib/utils
```

## 📝 파일 네이밍 규칙

- **컴포넌트**: `kebab-case.tsx` (예: `city-card.tsx`)
- **타입 파일**: `types.ts`
- **데이터 파일**: `data.ts`
- **유틸리티**: `utils.ts`
- **Hooks**: `use-*.ts` (예: `use-mobile.ts`)
- **이미지**: `{도시명}-{국가명}.jpg` (예: `bangkok-thailand.jpg`)

## ⚙️ 주요 설정 파일

- `tsconfig.json`: TypeScript 설정 (strict mode, path alias)
- `next.config.mjs`: Next.js 설정 (빌드 옵션)
- `postcss.config.mjs`: PostCSS 설정
- `components.json`: shadcn/ui 설정
- `package.json`: 의존성 관리

---

**참고**: 자세한 내용은 다른 규칙 문서를 참조하세요:
- `data-types.md`: 데이터 타입 정의
- `nextjs-app-router.md`: Next.js App Router 사용법
- `ui-components.md`: UI 컴포넌트 가이드
- `development-guideline.md`: 개발 가이드라인
