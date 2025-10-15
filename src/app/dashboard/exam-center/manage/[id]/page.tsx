import PageContainer from '@/components/layout/page-container';
import ExamCenterForm from '@/features/exam-center/components/exam-center-form';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function ExamCenterDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PageContainer scrollable>
      <div className='w-full space-y-4'>
        <div className='flex items-center gap-4'>
          <Heading
            title='고사장관리'
            description='고사장 정보를 입력하거나 수정할 수 있습니다'
          />
        </div>
        <ExamCenterForm centerId={id} />
      </div>
    </PageContainer>
  );
}
