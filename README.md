# 🌍 Nomad List

디지털 노마드를 위한 도시 정보 플랫폼

전 세계 주요 도시들의 생활비, 인터넷 속도, 날씨, 안전도, 공기질 등의 정보를 한눈에 비교하고 필터링할 수 있는 웹 애플리케이션입니다.

## ✨ 주요 기능

- 🗺️ **50+ 도시 정보**: 아시아, 유럽, 북미, 남미, 아프리카, 오세아니아, 중동 지역의 주요 도시
- 🔍 **스마트 필터링**:
  - 카테고리별 필터 (저렴한 도시, 좋은 날씨, 빠른 인터넷, 안전한 도시, 좋은 공기질, 따뜻한 도시)
  - 대륙별 필터
- 📊 **상세 정보**:
  - 월 생활비 (USD)
  - 평균/체감 온도
  - 인터넷 속도 (Mbps)
  - 공기질 지수 (AQI)
  - 안전도
  - 노마드 점수 (1-5)
- 🎨 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- 🌓 **다크 모드**: 시스템 설정에 따라 자동 전환

## 🛠️ 기술 스택

### 프레임워크 & 라이브러리
- **Next.js 15.2.4** - App Router를 사용한 풀스택 React 프레임워크
- **React 19** - 최신 React 기능 활용
- **TypeScript 5** - 타입 안정성

### UI & 스타일링
- **shadcn/ui** - Radix UI 기반 접근성 컴포넌트
- **Tailwind CSS 4.1.9** - Utility-first CSS 프레임워크
- **Lucide React** - 아이콘 라이브러리
- **Framer Motion** - 애니메이션

### 폼 & 데이터
- **React Hook Form** - 폼 관리
- **Zod** - 스키마 검증
- **date-fns** - 날짜 처리
- **Recharts** - 데이터 시각화

### 테마 & 다크 모드
- **next-themes** - 다크 모드 지원

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.17 이상
- pnpm (권장 패키지 매니저)

### 설치

```bash
# 저장소 클론
git clone https://github.com/aircha/nomad-list.git
cd nomad-list

# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
# 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### 코드 검사

```bash
pnpm lint
```

## 📁 프로젝트 구조

```
nomad-list/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 메인 페이지
│   └── globals.css          # 글로벌 스타일
├── components/              # React 컴포넌트
│   ├── ui/                  # shadcn/ui 컴포넌트
│   ├── header.tsx           # 헤더
│   ├── footer.tsx           # 푸터
│   ├── hero.tsx             # 히어로 섹션
│   ├── city-card.tsx        # 도시 카드
│   ├── city-grid.tsx        # 도시 그리드
│   ├── category-filters.tsx # 카테고리 필터
│   └── continent-filters.tsx # 대륙 필터
├── lib/                     # 유틸리티 & 데이터
│   ├── types.ts            # TypeScript 타입
│   ├── data.ts             # 도시 데이터
│   └── utils.ts            # 유틸리티 함수
├── hooks/                   # 커스텀 React Hooks
│   ├── use-mobile.ts       # 모바일 감지
│   └── use-toast.ts        # 토스트 알림
├── public/                  # 정적 파일
│   └── cities/             # 도시 이미지
└── scripts/                 # 유틸리티 스크립트
```

## 🎨 UI 컴포넌트 추가

프로젝트는 shadcn/ui를 사용합니다. 새로운 컴포넌트 추가:

```bash
npx shadcn@latest add [component-name]
```

## 📝 데이터 추가

### 새 도시 추가

1. `lib/data.ts`의 `cities` 배열에 City 객체 추가
2. `/public/cities/{도시}-{국가}.jpg`에 이미지 추가
3. 대륙별로 그룹화하여 정리

### 필터 카테고리 추가

1. `lib/types.ts`의 `FilterCategory` 타입 업데이트
2. `lib/data.ts`의 `filterByCategory` 함수 업데이트
3. `components/category-filters.tsx`에 버튼 추가

## 🌐 배포

이 프로젝트는 Vercel에 배포하기 최적화되어 있습니다:

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

## 📄 라이선스

MIT License

## 🤝 기여

이슈 및 풀 리퀘스트를 환영합니다!

## 📧 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

**🤖 Generated with [Claude Code](https://claude.com/claude-code)**