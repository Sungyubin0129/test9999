'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import ExamCenterManage from '@/features/exam-center/components/exam-center-manage';
import { Heading } from '@/components/ui/heading';

export default function ExamCenterManagePage() {
  return (
    <PageContainer scrollable>
      <div className='w-full space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='고사장관리'
            description='고사장 정보를 검색하고 관리할 수 있습니다'
          />
        </div>
        <ExamCenterManage />
      </div>
    </PageContainer>
  );
}
