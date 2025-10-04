---
적용: 모델 결정으로
---

# 데이터 타입 정의

## 📐 TypeScript 타입 시스템

모든 타입은 `lib/types.ts`에 정의되어 있습니다.

---

## 🏙️ City 타입

도시 정보를 나타내는 핵심 타입입니다.

```typescript
export interface City {
    id: string                    // 고유 ID (kebab-case)
    name: string                  // 도시명
    country: string               // 국가명
    continent: Continent          // 대륙
    cost: number                  // 월 생활비 (USD)
    temperature: number           // 평균 온도 (°C)
    feelsLike?: number           // 체감 온도 (°C, 선택적)
    internetSpeed: number         // 인터넷 속도 (Mbps)
    airQuality: number           // 공기질 지수 (AQI)
    nomadScore: number           // 노마드 점수 (1-5)
    image: string                // 이미지 경로
    safety: Safety               // 안전도
    weather: Weather             // 날씨 카테고리
}
```

### 필드 설명

#### `id: string`

- **형식**: kebab-case (`{도시명}-{국가명}`)
- **예시**: `"bangkok-thailand"`, `"chiang-mai-thailand"`
- **용도**: 고유 식별자, 라우팅, 이미지 매칭

#### `name: string`

- **형식**: 영문 도시명
- **예시**: `"Bangkok"`, `"Chiang Mai"`

#### `country: string`

- **형식**: 영문 국가명
- **예시**: `"Thailand"`, `"Portugal"`

#### `continent: Continent`

- **타입**: Union type (아래 참조)
- **값**: `"Asia"`, `"Europe"`, `"North America"`, `"South America"`, `"Africa"`, `"Oceania"`, `"Middle East"`

#### `cost: number`

- **단위**: USD/월
- **범위**: 일반적으로 500 ~ 5000
- **예시**: `1200` (1,200달러/월)

#### `temperature: number`

- **단위**: 섭씨 (°C)
- **범위**: -10 ~ 40
- **예시**: `32` (32도)

#### `feelsLike?: number`

- **선택적 필드**
- **단위**: 섭씨 (°C)
- **용도**: 체감 온도 (습도 등 고려)
- **예시**: `38` (체감 38도)

#### `internetSpeed: number`

- **단위**: Mbps (메가비트/초)
- **범위**: 5 ~ 200
- **예시**: `45` (45Mbps)

#### `airQuality: number`

- **단위**: AQI (Air Quality Index)
- **범위**: 0 ~ 500
    - 0-50: 좋음
    - 51-100: 보통
    - 101-150: 민감군 나쁨
    - 151+: 나쁨
- **예시**: `85` (보통)

#### `nomadScore: number`

- **범위**: 1.0 ~ 5.0
- **의미**: 디지털 노마드 종합 점수
- **예시**: `4.2` (5점 만점에 4.2점)

#### `image: string`

- **형식**: 상대 경로 (`/cities/{도시명}-{국가명}.jpg`)
- **예시**: `"/cities/bangkok-thailand.jpg"`

#### `safety: Safety`

- **타입**: Union type
- **값**: `"low"`, `"medium"`, `"high"`

#### `weather: Weather`

- **타입**: Union type
- **값**: `"cold"`, `"mild"`, `"warm"`, `"hot"`

---

## 🌍 Continent 타입

대륙을 나타내는 Union 타입입니다.

```typescript
type ContinentValue =
    | "Asia"
    | "Europe"
    | "North America"
    | "South America"
    | "Africa"
    | "Oceania"
    | "Middle East"

export type Continent = ContinentValue | "All"
```

### 값 목록

- `"Asia"` - 아시아
- `"Europe"` - 유럽
- `"North America"` - 북아메리카
- `"South America"` - 남아메리카
- `"Africa"` - 아프리카
- `"Oceania"` - 오세아니아
- `"Middle East"` - 중동
- `"All"` - 전체 (필터용)

---

## 🏷️ FilterCategory 타입

도시 필터 카테고리를 나타냅니다.

```typescript
export type FilterCategory =
    | "cheap"      // 저렴한 생활비
    | "weather"    // 좋은 날씨
    | "internet"   // 빠른 인터넷
    | "safety"     // 높은 안전도
    | "air"        // 좋은 공기질
    | "warm"       // 따뜻한 날씨
```

### 필터 기준

#### `"cheap"` - 저렴한 생활비

- **기준**: `cost < 1500` USD/월

#### `"weather"` - 좋은 날씨

- **기준**: `weather === "mild"` 또는 `weather === "warm"`

#### `"internet"` - 빠른 인터넷

- **기준**: `internetSpeed >= 50` Mbps

#### `"safety"` - 높은 안전도

- **기준**: `safety === "high"`

#### `"air"` - 좋은 공기질

- **기준**: `airQuality <= 50` AQI

#### `"warm"` - 따뜻한 날씨

- **기준**: `weather === "warm"` 또는 `weather === "hot"`

---

## 🛡️ Safety 타입

도시 안전도를 나타냅니다.

