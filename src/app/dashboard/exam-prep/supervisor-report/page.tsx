'use client';

import PageContainer from '@/components/layout/page-container';
import SupervisorReport from '@/features/exam-prep/components/supervisor-report';
import { Heading } from '@/components/ui/heading';

export default function SupervisorReportPage() {
  return (
    <PageContainer scrollable>
      <div className='w-full space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='감독보고서'
            description='시험 감독보고서를 조회하고 출력합니다.'
          />
        </div>
        <SupervisorReport />
      </div>
    </PageContainer>
  );
}
