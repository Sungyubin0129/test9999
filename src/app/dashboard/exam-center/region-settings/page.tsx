'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import ExamCenterRegionSettings from '@/features/exam-center/components/exam-center-region-settings';
import { Heading } from '@/components/ui/heading';

export default function ExamCenterRegionSettingsPage() {
  return (
    <PageContainer scrollable>
      <div className='w-full space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='고사장지역설정'
            description='고사장 지역 설정을 검색하고 관리할 수 있습니다'
          />
        </div>
        <ExamCenterRegionSettings />
      </div>
    </PageContainer>
  );
}
