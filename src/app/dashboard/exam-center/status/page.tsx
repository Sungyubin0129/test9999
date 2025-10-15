import PageContainer from '@/components/layout/page-container';
import ExamCenterStatus from '@/features/exam-center/components/exam-center-status';
import { Heading } from '@/components/ui/heading';

export default function ExamCenterStatusPage() {
  return (
    <PageContainer scrollable>
      <div className='w-full space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='배정현황'
            description='고사장배정 현황을 확인할 수 있습니다'
          />
        </div>
        <ExamCenterStatus />
      </div>
    </PageContainer>
  );
}
