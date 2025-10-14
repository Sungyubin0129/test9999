import {
  IconAlertTriangle,
  IconArrowRight,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCommand,
  IconCreditCard,
  IconFile,
  IconFileText,
  IconHelpCircle,
  IconPhoto,
  IconDeviceLaptop,
  IconLayoutDashboard,
  IconLoader2,
  IconLogin,
  IconProps,
  IconShoppingBag,
  IconMoon,
  IconDotsVertical,
  IconPizza,
  IconPlus,
  IconSettings,
  IconSun,
  IconTrash,
  IconBrandTwitter,
  IconUser,
  IconUserCircle,
  IconUserEdit,
  IconUserX,
  IconX,
  IconLayoutKanban,
  IconBrandGithub,
  IconAward,
  IconFileText as IconFileTextNew,
  IconCalendar
} from '@tabler/icons-react';

export type Icon = React.ComponentType<IconProps>;

export const Icons = {
  dashboard: IconLayoutDashboard,
  logo: IconCommand,
  login: IconLogin,
  close: IconX,
  product: IconShoppingBag,
  spinner: IconLoader2,
  kanban: IconLayoutKanban,
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  trash: IconTrash,
  employee: IconUserX,
  post: IconFileText,
  page: IconFile,
  userPen: IconUserEdit,
  user2: IconUserCircle,
  media: IconPhoto,
  settings: IconSettings,
  billing: IconCreditCard,
  ellipsis: IconDotsVertical,
  add: IconPlus,
  warning: IconAlertTriangle,
  user: IconUser,
  arrowRight: IconArrowRight,
  help: IconHelpCircle,
  pizza: IconPizza,
  sun: IconSun,
  moon: IconMoon,
  laptop: IconDeviceLaptop,
  github: IconBrandGithub,
  twitter: IconBrandTwitter,
  check: IconCheck,
  // 기존 아이콘들
  award: IconAward,
  fileText: IconFileTextNew,
  calendar: IconCalendar,
  creditCard: IconCreditCard,
  // 삼일회계법인 메뉴용 아이콘들 (기존 아이콘으로 대체)
  info: IconHelpCircle, // 시험안내
  book: IconFile, // 종목소개
  gift: IconAward, // 우대사항
  shield: IconSettings, // 응시규정
  edit: IconUserEdit, // 시험접수
  search: IconHelpCircle, // 접수확인
  x: IconX, // 취소
  ticket: IconFileText, // 수험표발급
  checkCircle: IconCheck, // 합격확인
  certificate: IconAward, // 자격증신청
  truck: IconArrowRight, // 자격증배송확인
  bell: IconHelpCircle, // 정보마당 (IconBell 대신 IconHelpCircle 사용)
  megaphone: IconHelpCircle, // 공지사항
  message: IconHelpCircle, // Q&A
  folder: IconFile, // 자료실
  history: IconCalendar // 시험이력
};
