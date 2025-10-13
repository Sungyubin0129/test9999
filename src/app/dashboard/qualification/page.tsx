import { QualificationTable } from '@/features/qualification/components/qualification-table';

export default function QualificationPage() {
  return (
    <div className='container mx-auto py-6'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold'>자격증 관리</h1>
        <p className='text-muted-foreground'>
          자격증 발급 및 관리 현황을 확인할 수 있습니다.
        </p>
      </div>
      <QualificationTable />
    </div>
  );
}
