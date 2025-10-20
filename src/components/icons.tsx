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
  IconCalendar,
  IconClipboardList,
  IconUsers,
  IconLayoutGrid,
  IconInfoCircle,
  IconBooks,
  IconFileCheck,
  IconStar,
  IconShieldCheck,
  IconMapPin,
  IconBuilding,
  IconUserPlus,
  IconList,
  IconBell,
  IconSpeakerphone,
  IconSpeakerphone as IconMegaphone,
  IconMessages,
  IconFolder,
  IconHistory,
  IconCalendarEvent,
  IconMapPinCog,
  IconUsersGroup,
  IconCashBanknote,
  IconClockPause,
  IconCashOff,
  IconReceipt,
  IconMailFast,
  IconClipboardText
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
  clipboardList: IconClipboardList,
  users: IconUsers,
  layoutGrid: IconLayoutGrid,
  // 최신 스타일 아이콘들
  info: IconInfoCircle, // 접수관리
  book: IconCalendarEvent, // 시험일정관리
  guide: IconUsersGroup, // 고사장수용인원설정
  gift: IconCashBanknote, // 접수/입금현황
  shield: IconReceipt, // 기타 관리 메뉴들
  mapPin: IconMapPin, // 고사장배정 (메인)
  building: IconBuilding, // 고사장관리
  userPlus: IconUserPlus, // 고사장배정 (서브)
  listCheck: IconList, // 배정현황
  bell: IconBell, // 정보마당
  megaphone: IconSpeakerphone, // 공지사항
  message: IconMessages, // Q&A
  folder: IconFolder, // 자료실
  history: IconHistory, // 시험이력
  calendarEvent: IconCalendarEvent, // 시험일정관리
  mapPinCog: IconMapPinCog, // 고사장지역설정
  usersGroup: IconUsersGroup, // 고사장수용인원설정
  cashBanknote: IconCashBanknote, // 접수/입금현황
  clockPause: IconClockPause, // 연기자현황
  cashOff: IconCashOff, // 환불자현황
  receipt: IconReceipt, // 단체별응시료관리
  mailFast: IconMailFast, // SMS발송
  clipboardText: IconClipboardText, // 감독보고서
  // 기존 호환성 유지
  edit: IconUserEdit,
  search: IconHelpCircle,
  x: IconX,
  ticket: IconFileText,
  checkCircle: IconCheck,
  certificate: IconAward,
  truck: IconArrowRight
};
