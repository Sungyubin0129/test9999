<div align="center">
<h1>교육 및 시험 관리 시스템</h1>
<strong>Education & Examination Management System</strong>
</div>
<div align="center">Next.js 15 기반 교육 및 자격증 시험 관리 플랫폼</div>
<br />

## 개요

교육 기관 및 자격증 시험을 관리하는 종합 관리 시스템입니다. 

### 주요 기능

- 📝 **시험 관리**: CBT(Computer Based Test) 시스템 및 시험 센터 운영
- 📚 **교육 관리**: 교육 과정 및 자격증 정보 관리
- 📢 **공지사항**: 팝업 및 일반 공지사항 관리 시스템
- 💳 **결제 시스템**: 교육 및 시험 결제 처리
- 👥 **사용자 관리**: 학생, 강사, 관리자 프로필 관리
- 📊 **대시보드**: 통계 및 분석 데이터 시각화

### 기술 스택

- Framework - [Next.js 15](https://nextjs.org) (App Router)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Clerk](https://clerk.com)
- Styling - [Tailwind CSS v4](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- State Management - [Zustand](https://zustand-demo.pmnd.rs)
- Rich Text Editor - [CKEditor 5](https://ckeditor.com)
- Tables - [Tanstack Data Tables](https://ui.shadcn.com/docs/components/data-table)
- Forms - [React Hook Form](https://ui.shadcn.com/docs/components/form)
- Command+k interface - [kbar](https://kbar.vercel.app/)
- Error tracking - [Sentry](https://sentry.io)
- Linting - [ESLint](https://eslint.org) / [Prettier](https://prettier.io)

## 주요 페이지

| 페이지 | 설명 |
| :--- | :--- |
| **인증** | |
| `/auth/sign-in` | 로그인 페이지 (Clerk 인증) |
| `/auth/sign-up` | 회원가입 페이지 |
| **대시보드** | |
| `/dashboard/overview` | 대시보드 메인 - 통계 및 분석 그래프 (Recharts) |
| **시험 관리** | |
| `/dashboard/exam` | 시험 목록 및 관리 |
| `/dashboard/exam-center` | 시험 센터 관리 |
| `/dashboard/exam-prep` | 시험 준비 자료 |
| `/dashboard/exam-info` | 시험 정보 |
| `/dashboard/cbt` | CBT(Computer Based Test) 시스템 |
| **교육 및 자격증** | |
| `/dashboard/qualification` | 자격증 정보 관리 |
| **결제** | |
| `/dashboard/payment` | 결제 처리 및 내역 |
| **상품 관리** | |
| `/dashboard/product` | 상품 목록 (Tanstack Table, 서버 사이드 검색/필터/페이지네이션) |
| **프로필** | |
| `/dashboard/profile` | 사용자 프로필 및 설정 |
| `/dashboard/profile/notice-management` | 공지사항 관리 (CKEditor 리치 텍스트 에디터) |
| **관리자** | |
| `/dashboard/admin` | 관리자 전용 페이지 |
| **기타** | |
| `/dashboard/kanban` | 칸반 보드 (드래그 앤 드롭 작업 관리) |

## 프로젝트 구조

```plaintext
src/
├── app/                              # Next.js App Router
│   ├── auth/                        # 인증 페이지
│   │   ├── sign-in/                # 로그인
│   │   └── sign-up/                # 회원가입
│   ├── dashboard/                   # 대시보드
│   │   ├── overview/               # 메인 대시보드
│   │   ├── exam/                   # 시험 관리
│   │   ├── exam-center/            # 시험 센터 관리
│   │   ├── exam-prep/              # 시험 준비
│   │   ├── exam-info/              # 시험 정보
│   │   ├── cbt/                    # CBT 시스템
│   │   ├── qualification/          # 자격증 관리
│   │   ├── payment/                # 결제
│   │   ├── product/                # 상품 관리
│   │   ├── profile/                # 프로필
│   │   │   └── notice-management/  # 공지사항 관리
│   │   ├── admin/                  # 관리자
│   │   └── kanban/                 # 칸반 보드
│   ├── globals.css                 # 전역 스타일
│   └── layout.tsx                  # 루트 레이아웃
│
├── components/                      # 공유 컴포넌트
│   ├── ui/                         # UI 기본 컴포넌트
│   ├── layout/                     # 레이아웃 컴포넌트
│   ├── forms/                      # 폼 컴포넌트
│   ├── notice-editor.tsx           # 공지사항 에디터
│   ├── ckeditor-wrapper.tsx        # CKEditor 래퍼
│   └── ...                         # 기타 컴포넌트
│
├── features/                        # 기능별 모듈
│   ├── auth/                       # 인증 관련
│   ├── exam/                       # 시험 관련
│   ├── exam-center/                # 시험 센터
│   ├── exam-prep/                  # 시험 준비
│   ├── cbt/                        # CBT 시스템
│   ├── payment/                    # 결제
│   ├── products/                   # 상품
│   ├── profile/                    # 프로필
│   ├── qualification/              # 자격증
│   ├── overview/                   # 대시보드 개요
│   ├── kanban/                     # 칸반
│   └── admin/                      # 관리자
│
├── lib/                            # 유틸리티 및 설정
│   ├── auth-config.ts             # 인증 설정
│   ├── db/                        # 데이터베이스
│   ├── utils.ts                   # 유틸 함수
│   └── ...
│
├── hooks/                          # 커스텀 훅
│   ├── use-data-table.ts
│   ├── use-debounce.tsx
│   └── ...
│
└── types/                          # TypeScript 타입
    └── index.ts
```

## 시작하기

> [!NOTE]  
> 이 프로젝트는 **Next.js 15**와 **React 19**를 사용합니다.

### 설치 및 실행

1. 의존성 설치:
   ```bash
   pnpm install
   ```

2. 환경 변수 설정:
   ```bash
   cp env.example.txt .env.local
   ```
   `.env.local` 파일에 필요한 환경 변수를 추가하세요.

3. 개발 서버 실행:
   ```bash
   pnpm run dev
   ```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 환경 변수 설정

`env.example.txt` 파일을 참고하여 다음 환경 변수를 설정하세요:
- Clerk 인증 관련 설정
- Sentry 에러 트래킹 설정
- 기타 필요한 API 키 및 설정

### 빌드

```bash
pnpm run build
pnpm run start
```
