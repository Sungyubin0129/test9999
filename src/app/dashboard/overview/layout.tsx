import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
  CardContent
} from '@/components/ui/card';
import { ExamScheduleTimeline } from '@/components/exam-schedule-timeline';
import { AdminActivityTimeline } from '@/components/admin-activity-timeline';
import { UnifiedNoticeManagement } from '@/components/unified-notice-management';
import { CertificateApplicationStatus } from '@/components/certificate-application-status';
import { examScheduleData, adminActivityData } from '@/constants/data';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import React from 'react';

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              삼일회계법인 자격시험 시스템
            </h2>
            <p className='text-muted-foreground'>
              재경관리사, 회계관리 1급, 회계관리 2급 자격시험 관리 시스템
            </p>
          </div>
        </div>

        {/* 시험일정 현황 섹션 */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-7'>
          {/* 시험일정 타임라인 */}
          <div className='col-span-4'>
            <ExamScheduleTimeline schedules={examScheduleData} />
          </div>

          {/* 통합 공지사항 관리 */}
          <div className='col-span-4 md:col-span-3'>
            <UnifiedNoticeManagement />
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>{bar_stats}</div>
          <div className='col-span-4 md:col-span-3'>
            {/* Pie Chart (실제 데이터) */}
            {pie_stats}
          </div>
        </div>

        {/* 관리 섹션 */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>
            {/* 자격증 신청 현황 */}
            <CertificateApplicationStatus />
          </div>
          <div className='col-span-4 md:col-span-3'>
            {/* 관리자 활동 타임라인 */}
            <AdminActivityTimeline activities={adminActivityData} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
