'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, RotateCcw, Printer } from 'lucide-react';
import SeatingChartFilterDialog from './seating-chart-filter-dialog';

// 좌석배치도 더미 데이터 생성 함수
const generateSeatingCharts = () => {
  const qualifications = [
    '정보처리기사',
    '정보처리산업기사',
    '빅데이터분석기사',
    '정보보안기사',
    '네트워크관리사',
    '컴퓨터활용능력1급'
  ];

  const examTypes = ['정기', '수시'];

  const schoolPrefixes = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '경기',
    '강원'
  ];
  const schoolMiddles = [
    '중앙',
    '남부',
    '북부',
    '동부',
    '서부',
    '신',
    '한솔',
    '푸른',
    '밝은',
    '새'
  ];
  const schoolTypes = ['초등학교', '중학교', '고등학교', '대학교'];

  const generateSchoolName = () => {
    const prefix =
      schoolPrefixes[Math.floor(Math.random() * schoolPrefixes.length)];
    const middle =
      schoolMiddles[Math.floor(Math.random() * schoolMiddles.length)];
    const type = schoolTypes[Math.floor(Math.random() * schoolTypes.length)];
    return `${prefix}${middle}${type}`;
  };

  const charts = [];
  for (let i = 0; i < 50; i++) {
    const qualification =
      qualifications[Math.floor(Math.random() * qualifications.length)];
    const examType = examTypes[Math.floor(Math.random() * examTypes.length)];
    const year = 2025;
    const session = Math.floor(Math.random() * 3) + 1;

    charts.push({
      id: i + 1,
      qualification,
      examSession: `${session}회`,
      examType,
      examCenter: generateSchoolName(),
      candidateCount: Math.floor(Math.random() * 200) + 50
    });
  }
  return charts;
};

export default function SeatingChart() {
  const router = useRouter();

  const [seatingCharts, setSeatingCharts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    qualification: 'all',
    examSession: '',
    examType: 'all'
  });

  // useEffect를 사용하여 클라이언트에서만 데이터 생성
  useEffect(() => {
    setSeatingCharts(generateSeatingCharts());
  }, []);

  // 자격명 + 시험회차를 입력해야 시험구분 조회 가능
  const canSelectExamType =
    filters.qualification !== 'all' && filters.examSession !== '';

  // Step 1 완료: 자격명 + 시험회차 선택
  const isStep1Complete = canSelectExamType;

  const handleFilterChange = (name: string, value: string) => {
    // 자격명이나 시험회차 변경 시 시험구분 초기화
    if (name === 'qualification' || name === 'examSession') {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
        examType: 'all'
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    setFilters({
      qualification: 'all',
      examSession: '',
      examType: 'all'
    });
  };

  const handleApply = () => {
    setOpen(false);
  };

  const handlePrint = (chartId: number) => {
    // TODO: 프린트 로직
    alert(`좌석배치도 ${chartId}를 출력합니다.`);
  };

  // 1단계 필터링 (자격명 + 시험회차)
  const step1Filtered = seatingCharts.filter((chart) => {
    const matchesQualification =
      filters.qualification === 'all' ||
      chart.qualification === filters.qualification;
    const matchesExamSession =
      !filters.examSession || chart.examSession.includes(filters.examSession);

    return matchesQualification && matchesExamSession;
  });

  // 사용 가능한 시험구분 목록
  const availableExamTypes = canSelectExamType
    ? Array.from(new Set(step1Filtered.map((c) => c.examType))).sort()
    : [];

  // 최종 필터링 (시험구분)
  const filteredCharts = step1Filtered.filter((chart) => {
    const matchesExamType =
      filters.examType === 'all' || chart.examType === filters.examType;
    return matchesExamType;
  });

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== '' && v !== 'all'
  ).length;

  return (
    <div className='w-full space-y-6'>
      {/* 필터 버튼 영역 */}
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <SeatingChartFilterDialog
            filters={filters}
            onFilterChange={handleFilterChange}
            onApply={handleApply}
            onReset={handleReset}
            availableExamTypes={availableExamTypes}
            canSelectExamType={canSelectExamType}
            isStep1Complete={isStep1Complete}
            filteredCount={filteredCharts.length}
            open={open}
            onOpenChange={setOpen}
          />

          <Button
            variant='outline'
            size='lg'
            onClick={handleReset}
            disabled={activeFilterCount === 0}
          >
            <RotateCcw className='mr-2 h-4 w-4' />
            초기화
          </Button>

          {activeFilterCount > 0 && (
            <div className='flex flex-wrap items-center gap-2'>
              {filters.qualification && filters.qualification !== 'all' && (
                <Badge variant='secondary' className='gap-1'>
                  자격명: {filters.qualification}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('qualification', 'all')}
                  />
                </Badge>
              )}
              {filters.examSession && (
                <Badge variant='secondary' className='gap-1'>
                  시험회차: {filters.examSession}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('examSession', '')}
                  />
                </Badge>
              )}
              {filters.examType && filters.examType !== 'all' && (
                <Badge variant='secondary' className='gap-1'>
                  시험구분: {filters.examType}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('examType', 'all')}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 결과 헤더 */}
      <div className='flex items-center justify-between'>
        <div className='text-lg'>
          <span className='text-primary font-bold'>
            {filteredCharts.length}개
          </span>
          <span className='text-muted-foreground'>
            의 좌석배치도가 있습니다.
          </span>
        </div>
      </div>

      {/* 메인 콘텐츠 - 좌석배치도 목록 */}
      <div className='space-y-4'>
        {filteredCharts.map((chart) => (
          <Card
            key={chart.id}
            className='hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'
          >
            <CardHeader>
              <div className='flex items-start justify-between'>
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-lg leading-tight font-semibold'>
                      {chart.qualification}
                    </h3>
                    <Badge variant='default' className='shrink-0'>
                      {chart.examSession}
                    </Badge>
                  </div>
                  <p className='text-muted-foreground text-sm'>
                    {chart.examType} · {chart.examCenter}
                  </p>
                </div>
                <Button
                  variant='outline'
                  size='default'
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrint(chart.id);
                  }}
                  className='gap-2'
                >
                  <Printer className='h-4 w-4' />
                  프린트
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}

        {filteredCharts.length === 0 && (
          <Card>
            <CardContent className='text-muted-foreground py-12 text-center'>
              검색 결과가 없습니다.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