```typescript
export type Safety = "low" | "medium" | "high"
```

### 레벨 설명

- `"low"` - 낮음 (주의 필요)
- `"medium"` - 보통 (일반적인 주의)
- `"high"` - 높음 (안전함)

---

## 🌤️ Weather 타입

날씨 카테고리를 나타냅니다.

```typescript
export type Weather = "cold" | "mild" | "warm" | "hot"
```

### 온도 범위

- `"cold"` - 추움 (< 10°C)
- `"mild"` - 온화함 (10-20°C)
- `"warm"` - 따뜻함 (20-28°C)
- `"hot"` - 더움 (> 28°C)

---

## 📊 데이터 예시

### 완전한 City 객체 예시

```typescript
const exampleCity: City = {
    id: "bangkok-thailand",
    name: "Bangkok",
    country: "Thailand",
    continent: "Asia",
    cost: 1200,
    temperature: 32,
    feelsLike: 38,
    internetSpeed: 45,
    airQuality: 85,
    nomadScore: 4.2,
    image: "/cities/bangkok-thailand.jpg",
    safety: "medium",
    weather: "hot",
}
```

### 최소 City 객체 예시 (feelsLike 제외)

```typescript
const minimalCity: City = {
    id: "lisbon-portugal",
    name: "Lisbon",
    country: "Portugal",
    continent: "Europe",
    cost: 2000,
    temperature: 22,
    internetSpeed: 100,
    airQuality: 45,
    nomadScore: 4.5,
    image: "/cities/lisbon-portugal.jpg",
    safety: "high",
    weather: "mild",
}
```

---

## 🔍 타입 사용 예시

### 컴포넌트 Props

```typescript
import type {City, Continent, FilterCategory} from "@/lib/types"

interface CityCardProps {
    city: City
    className?: string
}

interface FilterProps {
    selectedContinent: Continent
    selectedCategory: FilterCategory | null
    onContinentChange: (continent: Continent) => void
    onCategoryChange: (category: FilterCategory | null) => void
}
```

### 함수 타입

```typescript
import type {City, FilterCategory} from "@/lib/types"

// 필터 함수
function filterCities(
    cities: City[],
    category: FilterCategory
): City[] {
    switch (category) {
        case "cheap":
            return cities.filter(city => city.cost < 1500)
        case "internet":
            return cities.filter(city => city.internetSpeed >= 50)
        default:
            return cities
    }
}

// 정렬 함수
function sortCitiesByCost(cities: City[]): City[] {
    return [...cities].sort((a, b) => a.cost - b.cost)
}
```

### 상태 타입

```typescript
import {useState} from "react"
import type {City, Continent, FilterCategory} from "@/lib/types"

function useCityFilter() {
    const [selectedContinent, setSelectedContinent] = useState<Continent>("All")
    const [selectedCategory, setSelectedCategory] = useState<FilterCategory | null>(null)
    const [filteredCities, setFilteredCities] = useState<City[]>([])

    return {
        selectedContinent,
        selectedCategory,
        filteredCities,
        setSelectedContinent,
        setSelectedCategory,
        setFilteredCities,
    }
}
```

---

## ✅ 타입 안전성 규칙

### 1. `any` 사용 금지

```typescript
// ❌ 나쁜 예
const city: any = {...}

// ✅ 좋은 예
const city: City = {...}
```

### 2. 명시적 타입 정의

```typescript
// ❌ 나쁜 예
function getCityName(city) {
    return city.name
}

// ✅ 좋은 예
function getCityName(city: City): string {
    return city.name
}
```

### 3. Optional Chaining 사용

```typescript
// ✅ 좋은 예
const feelsLike = city.feelsLike ?? city.temperature
const displayTemp = city.feelsLike?.toFixed(1) ?? city.temperature.toFixed(1)
```

### 4. Type Guards

```typescript
function isCheapCity(city: City): boolean {
    return city.cost < 1500
}

function isHighSafety(safety: Safety): safety is "high" {
    return safety === "high"
}
```

---

## 🔄 타입 확장 가이드

### 새 필드 추가

```typescript
// lib/types.ts
export interface City {
    // 기존 필드들...

    // 새 필드 추가
    population?: number        // 인구 (선택적)
    timezone: string          // 시간대 (필수)
    currency: string          // 통화 단위 (필수)
}
```

### 새 필터 카테고리 추가

```typescript
// lib/types.ts
export type FilterCategory =
    | "cheap"
    | "weather"
    | "internet"
    | "safety"
    | "air"
    | "warm"
    | "fast-wifi"    // 새 카테고리 추가
    | "low-cost"     // 새 카테고리 추가
```

### 새 타입 생성

```typescript
// lib/types.ts

// 리뷰 타입
export interface Review {
    id: string
    cityId: string
    userId: string
    rating: number
    comment: string
    createdAt: Date
}

// 사용자 타입
export interface User {
    id: string
    name: string
    email: string
    favoriteCity: City["id"][]
}
```

---

**마지막 업데이트**: 2025-10-04
**문서 버전**: 1.0.0
