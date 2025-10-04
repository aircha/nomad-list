---
적용: 항상
---

# UI 컴포넌트 가이드

## 🎨 UI 시스템 개요

프로젝트는 **shadcn/ui** (New York 스타일)와 **Radix UI**를 기반으로 한 컴포넌트 시스템을 사용합니다.

---

## 📁 컴포넌트 구조

### 컴포넌트 분류

#### 1. UI 프리미티브 (`components/ui/`)
- shadcn/ui로 설치된 기본 UI 컴포넌트
- 재사용 가능한 범용 컴포넌트
- Radix UI 기반으로 접근성 보장
- **50+ 컴포넌트** 포함

**주요 컴포넌트**:
- `button.tsx` - 버튼
- `card.tsx` - 카드
- `dialog.tsx` - 다이얼로그/모달
- `input.tsx` - 입력 필드
- `select.tsx` - 셀렉트 박스
- `badge.tsx` - 뱃지
- `avatar.tsx` - 아바타
- `toast.tsx` - 토스트 알림
- `form.tsx` - 폼 컴포넌트
- 기타 50+ 컴포넌트

#### 2. 도메인 컴포넌트 (`components/`)
- 비즈니스 로직 포함
- 프로젝트 특화 컴포넌트
- UI 프리미티브를 조합하여 구성

**주요 컴포넌트**:
- `header.tsx` - 사이트 헤더
- `footer.tsx` - 사이트 푸터
- `hero.tsx` - 히어로 섹션
- `city-card.tsx` - 도시 카드
- `city-grid.tsx` - 도시 그리드
- `category-filters.tsx` - 카테고리 필터
- `continent-filters.tsx` - 대륙 필터
- `loading-spinner.tsx` - 로딩 스피너
- `theme-provider.tsx` - 테마 프로바이더

---

## 🧩 컴포넌트 작성 패턴

### 기본 패턴

```tsx
import type React from "react"
import { cn } from "@/lib/utils"

interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

export function Component({ className, children }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  )
}
```

### Props 타입 정의

```tsx
import type { City } from "@/lib/types"

interface CityCardProps {
  city: City                    // 필수 prop
  className?: string            // 선택적 prop
  onClick?: () => void          // 이벤트 핸들러
  showDetails?: boolean         // 불리언 플래그
}

export function CityCard({
  city,
  className,
  onClick,
  showDetails = false,         // 기본값
}: CityCardProps) {
  // 구현
}
```

### 클라이언트 컴포넌트

```tsx
"use client"  // 상단에 명시

import { useState } from "react"
import { Button } from "@/ui/button"

export function InteractiveComponent() {
  const [count, setCount] = useState(0)

  return (
    <Button onClick={() => setCount(count + 1)}>
      클릭 수: {count}
    </Button>
  )
}
```

### 서버 컴포넌트 (기본)

```tsx
// "use client" 없음 - 서버 컴포넌트

import { cities } from "@/lib/data"
import { CityCard } from "./city-card"

export function CityList() {
  return (
    <div className="grid gap-4">
      {cities.map(city => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  )
}
```

---

## 🎯 shadcn/ui 사용법

### 컴포넌트 설치

```bash
# 단일 컴포넌트 설치
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog

# 여러 컴포넌트 동시 설치
npx shadcn@latest add button card dialog select input
```

### 설치된 컴포넌트 사용

```tsx
import { Button } from "@/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card"
import { Dialog, DialogTrigger, DialogContent } from "@/ui/dialog"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>제목</CardTitle>
      </CardHeader>
      <CardContent>
        <p>내용</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>열기</Button>
          </DialogTrigger>
          <DialogContent>
            <p>다이얼로그 내용</p>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
```

### 커스터마이징

shadcn/ui 컴포넌트는 `components/ui/`에 설치되므로 직접 수정 가능합니다.

```tsx
// components/ui/button.tsx 수정
export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "기본-클래스",
        "커스텀-클래스",  // 추가
        className
      )}
      {...props}
    />
  )
}
```

