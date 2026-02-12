# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 코드 작업 시 참고하는 가이드입니다.

## 프로젝트 개요

Next.js 16 (App Router), React 19, Convex (실시간 백엔드), Clerk (인증), TossPayments (결제)로 구축된 한국어 전자기기 쇼핑몰 앱입니다.

## 명령어

- `npm run dev` — Next.js 개발 서버 시작 (포트 3000)
- `npm run build` — 프로덕션 빌드
- `npm run lint` — ESLint 실행
- `npx convex dev` — Convex 개발 서버 시작 (변경 감지 후 클라우드 동기화)
- `npx convex dev --once` — Convex 함수를 1회만 푸시 (감시 없음)
- `npx convex run seed:clearAndSeed` — DB 초기화 후 상품/카테고리 시드 데이터 재입력

## 아키텍처

### 기술 스택

- **프론트엔드**: Next.js 16 App Router, React 19, Tailwind CSS v4 (globals.css에서 `@import "tailwindcss"` 사용, tailwind.config 없음)
- **백엔드**: Convex 서버리스 (실시간 DB + `convex/` 내 서버 함수)
- **인증**: Clerk + `ConvexProviderWithClerk` — Clerk가 세션 관리, Convex가 JWT로 검증
- **결제**: TossPayments SDK — 위젯 기반 체크아웃, `/api/payment/confirm`에서 서버 측 승인 처리
- **애니메이션**: GSAP (히어로 캐러셀 전환)
- **아이콘**: lucide-react

### 인증 흐름

`app/ConvexClientProvider.tsx`가 앱을 `ClerkProvider` + `ConvexProviderWithClerk`로 래핑합니다. Clerk의 `useAuth`가 Convex에 전달되어 인증된 쿼리/뮤테이션을 수행합니다. 사용자는 `clerkId` (Clerk의 `subject`)로 식별됩니다. `middleware.ts`에서 `/cart`, `/checkout`, `/orders`, `/mypage`, `/admin` 경로를 `clerkMiddleware`로 보호합니다.

### Convex 백엔드 (`convex/`)

- `schema.ts` — 7개 테이블: users, categories, products, likes, cartItems, orders, inquiries
- `auth.config.ts` — Convex용 Clerk JWT 프로바이더 설정
- `seed.ts` — 상품/카테고리 시드 데이터 입력을 위한 `seedData`, `clearAndSeed` 뮤테이션
- `users.ts` — 사용자 CRUD, 역할 관리 (admin/user)
- `products.ts` — 상품 쿼리 (목록, 검색, ID 조회), CRUD 뮤테이션
- `cart.ts` — 장바구니 작업 (추가, 수량 변경, 삭제, 비우기), userId 기반
- `orders.ts` — 주문 생명주기 (생성, 상태 변경, 사용자별/전체 목록 조회)
- `likes.ts` — 찜하기 토글, `ctx.auth.getUserIdentity()`로 인증 처리
- `inquiries.ts` — 상품 문의 Q&A, 관리자 전용 답변 뮤테이션
- `_generated/` — 자동 생성 타입 (수정 금지)

상품은 `category` 문자열 필드(slug)를 사용하며 `categories.slug`와 매칭됩니다. 상품에는 선택적으로 `longDescription`, `features` (문자열 배열), `specs` ({label, value} 객체 배열)가 포함됩니다.

### 라우트 구조

- `/` — 랜딩 페이지 (히어로 캐러셀 + 추천 상품)
- `/products` — 상품 목록 (카테고리 필터: `?category=slug`)
- `/products/[id]` — 상품 상세 페이지
- `/cart` — 장바구니 (로그인 필요)
- `/checkout` — TossPayments 결제 (로그인 필요), `/checkout/success`와 `/checkout/fail` 콜백
- `/orders`, `/orders/[id]` — 주문 내역 및 상세 (로그인 필요)
- `/mypage` — 프로필, `/mypage/orders`, `/mypage/wishlist`, `/mypage/recent` (로그인 필요)
- `/admin` — 관리자 대시보드, `/admin/products`, `/admin/orders` (로그인 필요)
- `/sign-in`, `/sign-up` — Clerk 인증 페이지 (catch-all 라우트)

### 핵심 패턴

- Convex를 사용하는 모든 페이지는 `"use client"` 컴포넌트이며 `convex/react`의 `useQuery`/`useMutation` 사용
- API 참조는 `@/convex/_generated/api`에서 임포트 (예: `api.products.list`)
- 상품 이미지는 Unsplash URL 사용; `ProductCard.tsx`에 `onError` 시 플레이스홀더 대체 처리
- 전체 한국어 로케일 적용 (Clerk에서 `koKR` 로컬라이제이션 사용)
- 경로 별칭: `@/*`가 프로젝트 루트에 매핑

## 환경 변수 (`.env.local`)

- `CONVEX_DEPLOYMENT` — Convex 배포 이름 (`npx convex dev`에서 사용)
- `NEXT_PUBLIC_CONVEX_URL` — React 클라이언트용 Convex 클라우드 URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — Clerk 인증 키
- `NEXT_PUBLIC_TOSS_CLIENT_KEY` / `TOSS_SECRET_KEY` — TossPayments 키 (테스트 모드)

## Convex 배포 워크플로우

Convex 함수나 스키마 수정 시:
1. `convex/` 내 파일 수정
2. `npx convex dev --once` 실행하여 클라우드에 반영
3. 시드 데이터가 변경된 경우 `npx convex run seed:clearAndSeed` 실행하여 재입력
