---
적용: 항상
---

# Next.js App Router 가이드

## 📋 개요

프로젝트는 **Next.js 15.2.4**의 **App Router**를 사용합니다.

---

## 🗂️ App Router 구조

### 디렉토리 구조

```
app/
├── layout.tsx              # 루트 레이아웃 (필수)
├── page.tsx                # 메인 페이지 (/)
├── globals.css             # 글로벌 스타일
│
└── [향후 추가될 라우트]
    ├── about/
    │   └── page.tsx        # /about
    ├── cities/
    │   ├── page.tsx        # /cities
    │   └── [id]/
    │       └── page.tsx    # /cities/:id (동적 라우트)
    └── api/
        └── route.ts        # API 라우트
```

---

## 📄 핵심 파일

### `layout.tsx` - 루트 레이아웃

루트 레이아웃은 모든 페이지에 적용되는 공통 레이아웃입니다.

```typescript
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

// 폰트 설정
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// 메타데이터
export const metadata: Metadata = {
  title: "Nomad List - 전세계 디지털 노마드 도시 정보",
  description: "디지털 노마드와 원격근무자를 위한 도시 정보 플랫폼. 생활비, 인터넷, 날씨를 한눈에 비교하세요.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans ${inter.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
```

### `page.tsx` - 메인 페이지

```typescript
export default function HomePage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">Nomad List</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        디지털 노마드를 위한 도시 정보
      </p>
    </main>
  )
}
```

---

## 🌐 라우팅

### 정적 라우트

파일 경로가 URL 경로가 됩니다.

```
app/about/page.tsx          → /about
app/contact/page.tsx        → /contact
app/blog/page.tsx           → /blog
```

#### 예시: `/about` 페이지

```typescript
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">About Us</h1>
      <p className="mt-4">프로젝트 소개</p>
    </div>
  )
}
```

### 동적 라우트

`[param]` 폴더로 동적 라우트를 만듭니다.

```
app/cities/[id]/page.tsx    → /cities/:id
app/blog/[slug]/page.tsx    → /blog/:slug
app/users/[userId]/posts/[postId]/page.tsx → /users/:userId/posts/:postId
```

#### 예시: `/cities/:id` 페이지

```typescript
// app/cities/[id]/page.tsx
import { cities } from "@/lib/data"
import { notFound } from "next/navigation"
import type { City } from "@/lib/types"

interface CityPageProps {
  params: {
    id: string
  }
}

export default function CityPage({ params }: CityPageProps) {
  const city = cities.find(c => c.id === params.id)

  if (!city) {
    notFound()  // 404 페이지로 이동
  }

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold">{city.name}</h1>
      <p className="text-xl text-muted-foreground">{city.country}</p>
      <div className="mt-6">
        <img src={city.image} alt={city.name} className="rounded-lg" />
      </div>
    </div>
  )
}
```

### 동적 라우트의 정적 생성 (SSG)

```typescript
// app/cities/[id]/page.tsx

// 빌드 시 생성할 경로 지정
export async function generateStaticParams() {
  return cities.map(city => ({
    id: city.id,
  }))
}

// 메타데이터 생성
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = cities.find(c => c.id === params.id)

  if (!city) {
    return {
      title: "도시를 찾을 수 없습니다",
    }
  }

  return {
    title: `${city.name}, ${city.country} - Nomad List`,
    description: `${city.name}의 생활비, 인터넷 속도, 날씨 정보`,
  }
}
```

---

## 🔀 서버 컴포넌트 vs 클라이언트 컴포넌트

### 서버 컴포넌트 (기본)

**특징**:
- 파일 상단에 `"use client"` 없음
- 서버에서만 실행됨
- 번들 크기 감소
- 데이터 페칭 최적화

**사용 시기**:
- 데이터 페칭
- 백엔드 리소스 접근
- 민감한 정보 (API 키 등)
- 정적 콘텐츠

```typescript
// 서버 컴포넌트 (기본)
import { cities } from "@/lib/data"

export default function CityList() {
  // 서버에서 실행
  return (
    <div>
      {cities.map(city => (
        <div key={city.id}>{city.name}</div>
      ))}
    </div>
  )
}
```

### 클라이언트 컴포넌트

**특징**:
- 파일 상단에 `"use client"` 명시
- 브라우저에서 실행됨
- 상호작용 가능
- React Hooks 사용 가능

**사용 시기**:
- 상태 관리 (useState, useReducer)
- 이벤트 핸들러 (onClick, onChange)
- 브라우저 API (localStorage, window)
- React Hooks (useEffect, useCallback)

```typescript
"use client"  // 클라이언트 컴포넌트 명시

import { useState } from "react"
import { Button } from "@/ui/button"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>카운트: {count}</p>
      <Button onClick={() => setCount(count + 1)}>
        증가
      </Button>
    </div>
  )
}
```

### 서버 + 클라이언트 컴포넌트 조합

