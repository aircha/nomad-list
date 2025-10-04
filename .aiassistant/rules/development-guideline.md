# 개발 가이드라인

## 🎯 코딩 규칙

### TypeScript

#### 기본 규칙
- **strict mode** 활성화
- `type` 키워드 사용 (interface 대신 권장)
- 명시적 타입 어노테이션
- `any` 사용 금지 (불가피한 경우 `unknown` 사용)

```typescript
// ❌ 나쁜 예
function getData(id: any) {
  return data.find(item => item.id === id)
}

// ✅ 좋은 예
function getData(id: string): City | undefined {
  return cities.find(city => city.id === id)
}
```

#### Optional Chaining & Nullish Coalescing

```typescript
// ✅ Optional Chaining
const feelsLike = city.feelsLike ?? city.temperature
const displayTemp = city.feelsLike?.toFixed(1) ?? city.temperature.toFixed(1)

// ✅ Nullish Coalescing
const cost = city.cost ?? 0
const title = city.name ?? "Unknown City"
```

#### Type Guards

```typescript
function isCity(obj: unknown): obj is City {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj
  )
}

function isCheapCity(city: City): boolean {
  return city.cost < 1500
}
```

---

### React

#### 컴포넌트 작성

```typescript
// ✅ 함수형 컴포넌트 사용
import type React from "react"

interface ComponentProps {
  title: string
  children?: React.ReactNode
  className?: string
}

export function Component({ title, children, className }: ComponentProps) {
  return (
    <div className={className}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

#### 서버 vs 클라이언트 컴포넌트

```typescript
// 서버 컴포넌트 (기본) - 상호작용 없음
export function ServerComponent() {
  const data = getData()  // 서버에서 실행
  return <div>{data}</div>
}

// 클라이언트 컴포넌트 - 상호작용 필요
"use client"

import { useState } from "react"

export function ClientComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

#### Hooks 규칙

```typescript
"use client"

import { useState, useEffect, useMemo, useCallback } from "react"

export function HookExample() {
  // 1. useState
  const [count, setCount] = useState(0)

  // 2. useMemo - 비싼 계산 캐싱
  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(count)
  }, [count])

  // 3. useCallback - 함수 캐싱
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  // 4. useEffect - 사이드 이펙트
  useEffect(() => {
    console.log("Count changed:", count)
  }, [count])

  return <button onClick={handleClick}>{count}</button>
}
```

---

### 스타일링

#### Tailwind CSS

```tsx
export function StyledComponent() {
  return (
    <div className="
      p-4                           // 패딩
      bg-white dark:bg-gray-800    // 배경 (다크모드)
      rounded-lg                    // 테두리
      shadow-md hover:shadow-lg     // 그림자 + hover
      transition-shadow             // 트랜지션
      sm:p-6 lg:p-8                // 반응형
    ">
      콘텐츠
    </div>
  )
}
```

#### `cn()` 유틸리티

```tsx
import { cn } from "@/lib/utils"

interface CardProps {
  variant?: "default" | "outlined"
  className?: string
}

export function Card({ variant = "default", className }: CardProps) {
  return (
    <div
      className={cn(
        // 기본 클래스
        "rounded-lg p-4",
        // 조건부 클래스
        variant === "outlined" && "border-2",
        // 사용자 클래스
        className
      )}
    >
      내용
    </div>
  )
}
```

#### 반응형 디자인

```tsx
export function ResponsiveGrid() {
  return (
    <div className="
      grid
      grid-cols-1          // 모바일: 1열
      sm:grid-cols-2       // 태블릿: 2열
      lg:grid-cols-3       // 데스크톱: 3열
      xl:grid-cols-4       // 대형: 4열
      gap-4                // 간격
    ">
      {/* 아이템들 */}
    </div>
  )
}
```

---

## 📁 파일 네이밍

### 규칙
- **컴포넌트**: `kebab-case.tsx`
- **타입 파일**: `types.ts`
- **유틸리티**: `utils.ts`
- **Hooks**: `use-*.ts`
- **상수**: `constants.ts` 또는 `UPPER_CASE.ts`

