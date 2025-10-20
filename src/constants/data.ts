import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: 삼일회계법인 사이트 구조를 벤치마킹한 네비게이션 메뉴
export const navItems: NavItem[] = [
  {
    title: '대시보드',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: '접수관리',
    url: '/dashboard/registration',
    icon: 'clipboardList',
    shortcut: ['r', 'r'],
    isActive: false,
    items: [
      {
        title: '시험일정관리',
        url: '/dashboard/registration/schedule-management',
        icon: 'calendarEvent',
        shortcut: ['r', 's']
      },
      {
        title: '고사장지역설정',
        url: '/dashboard/exam-center/region-settings',
        icon: 'mapPinCog',
        shortcut: ['r', 'v']
      },
      {
        title: '고사장수용인원설정',
        url: '/dashboard/registration/venue-capacity-settings',
        icon: 'usersGroup',
        shortcut: ['r', 'c']
      },
      {
        title: '접수/입금현황',
        url: '/dashboard/registration/payment-status',
        icon: 'cashBanknote',
        shortcut: ['r', 'p']
      },
      {
        title: '연기자현황',
        url: '/dashboard/registration/deferred-status',
        icon: 'clockPause',
        shortcut: ['r', 'd']
      },
      {
        title: '환불자현황',
        url: '/dashboard/registration/refund-status',
        icon: 'cashOff',
        shortcut: ['r', 'f']
      },
      {
        title: '단체별응시료관리',
        url: '/dashboard/registration/group-fee-management',
        icon: 'receipt',
        shortcut: ['r', 'g']
      },
      {
        title: 'SMS발송',
        url: '/dashboard/registration/sms-send',
        icon: 'mailFast',
        shortcut: ['r', 'm']
      }
    ]
  },
  {
    title: '고사장배정',
    url: '/dashboard/exam-center',
    icon: 'mapPin',
    shortcut: ['c', 'c'],
    isActive: false,
    items: [
      {
        title: '고사장관리',
        url: '/dashboard/exam-center/manage',
        icon: 'building',
        shortcut: ['c', 'm']
      },
      {
        title: '고사장배정',
        url: '/dashboard/exam-center/assign',
        icon: 'userPlus',
        shortcut: ['c', 'a']
      },
      {
        title: '배정현황',
        url: '/dashboard/exam-center/status',
        icon: 'listCheck',
        shortcut: ['c', 's']
      }
    ]
  },
  {
    title: '시험준비',
    url: '/dashboard/exam-prep',
    icon: 'fileText',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [
      {
        title: '수험자명단',
        url: '/dashboard/exam-prep/candidate-list',
        icon: 'users',
        shortcut: ['p', 'c']
      },
      {
        title: '좌석배치도',
        url: '/dashboard/exam-prep/seating-chart',
        icon: 'layoutGrid',
        shortcut: ['p', 's']
      },
      {
        title: '감독보고서',
        url: '/dashboard/exam-prep/supervisor-report',
        icon: 'clipboardText',
        shortcut: ['p', 'r']
      }
    ]
  },
  {
    title: '정보마당',
    url: '/dashboard/notice',
    icon: 'bell',
    shortcut: ['n', 'n'],
    isActive: false,
    items: [
      {
        title: '공지사항',
        url: '/dashboard/notice/announcements',
        icon: 'megaphone',
        shortcut: ['n', 'a']
      },
      {
        title: '이벤트',
        url: '/dashboard/notice/events',
        icon: 'calendar',
        shortcut: ['n', 'e']
      },
      {
        title: 'FAQ',
        url: '/dashboard/notice/faq',
        icon: 'help',
        shortcut: ['n', 'f']
      },
      {
        title: 'Q&A',
        url: '/dashboard/notice/qna',
        icon: 'message',
        shortcut: ['n', 'q']
      },
      {
        title: '자료실',
        url: '/dashboard/notice/resources',
        icon: 'folder',
        shortcut: ['n', 'r']
      }
    ]
  },
  {
    title: '마이페이지',
    url: '/dashboard/profile',
    icon: 'user',
    shortcut: ['m', 'm'],
    isActive: false,
    items: [
      {
        title: '개인정보',
        url: '/dashboard/profile/personal',
        icon: 'user',
        shortcut: ['m', 'p']
      },
      {
        title: '시험이력',
        url: '/dashboard/profile/history',
        icon: 'history',
        shortcut: ['m', 'h']
      },
      {
        title: '자격증 관리',
        url: '/dashboard/profile/certificates',
        icon: 'award',
        shortcut: ['m', 'c']
      },
      {
        title: '공지사항 관리',
        url: '/dashboard/profile/notice-management',
        icon: 'megaphone',
        shortcut: ['m', 'n']
      }
    ]
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];

// 시험 일정 데이터
export interface ExamScheduleData {
  id: string;
  title: string;
  examDate: Date;
  registrationStart: Date;
  registrationEnd: Date;
  resultDate: Date;
  currentPhase: 'announcement' | 'registration' | 'exam' | 'result';
  registeredCount: number;
  maxCapacity: number;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  icon: string;
}

export const examScheduleData: ExamScheduleData[] = [
  {
    id: 'cpa-31',
    title: '제31회 보험중개사',
    examDate: new Date('2025-11-09'),
    registrationStart: new Date('2025-07-04'),
    registrationEnd: new Date('2025-09-26'),
    resultDate: new Date('2025-12-19'),
    currentPhase: 'announcement', // 1. 시험실시 공고 단계
    registeredCount: 0,
    maxCapacity: 2000,
    color: 'blue',
    icon: '📋'
  },
  {
    id: 'accounting-1-56',
    title: '제56회 회계관리 1급',
    examDate: new Date('2025-02-22'),
    registrationStart: new Date('2025-01-15'),
    registrationEnd: new Date('2025-02-15'),
    resultDate: new Date('2025-03-15'),
    currentPhase: 'registration', // 2. 원서접수 단계
    registeredCount: 892,
    maxCapacity: 1500,
    color: 'green',
    icon: '📊'
  },
  {
    id: 'accounting-2-56',
    title: '제56회 회계관리 2급',
    examDate: new Date('2025-02-22'),
    registrationStart: new Date('2025-01-15'),
    registrationEnd: new Date('2025-02-15'),
    resultDate: new Date('2025-03-15'),
    currentPhase: 'exam', // 3. 시험실시 단계
    registeredCount: 1534,
    maxCapacity: 2500,
    color: 'purple',
    icon: '📈'
  },
  {
    id: 'financial-manager-56',
    title: '제56회 재경관리사',
    examDate: new Date('2025-02-22'),
    registrationStart: new Date('2025-01-15'),
    registrationEnd: new Date('2025-02-15'),
    resultDate: new Date('2025-03-15'),
    currentPhase: 'result', // 4. 합격자 발표 단계
    registeredCount: 2156,
    maxCapacity: 3000,
    color: 'orange',
    icon: '💼'
  }
];

// 관리자 활동 타임라인 데이터
export interface AdminActivityData {
  id: string;
  time: string;
  type:
    | 'login'
    | 'notice'
    | 'query'
    | 'approval'
    | 'alert'
    | 'system'
    | 'backup'
    | 'support';
  title: string;
  description: string;
  admin: string;
  status: 'completed' | 'processing' | 'pending' | 'failed';
  priority: 'high' | 'medium' | 'low';
}

export const adminActivityData: AdminActivityData[] = [
  {
    id: 'activity-1',
    time: '09:30am',
    type: 'login',
    title: '관리자 로그인',
    description: '시험관리팀 김관리자님이 시스템에 로그인했습니다.',
    admin: '김관리자 (시험관리팀)',
    status: 'completed',
    priority: 'low'
  },
  {
    id: 'activity-2',
    time: '10:00am',
    type: 'notice',
    title: '공지사항 등록',
    description: '"제56회 회계관리 시험장 변경 안내" 공지사항을 등록했습니다.',
    admin: '이관리자 (운영팀)',
    status: 'completed',
    priority: 'medium'
  },
  {
    id: 'activity-3',
    time: '10:30am',
    type: 'approval',
    title: '특별 접수 승인',
    description: '장애인 편의시설 요청 5건을 검토하여 승인 처리했습니다.',
    admin: '박관리자 (접수관리팀)',
    status: 'completed',
    priority: 'high'
  },
  {
    id: 'activity-4',
    time: '11:15am',
    type: 'query',
    title: '데이터 조회',
    description: '재경관리사 접수 현황 리포트를 생성했습니다.',
    admin: '최관리자 (데이터팀)',
    status: 'completed',
    priority: 'medium'
  },
  {
    id: 'activity-5',
    time: '12:00pm',
    type: 'backup',
    title: '일일 백업 실행',
    description: '시스템 데이터베이스 정기 백업이 완료되었습니다.',
    admin: '시스템 자동화',
    status: 'completed',
    priority: 'low'
  },
  {
    id: 'activity-6',
    time: '14:30pm',
    type: 'alert',
    title: '긴급 알림 발송',
    description: '접수 마감 3일 전 SMS 알림을 2,456명에게 발송했습니다.',
    admin: '정관리자 (알림팀)',
    status: 'processing',
    priority: 'high'
  },
  {
    id: 'activity-7',
    time: '15:45pm',
    type: 'support',
    title: '고객 지원',
    description: '시험 접수 관련 전화 문의 15건을 처리했습니다.',
    admin: '한관리자 (고객지원팀)',
    status: 'completed',
    priority: 'medium'
  },
  {
    id: 'activity-8',
    time: '16:20pm',
    type: 'system',
    title: '시스템 점검',
    description: '서버 성능 모니터링 및 보안 패치를 적용했습니다.',
    admin: '장관리자 (시스템팀)',
    status: 'processing',
    priority: 'high'
  }
];
