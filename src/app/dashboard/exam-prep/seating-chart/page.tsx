'use client';

import PageContainer from '@/components/layout/page-container';
import SeatingChart from '@/features/exam-prep/components/seating-chart';
import { Heading } from '@/components/ui/heading';

export default function SeatingChartPage() {
  return (
    <PageContainer scrollable>
      <div className='w-full space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='좌석배치도'
            description='시험 좌석배치도를 조회하고 출력합니다.'
          />
        </div>
        <SeatingChart />
      </div>
    </PageContainer>
  );
}
