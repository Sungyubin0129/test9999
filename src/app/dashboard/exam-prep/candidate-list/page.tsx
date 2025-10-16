'use client';

import PageContainer from '@/components/layout/page-container';
import CandidateList from '@/features/exam-prep/components/candidate-list';
import { Heading } from '@/components/ui/heading';

export default function CandidateListPage() {
  return (
    <PageContainer scrollable>
      <div className='w-full space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='수험자명단'
            description='시험 수험자명단을 조회하고 관리합니다.'
          />
        </div>
        <CandidateList />
      </div>
    </PageContainer>
  );
}
