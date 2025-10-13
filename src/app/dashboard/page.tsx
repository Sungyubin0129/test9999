import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // 대시보드 페이지는 바로 overview로 리다이렉트
  // 인증은 미들웨어에서 처리됨
  redirect('/dashboard/overview');
}
