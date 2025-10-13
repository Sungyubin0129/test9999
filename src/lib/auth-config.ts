// Java 프로젝트의 인증 시스템을 Next.js로 마이그레이션
// Clerk 대신 자체 인증 시스템 구현

export const authConfig = {
  // Java 프로젝트의 로그인 세션 구조
  session: {
    // Java의 LoginSession 클래스 매핑
    user_id: 'string',
    login_ip: 'string',
    login_user_agent: 'string',
    member_session: 'object'
  },

  // 인증 방식
  providers: {
    // 1. NextAuth.js (권장)
    nextAuth: {
      providers: ['credentials', 'email'],
      callbacks: {
        jwt: true,
        session: true
      }
    },

    // 2. 자체 JWT 인증
    customJWT: {
      secret: process.env.JWT_SECRET,
      expiresIn: '24h',
      refreshToken: true
    }
  },

  // Java 프로젝트의 보안 기능
  security: {
    ipValidation: true, // IP 검증
    userAgentValidation: true, // User-Agent 검증
    sessionTimeout: 60, // 세션 타임아웃 (분)
    passwordPolicy: {
      minLength: 8,
      requireSpecialChar: true,
      requireNumber: true
    }
  }
};

// Java 프로젝트의 사용자 역할 매핑
export const userRoles = {
  ADMIN: '90001', // 관리자
  ACCEPT: '90002', // 접수담당자
  LICENSE: '90003', // 자격증담당자
  USER: '10000' // 일반사용자
};