---

## 🎨 스타일링 규칙

### Tailwind CSS 사용

```tsx
export function StyledComponent() {
  return (
    <div className="
      p-4                      // 패딩
      bg-white dark:bg-gray-800  // 배경색 (다크모드 대응)
      rounded-lg               // 테두리 반경
      shadow-md                // 그림자
      hover:shadow-lg          // hover 효과
      transition-shadow        // 트랜지션
    ">
      내용
    </div>
  )
}
```

### `cn()` 유틸리티로 조건부 클래스

```tsx
import { cn } from "@/lib/utils"

interface CardProps {
  variant?: "default" | "outlined" | "filled"
  className?: string
}

export function Card({ variant = "default", className }: CardProps) {
  return (
    <div
      className={cn(
        // 기본 클래스
        "rounded-lg p-4",
        // 조건부 클래스
        variant === "outlined" && "border-2 border-gray-300",
        variant === "filled" && "bg-gray-100",
        // 사용자 정의 클래스
        className
      )}
    >
      내용
    </div>
  )
}
```

### 반응형 디자인

```tsx
export function ResponsiveGrid() {
  return (
    <div className="
      grid                     // 그리드 레이아웃
      grid-cols-1             // 모바일: 1열
      sm:grid-cols-2          // 태블릿: 2열
      lg:grid-cols-3          // 데스크톱: 3열
      gap-4                   // 간격
    ">
      {/* 아이템들 */}
    </div>
  )
}
```

### 다크모드 대응

```tsx
export function DarkModeComponent() {
  return (
    <div className="
      bg-white dark:bg-gray-900        // 배경색
      text-gray-900 dark:text-white    // 텍스트 색상
      border-gray-200 dark:border-gray-700  // 테두리
    ">
      다크모드 지원 컴포넌트
    </div>
  )
}
```

---

## 🔧 주요 UI 컴포넌트 사용 예시

### Button

```tsx
import { Button } from "@/ui/button"

export function ButtonExample() {
  return (
    <>
      <Button variant="default">기본</Button>
      <Button variant="destructive">삭제</Button>
      <Button variant="outline">아웃라인</Button>
      <Button variant="ghost">고스트</Button>
      <Button size="sm">작은 버튼</Button>
      <Button size="lg">큰 버튼</Button>
      <Button disabled>비활성화</Button>
    </>
  )
}
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/ui/card"
import { Button } from "@/ui/button"

export function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드 설명</CardDescription>
      </CardHeader>
      <CardContent>
        <p>카드 본문 내용</p>
      </CardContent>
      <CardFooter>
        <Button>액션</Button>
      </CardFooter>
    </Card>
  )
}
```

### Dialog

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/ui/dialog"
import { Button } from "@/ui/button"

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>다이얼로그 제목</DialogTitle>
          <DialogDescription>다이얼로그 설명</DialogDescription>
        </DialogHeader>
        <div>본문 내용</div>
      </DialogContent>
    </Dialog>
  )
}
```

### Input

```tsx
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"

export function InputExample() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">이메일</Label>
      <Input
        id="email"
        type="email"
        placeholder="example@email.com"
      />
    </div>
  )
}
```

### Select

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/ui/select"

export function SelectExample() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="옵션 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
        <SelectItem value="option2">옵션 2</SelectItem>
        <SelectItem value="option3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

---

## 🎭 도메인 컴포넌트 예시

### CityCard 컴포넌트

```tsx
import type { City } from "@/lib/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card"
import { Badge } from "@/ui/badge"
import { cn } from "@/lib/utils"

interface CityCardProps {
  city: City
  className?: string
  onClick?: () => void
}