### 예시
```
components/
├── city-card.tsx          ✅
├── filter-buttons.tsx     ✅
├── search-bar.tsx         ✅
├── CityCard.tsx           ❌ (PascalCase 사용 안 함)
└── filterButtons.tsx      ❌ (camelCase 사용 안 함)

hooks/
├── use-filter.ts          ✅
├── use-mobile.ts          ✅
└── useFilter.ts           ❌ (camelCase 사용 안 함)
```

---

## 🎨 코드 스타일

### 들여쓰기 & 포맷팅
- **들여쓰기**: 4 spaces
- **세미콜론**: 사용 안 함 (선택적)
- **따옴표**: 쌍따옴표 (`"`)
- **화살표 함수**: 권장
- **구조 분해**: 적극 활용

```typescript
// ✅ 좋은 예
const handleClick = () => {
    console.log("Clicked")
}

const { name, country } = city

// ❌ 나쁜 예
const handleClick = function() {
    console.log("Clicked");
};

const name = city.name
const country = city.country
```

### Import 순서

```typescript
// 1. React & Next.js
import type React from "react"
import { useState } from "react"
import Link from "next/link"

// 2. 외부 라이브러리
import { Button } from "@/ui/button"
import { cn } from "@/lib/utils"

// 3. 내부 모듈
import type { City } from "@/lib/types"
import { cities } from "@/lib/data"
import { CityCard } from "@/components/city-card"

// 4. 스타일
import "./styles.css"
```

### 변수 & 함수 네이밍

```typescript
// 변수: camelCase
const cityName = "Bangkok"
const totalCost = 1200
const isHighSafety = true

// 함수: camelCase
function getCityById(id: string): City | undefined {
  return cities.find(city => city.id === id)
}

// 컴포넌트: PascalCase
function CityCard({ city }: { city: City }) {
  return <div>{city.name}</div>
}

// 상수: UPPER_SNAKE_CASE
const MAX_CITIES = 100
const API_BASE_URL = "https://api.example.com"

// 타입: PascalCase
type FilterCategory = "cheap" | "weather"
interface CityCardProps {
  city: City
}
```

---

## 📊 데이터 관리

### 도시 데이터 추가

```typescript
// lib/data.ts
export const cities: City[] = [
  // 대륙별로 그룹화
  // Asia (15 cities)
  {
    id: "bangkok-thailand",        // kebab-case
    name: "Bangkok",                // 영문 도시명
    country: "Thailand",            // 영문 국가명
    continent: "Asia",              // 대륙
    cost: 1200,                     // USD/월
    temperature: 32,                // °C
    feelsLike: 38,                  // 체감 온도 (선택)
    internetSpeed: 45,              // Mbps
    airQuality: 85,                 // AQI
    nomadScore: 4.2,                // 1-5
    image: "/cities/bangkok-thailand.jpg",  // 이미지 경로
    safety: "medium",               // low | medium | high
    weather: "hot",                 // cold | mild | warm | hot
  },
  // 다음 도시...
]
```

### 이미지 관리

```
public/cities/
├── bangkok-thailand.jpg       ✅ (kebab-case)
├── chiang-mai-thailand.jpg    ✅
└── Bangkok_Thailand.jpg       ❌ (underscore 사용 안 함)
```

---

## 🧪 테스트 (향후 계획)

### 테스트 파일 네이밍
```
components/
├── city-card.tsx
└── city-card.test.tsx         # 또는 .spec.tsx
```

### 테스트 작성 예시

```typescript
import { render, screen } from "@testing-library/react"
import { CityCard } from "./city-card"

describe("CityCard", () => {
  const mockCity: City = {
    id: "test-city",
    name: "Test City",
    country: "Test Country",
    // ... 나머지 필드
  }

  it("도시 이름을 표시한다", () => {
    render(<CityCard city={mockCity} />)
    expect(screen.getByText("Test City")).toBeInTheDocument()
  })
})
```

---

## 🚀 개발 워크플로우

### 개발 서버 실행

```bash
npm run dev
# http://localhost:3000
```

### 빌드 & 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

### 새 기능 추가 프로세스

1. **타입 정의** (`lib/types.ts`)
2. **데이터 준비** (`lib/data.ts`)
3. **컴포넌트 작성** (`components/`)
4. **페이지 통합** (`app/`)
5. **스타일링 & 테스트**

