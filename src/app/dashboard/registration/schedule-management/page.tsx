'use client';

import PageContainer from '@/components/layout/page-container';
import ScheduleManagement from '@/features/registration/components/schedule-management';
import { Heading } from '@/components/ui/heading';

export default function ScheduleManagementPage() {
  return (
    <PageContainer scrollable>
      <div className='w-full space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='시험일정관리'
            description='시험 일정을 조회하고 관리합니다.'
          />
        </div>
        <ScheduleManagement />
      </div>
    </PageContainer>
  );
}
