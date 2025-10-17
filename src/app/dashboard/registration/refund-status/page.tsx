'use client';

import PageContainer from '@/components/layout/page-container';
import RefundStatus from '@/features/registration/components/refund-status';
import { Heading } from '@/components/ui/heading';

export default function RefundStatusPage() {
  return (
    <PageContainer scrollable>
      <div className='w-full space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='환불자현황'
            description='환불 신청 및 처리 현황을 조회하고 관리합니다.'
          />
        </div>
        <RefundStatus />
      </div>
    </PageContainer>
  );
}
