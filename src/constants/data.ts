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
        url: '/dashboard/registration/venue-region-settings',
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
