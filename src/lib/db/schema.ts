// Java 프로젝트의 데이터베이스 스키마를 Prisma로 마이그레이션
// 주요 테이블들을 Next.js에서 사용할 수 있도록 변환

import {
  pgTable,
  varchar,
  int,
  timestamp,
  boolean,
  text,
  decimal
} from 'drizzle-orm/pg-core';

// 사용자 테이블 (Q_USER)
export const users = pgTable('users', {
  user_no: varchar('user_no').primaryKey(),
  user_id: varchar('user_id').notNull().unique(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  hp: varchar('hp'), // 휴대폰번호
  jumin1: varchar('jumin1'), // 주민번호 앞자리
  jumin2: varchar('jumin2'), // 주민번호 뒷자리
  address: varchar('address'),
  detail_address: varchar('detail_address'),
  tech_major: varchar('tech_major'), // 기술전공
  schooling: varchar('schooling'), // 학력
  graduate: varchar('graduate'), // 졸업여부
  major: varchar('major'), // 학과/전공
  jobgroup: varchar('jobgroup'), // 직업군
  birth: varchar('birth'), // 생년월일
  state_reg: int('state_reg').default(1), // 상태
  reg_date: timestamp('reg_date').defaultNow(),
  upd_date: timestamp('upd_date')
});

// 자격증 종류 테이블 (Q_LICENSE_KIND)
export const licenseKinds = pgTable('license_kinds', {
  license_code: varchar('license_code').primaryKey(),
  exam_kind: varchar('exam_kind').notNull(),
  exam_rec: varchar('exam_rec').notNull(),
  mber_no: varchar('mber_no').notNull(),
  mber_id: varchar('mber_id').notNull(),
  pass_date: timestamp('pass_date'),
  tq_sdate: timestamp('tq_sdate'),
  tq_edate: timestamp('tq_edate'),
  state_reg: int('state_reg').default(1),
  reg_date: timestamp('reg_date').defaultNow(),
  upd_date: timestamp('upd_date')
});

// 시험장바구니 테이블 (Q_EXAM_CART)
export const examCarts = pgTable('exam_carts', {
  cart_no: varchar('cart_no').primaryKey(),
  user_no: varchar('user_no').notNull(),
  license_code: varchar('license_code').notNull(),
  exam_kind: varchar('exam_kind').notNull(),
  exam_rec: varchar('exam_rec').notNull(),
  cart_div: varchar('cart_div').default('0'), // 0: 일반, 1: 장바구니
  reg_date: timestamp('reg_date').defaultNow()
});

// 자격연장 테이블 (Q_QUALIFICATION_EXT)
export const qualificationExts = pgTable('qualification_exts', {
  tq_id: varchar('tq_id').primaryKey(),
  license_code: varchar('license_code').notNull(),
  ext_yn: varchar('ext_yn').default('N'),
  score1: varchar('score1'),
  score2: varchar('score2'),
  score3: varchar('score3'),
  ext_date: timestamp('ext_date'),
  reg_date: timestamp('reg_date').defaultNow()
});

// 문제 관리 테이블 (Q_QUE_TYPE_MANAGE)
export const queTypeManages = pgTable('que_type_manages', {
  que_id: varchar('que_id').primaryKey(),
  exam_kind: varchar('exam_kind').notNull(),
  exam_div: varchar('exam_div').notNull(),
  que_type: varchar('que_type').notNull(),
  que_title: text('que_title').notNull(),
  que_content: text('que_content'),
  que_answer: text('que_answer'),
  que_explanation: text('que_explanation'),
  que_score: int('que_score').default(1),
  use_at: varchar('use_at').default('Y'),
  reg_date: timestamp('reg_date').defaultNow(),
  upd_date: timestamp('upd_date')
});

// 시험 일정 테이블 (Q_EXAM_SCHEDULE)
export const examSchedules = pgTable('exam_schedules', {
  schedule_id: varchar('schedule_id').primaryKey(),
  exam_kind: varchar('exam_kind').notNull(),
  exam_rec: varchar('exam_rec').notNull(),
  exam_date: timestamp('exam_date').notNull(),
  exam_start_time: varchar('exam_start_time'),
  exam_end_time: varchar('exam_end_time'),
  exam_location: varchar('exam_location'),
  max_participants: int('max_participants'),
  current_participants: int('current_participants').default(0),
  state_reg: int('state_reg').default(1),
  reg_date: timestamp('reg_date').defaultNow(),
  upd_date: timestamp('upd_date')
});

// 관리자 테이블 (Q_ADMIN)
export const admins = pgTable('admins', {
  admin_id: varchar('admin_id').primaryKey(),
  admin_name: varchar('admin_name').notNull(),
  admin_email: varchar('admin_email').notNull(),
  admin_password: varchar('admin_password').notNull(),
  admin_role: varchar('admin_role').notNull(), // 90001: 관리자, 90002: 접수담당자, 90003: 자격증담당자
  last_login: timestamp('last_login'),
  login_ip: varchar('login_ip'),
  state_reg: int('state_reg').default(1),
  reg_date: timestamp('reg_date').defaultNow(),
  upd_date: timestamp('upd_date')
});

// 파일 첨부 테이블 (Q_ATTACHED_FILE)
export const attachedFiles = pgTable('attached_files', {
  file_id: varchar('file_id').primaryKey(),
  file_name: varchar('file_name').notNull(),
  file_path: varchar('file_path').notNull(),
  file_size: int('file_size'),
  content_type: varchar('content_type'),
  reg_date: timestamp('reg_date').defaultNow()
});

// 관계 정의
export const relations = {
  // 사용자와 자격증 종류 관계
  userLicenseKinds: {
    user: users,
    licenseKinds: licenseKinds
  },

  // 사용자와 시험장바구니 관계
  userExamCarts: {
    user: users,
    examCarts: examCarts
  },

  // 자격증 종류와 자격연장 관계
  licenseQualificationExts: {
    licenseKinds: licenseKinds,
    qualificationExts: qualificationExts
  }
};