---

## 🎯 성능 최적화

### React 최적화

```typescript
import { memo, useMemo, useCallback } from "react"

// 1. React.memo - 컴포넌트 메모이제이션
export const CityCard = memo(function CityCard({ city }: { city: City }) {
  return <div>{city.name}</div>
})

// 2. useMemo - 값 캐싱
function ExpensiveComponent({ items }: { items: City[] }) {
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.cost - b.cost)
  }, [items])

  return <div>{/* ... */}</div>
}

// 3. useCallback - 함수 캐싱
function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log("Clicked")
  }, [])

  return <ChildComponent onClick={handleClick} />
}
```

### 동적 Import

```typescript
import dynamic from "next/dynamic"

// 동적 import로 코드 스플리팅
const HeavyComponent = dynamic(() => import("@/components/heavy-component"), {
  loading: () => <p>Loading...</p>,
  ssr: false,  // SSR 비활성화 (선택)
})

export function Page() {
  return (
    <div>
      <HeavyComponent />
    </div>
  )
}
```

### 이미지 최적화

```tsx
import Image from "next/image"

export function OptimizedImage() {
  return (
    <Image
      src="/cities/bangkok-thailand.jpg"
      alt="Bangkok"
      width={800}
      height={600}
      loading="lazy"
      placeholder="blur"
    />
  )
}
```

---

## ♿ 접근성 (Accessibility)

### 기본 원칙
1. **시맨틱 HTML** 사용
2. **ARIA 속성** 적절히 사용
3. **키보드 네비게이션** 지원
4. **색상 대비** WCAG 2.1 AA 이상
5. **포커스 인디케이터** 명확히 표시

### 예시

```tsx
export function AccessibleComponent() {
  return (
    <div>
      {/* 시맨틱 HTML */}
      <nav aria-label="메인 네비게이션">
        <ul>
          <li><a href="/">홈</a></li>
        </ul>
      </nav>

      {/* ARIA 속성 */}
      <button
        aria-label="검색"
        aria-expanded="false"
        aria-controls="search-panel"
      >
        검색
      </button>

      {/* 이미지 alt */}
      <img
        src="/city.jpg"
        alt="방콕의 야경, 강을 따라 높은 건물들이 빛나고 있다"
      />

      {/* 포커스 스타일 */}
      <a
        href="/about"
        className="focus:ring-2 focus:ring-primary focus:outline-none"
      >
        소개
      </a>
    </div>
  )
}
```

---

## 🐛 디버깅

### Console 로깅

```typescript
// 개발 환경에서만 로깅
if (process.env.NODE_ENV === "development") {
  console.log("Debug info:", data)
}

// 에러 로깅
try {
  // 코드
} catch (error) {
  console.error("Error occurred:", error)
}
```

### TypeScript 에러 해결

```typescript
// 타입 단언 (Type Assertion) - 최소화
const element = document.getElementById("root") as HTMLDivElement

// 타입 가드 사용 권장
if (element instanceof HTMLDivElement) {
  element.style.color = "red"
}
```

---

## 📚 참고 문서

- `project-structure.md` - 프로젝트 구조
- `data-types.md` - 데이터 타입
- `ui-components.md` - UI 컴포넌트
- `nextjs-app-router.md` - Next.js App Router

---

## ⚠️ 주의사항

### 1. 빌드 에러 무시 설정
- 현재 `next.config.mjs`에서 ESLint/TypeScript 에러 무시
- 개발 편의를 위한 설정
- **프로덕션 배포 전 반드시 모든 에러 해결**

### 2. 패키지 매니저 일관성
- `npm` 또는 `pnpm` 중 하나만 사용
- 현재는 `npm` 권장 (package-lock.json 기준)

### 3. Git 저장소
- 현재 Git 저장소 아님
- 버전 관리 시작 권장: `git init`

---

## 🔧 개발 도구

### VSCode 확장
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

### 브라우저 확장
- React Developer Tools
- Redux DevTools (상태 관리 사용 시)

---

**마지막 업데이트**: 2025-10-04
**문서 버전**: 1.0.0
