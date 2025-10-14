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
    title: '시험안내',
    url: '/dashboard/exam-info',
    icon: 'info',
    shortcut: ['e', 'i'],
    isActive: false,
    items: [
      {
        title: '종목소개',
        url: '/dashboard/exam-info/subjects',
        icon: 'book',
        shortcut: ['e', 's']
      },
      {
        title: '시험일정',
        url: '/dashboard/exam-info/schedule',
        icon: 'calendar',
        shortcut: ['e', 'd']
      },
      {
        title: '수험자 가이드',
        url: '/dashboard/exam-info/guide',
        icon: 'help',
        shortcut: ['e', 'g']
      },
      {
        title: '우대사항',
        url: '/dashboard/exam-info/benefits',
        icon: 'gift',
        shortcut: ['e', 'b']
      },
      {
        title: '응시규정',
        url: '/dashboard/exam-info/rules',
        icon: 'shield',
        shortcut: ['e', 'r']
      }
    ]
  },
  {
    title: '시험접수',
    url: '/dashboard/exam-registration',
    icon: 'edit',
    shortcut: ['r', 'r'],
    isActive: false,
    items: [
      {
        title: '접수하기',
        url: '/dashboard/exam-registration/apply',
        icon: 'edit',
        shortcut: ['r', 'a']
      },
      {
        title: '접수확인',
        url: '/dashboard/exam-registration/check',
        icon: 'search',
        shortcut: ['r', 'c']
      },
      {
        title: '취소/환불',
        url: '/dashboard/exam-registration/cancel',
        icon: 'x',
        shortcut: ['r', 'x']
      },
      {
        title: '수험표발급',
        url: '/dashboard/exam-registration/ticket',
        icon: 'ticket',
        shortcut: ['r', 't']
      }
    ]
  },
  {
    title: '합격확인',
    url: '/dashboard/results',
    icon: 'award',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [
      {
        title: '합격여부/점수확인',
        url: '/dashboard/results/check',
        icon: 'check',
        shortcut: ['p', 'c']
      },
      {
        title: '자격증신청',
        url: '/dashboard/results/certificate',
        icon: 'certificate',
        shortcut: ['p', 'a']
      },
      {
        title: '자격증 결제하기',
        url: '/dashboard/results/payment',
        icon: 'creditCard',
        shortcut: ['p', 'p']
      },
      {
        title: '자격증배송확인',
        url: '/dashboard/results/shipping',
        icon: 'truck',
        shortcut: ['p', 's']
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