```typescript
// app/page.tsx (서버 컴포넌트)
import { cities } from "@/lib/data"
import { FilterButtons } from "@/components/filter-buttons"  // 클라이언트

export default function HomePage() {
  // 서버에서 데이터 페칭
  return (
    <div>
      <FilterButtons />  {/* 클라이언트 컴포넌트 */}
      <div>
        {cities.map(city => (
          <div key={city.id}>{city.name}</div>
        ))}
      </div>
    </div>
  )
}
```

---

## 📊 데이터 페칭

### 서버 컴포넌트에서 데이터 페칭

```typescript
// async 함수 사용 가능
export default async function PostsPage() {
  // 서버에서 데이터 페칭
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json())

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### 정적 데이터 import

```typescript
import { cities } from "@/lib/data"

export default function CitiesPage() {
  return (
    <div>
      {cities.map(city => (
        <div key={city.id}>{city.name}</div>
      ))}
    </div>
  )
}
```

---

## 🎨 레이아웃 중첩

### 공통 레이아웃 추가

```typescript
// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="blog-layout">
      <nav className="blog-nav">
        <a href="/blog">전체 글</a>
        <a href="/blog/categories">카테고리</a>
      </nav>
      <main>{children}</main>
    </div>
  )
}
```

이 레이아웃은 `/blog` 하위의 모든 페이지에 적용됩니다:
- `/blog/page.tsx`
- `/blog/[slug]/page.tsx`
- `/blog/categories/page.tsx`

---

## 🔗 네비게이션

### `<Link>` 컴포넌트

```typescript
import Link from "next/link"

export function Navigation() {
  return (
    <nav>
      <Link href="/">홈</Link>
      <Link href="/about">소개</Link>
      <Link href="/cities">도시 목록</Link>
      <Link href="/cities/bangkok-thailand">방콕</Link>
    </nav>
  )
}
```

### 프로그래밍 방식 네비게이션

```typescript
"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/ui/button"

export function NavigateButton() {
  const router = useRouter()

  return (
    <Button onClick={() => router.push("/about")}>
      소개 페이지로 이동
    </Button>
  )
}
```

---

## 📝 메타데이터

### 정적 메타데이터

```typescript
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "페이지 제목",
  description: "페이지 설명",
  keywords: ["키워드1", "키워드2"],
  openGraph: {
    title: "OG 제목",
    description: "OG 설명",
    images: ["/og-image.jpg"],
  },
}

export default function Page() {
  return <div>페이지 내용</div>
}
```

### 동적 메타데이터

```typescript
import type { Metadata } from "next"
import { cities } from "@/lib/data"

interface CityPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = cities.find(c => c.id === params.id)

  if (!city) {
    return { title: "도시를 찾을 수 없습니다" }
  }

  return {
    title: `${city.name}, ${city.country}`,
    description: `${city.name}의 생활비는 월 $${city.cost}입니다.`,
    openGraph: {
      images: [city.image],
    },
  }
}
```

---

## 🚨 에러 처리

### `not-found.tsx` - 404 페이지

```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4">페이지를 찾을 수 없습니다.</p>
    </div>
  )
}
```

### `error.tsx` - 에러 페이지

```typescript
"use client"  // 에러 컴포넌트는 클라이언트 컴포넌트여야 함

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-4xl font-bold">오류 발생</h1>
      <p className="mt-4">{error.message}</p>
      <button onClick={reset}>다시 시도</button>
    </div>
  )
}
```

---

## ⚙️ Next.js 설정 (next.config.mjs)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint 에러 무시 (개발 편의)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript 에러 무시 (개발 편의)
  typescript: {
    ignoreBuildErrors: true,
  },
  // 이미지 최적화 비활성화
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

### 프로덕션 권장 설정

```javascript
const nextConfig = {
  // 프로덕션에서는 에러 무시 해제
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // 이미지 최적화 활성화
  images: {
    unoptimized: false,
    domains: ["example.com"],  // 외부 이미지 도메인 허용
  },
}
```

---

## 🎯 Best Practices

### 1. 서버 컴포넌트 우선 사용
- 기본적으로 서버 컴포넌트 사용
- 필요한 경우에만 클라이언트 컴포넌트로 변경

### 2. 데이터 페칭 최적화
- 서버 컴포넌트에서 데이터 페칭
- 병렬 요청 활용
- 캐싱 전략 고려

### 3. 메타데이터 최적화
- 모든 페이지에 적절한 메타데이터 설정
- SEO 최적화

### 4. 폴더 구조
- 관련 파일들을 같은 폴더에 그룹화
- `(폴더명)` 형식으로 라우트 그룹 생성 (URL에 영향 없음)

```
app/
├── (marketing)/          # 라우트 그룹 (URL에 영향 없음)
│   ├── about/
│   └── contact/
└── (app)/
    └── dashboard/
```

---

## 📚 참고 자료

- [Next.js 15 App Router 공식 문서](https://nextjs.org/docs)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

**마지막 업데이트**: 2025-10-04
**문서 버전**: 1.0.0
