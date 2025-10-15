import PageContainer from '@/components/layout/page-container';
import ExamCenterAssign from '@/features/exam-center/components/exam-center-assign';
import { Heading } from '@/components/ui/heading';

export default function ExamCenterAssignPage() {
  return (
    <PageContainer scrollable>
      <div className='flex h-full w-full flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='고사장배정'
            description='자격증 시험의 고사장을 배정할 수 있습니다'
          />
        </div>
        <div className='flex-1'>
          <ExamCenterAssign />
        </div>
      </div>
    </PageContainer>
  );
}