export function CityCard({ city, className, onClick }: CityCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-lg transition-shadow",
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{city.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{city.country}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>${city.cost}/월</Badge>
          <Badge variant="outline">{city.temperature}°C</Badge>
          <Badge variant="secondary">{city.internetSpeed}Mbps</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
```

### FilterButtons 컴포넌트

```tsx
"use client"

import { Button } from "@/ui/button"
import type { FilterCategory } from "@/lib/types"

interface FilterButtonsProps {
  selectedCategory: FilterCategory | null
  onCategoryChange: (category: FilterCategory | null) => void
}

export function FilterButtons({ selectedCategory, onCategoryChange }: FilterButtonsProps) {
  const categories: { value: FilterCategory; label: string }[] = [
    { value: "cheap", label: "저렴함" },
    { value: "internet", label: "빠른 인터넷" },
    { value: "safety", label: "안전함" },
    { value: "air", label: "좋은 공기질" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ value, label }) => (
        <Button
          key={value}
          variant={selectedCategory === value ? "default" : "outline"}
          onClick={() => onCategoryChange(value === selectedCategory ? null : value)}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}
```

---

## ♿ 접근성 (Accessibility)

### 기본 원칙

1. **시맨틱 HTML** 사용
2. **ARIA 속성** 적절히 사용 (Radix UI가 자동 처리)
3. **키보드 네비게이션** 지원
4. **색상 대비** WCAG 2.1 AA 이상
5. **포커스 인디케이터** 명확히 표시

### 예시

```tsx
export function AccessibleButton() {
  return (
    <button
      aria-label="도시 정보 더보기"
      aria-describedby="city-description"
      className="focus:ring-2 focus:ring-primary focus:outline-none"
    >
      더보기
    </button>
  )
}

export function AccessibleImage() {
  return (
    <img
      src="/cities/bangkok-thailand.jpg"
      alt="방콕, 태국의 야경. 강을 따라 높은 건물들이 빛나고 있다."
      loading="lazy"
    />
  )
}
```

---

## 🎯 컴포넌트 작성 체크리스트

### 필수 사항
- [ ] TypeScript 타입 정의
- [ ] Props 인터페이스 작성
- [ ] `className` prop 지원 (`cn()` 사용)
- [ ] 반응형 디자인 고려
- [ ] 다크모드 대응
- [ ] 접근성 고려 (ARIA, 시맨틱 HTML)

### 권장 사항
- [ ] 기본값 설정
- [ ] 에러 상태 처리
- [ ] 로딩 상태 처리
- [ ] 빈 상태 처리
- [ ] 성능 최적화 (React.memo, useMemo 등)
- [ ] 주석 작성 (복잡한 로직)

---

## 📝 파일 네이밍

```
components/
├── ui/                      # shadcn/ui 컴포넌트
│   ├── button.tsx
│   └── card.tsx
│
├── city-card.tsx           # 도메인 컴포넌트 (kebab-case)
├── filter-buttons.tsx
└── search-bar.tsx
```

---

## 🔄 컴포넌트 재사용 가이드

### 1. UI 프리미티브 우선 사용
기존 `components/ui/` 컴포넌트를 먼저 확인하고 재사용합니다.

### 2. 조합 컴포넌트 작성
여러 UI 프리미티브를 조합하여 도메인 컴포넌트를 만듭니다.

```tsx
import { Card } from "@/ui/card"
import { Button } from "@/ui/button"
import { Badge } from "@/ui/badge"

export function CombinedComponent() {
  return (
    <Card>
      <Badge>뱃지</Badge>
      <Button>버튼</Button>
    </Card>
  )
}
```

### 3. 공통 패턴 추출
반복되는 패턴은 별도 컴포넌트로 추출합니다.

```tsx
// components/info-badge.tsx
import { Badge } from "@/ui/badge"

interface InfoBadgeProps {
  label: string
  value: string | number
}

export function InfoBadge({ label, value }: InfoBadgeProps) {
  return (
    <Badge variant="outline">
      {label}: {value}
    </Badge>
  )
}

// 사용
<InfoBadge label="비용" value={`$${city.cost}`} />
<InfoBadge label="온도" value={`${city.temperature}°C`} />
```

---

**마지막 업데이트**: 2025-10-04
**문서 버전**: 1.0.0
