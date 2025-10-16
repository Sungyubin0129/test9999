'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, FileDown, MapPin, RotateCcw } from 'lucide-react';
import ExamCenterFilterDialog from './exam-center-filter-dialog';

// 배정현황 더미 데이터 생성
const generateAssignmentStatus = () => {
  const qualifications = [
    '정보처리기사',
    '정보처리산업기사',
    '빅데이터분석기사',
    '정보보안기사',
    '네트워크관리사',
    '컴퓨터활용능력1급'
  ];
  const examTypes = ['정기', '수시'];
  const regions = [
    '강원',
    '경기',
    '경기(송내)',
    '경주',
    '광주',
    '당진',
    '대구',
    '대전',
    '부산',
    '서울',
    '서울(구룡)',
    '서울(무학)',
    '서울(여자)',
    '서울(한양중공업)',
    '아산(천안)',
    '안동',
    '울산',
    '인천',
    '전주(익산)',
    '창원',
    '청주'
  ];

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

  const lastNames = [
    '김',
    '이',
    '박',
    '최',
    '정',
    '강',
    '조',
    '윤',
    '장',
    '임',
    '한',
    '오',
    '서',
    '신',
    '권',
    '황',
    '안',
    '송',
    '류',
    '전'
  ];
  const firstNames = [
    '민준',
    '서연',
    '도윤',
    '서준',
    '예준',
    '하은',
    '지우',
    '수빈',
    '시우',
    '은우',
    '현우',
    '지훈',
    '준서',
    '유진',
    '채원',
    '지민',
    '주원',
    '지안',
    '수아',
    '윤서'
  ];
  const organizations = [
    '개인',
    'A그룹',
    'B그룹',
    'C그룹',
    '삼성전자',
    'LG전자',
    '현대자동차',
    'SK하이닉스'
  ];
  const rooms = ['1실', '2실', '3실', '4실', '5실'];
  const periods = ['1교시', '2교시', '3교시', '4교시'];

  const generateName = () => {
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    return lastName + firstName;
  };

  const generateBirthDate = () => {
    const year = 1985 + Math.floor(Math.random() * 25); // 1985-2009
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const generateExamNumber = () => {
    const prefix = String(Math.floor(Math.random() * 900) + 100);
    const suffix = String(Math.floor(Math.random() * 90000) + 10000);
    return `${prefix}-${suffix}`;
  };

  const statuses = [];
  for (let i = 0; i < 85; i++) {
    const qualification =
      qualifications[Math.floor(Math.random() * qualifications.length)];
    const examType = examTypes[Math.floor(Math.random() * examTypes.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const year = 2025;
    const session = Math.floor(Math.random() * 3) + 1;

    const prefix =
      schoolPrefixes[Math.floor(Math.random() * schoolPrefixes.length)];
    const middle =
      schoolMiddles[Math.floor(Math.random() * schoolMiddles.length)];
    const type = schoolTypes[Math.floor(Math.random() * schoolTypes.length)];
    const schoolName = `${prefix}${middle}${type}`;

    const applicants = Math.floor(Math.random() * 300) + 50;

    statuses.push({
      id: i + 1,
      name: generateName(),
      birthDate: generateBirthDate(),
      examNumber: generateExamNumber(),
      qualification,
      examSession: `${year}년 ${session}회`,
      examType,
      region,
      examCenter: schoolName,
      organization:
        organizations[Math.floor(Math.random() * organizations.length)],
      room: rooms[Math.floor(Math.random() * rooms.length)],
      period: periods[Math.floor(Math.random() * periods.length)],
      applicants,
      status: applicants > 200 ? '배정완료' : '배정중'
    });
  }
  return statuses;
};

export default function ExamCenterStatus() {
  const [open, setOpen] = useState(false);
  const [assignmentStatuses, setAssignmentStatuses] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    qualification: 'all',
    region: 'all',
    period: 'all',
    examSession: '',
    examCenter: 'all',
    organization: 'all',
    examType: 'all',
    room: 'all',
    name: ''
  });

  // useEffect를 사용하여 클라이언트에서만 데이터 생성
  useEffect(() => {
    setAssignmentStatuses(generateAssignmentStatus());
  }, []);

  // 단계별 활성화 상태 확인
  const isStep1Complete =
    filters.qualification !== 'all' &&
    filters.examSession !== '' &&
    filters.examType !== 'all';
  const isStep2Complete = isStep1Complete && filters.region !== 'all';
  const isStep3Complete = isStep2Complete && filters.examCenter !== 'all';

  const handleFilterChange = (name: string, value: string) => {
    // 이전 단계를 변경하면 다음 단계 초기화
    if (
      name === 'qualification' ||
      name === 'examSession' ||
      name === 'examType'
    ) {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
        region: 'all',
        examCenter: 'all',
        room: 'all'
      }));
    } else if (name === 'region') {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
        examCenter: 'all',
        room: 'all'
      }));
    } else if (name === 'examCenter') {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
        room: 'all'
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    setFilters({
      qualification: 'all',
      region: 'all',
      period: 'all',
      examSession: '',
      examCenter: 'all',
      organization: 'all',
      examType: 'all',
      room: 'all',
      name: ''
    });
  };

  const handleApply = () => {
    setOpen(false);
  };

  const handleExcelDownload = () => {
    // TODO: 엑셀 다운로드 로직
    alert('엑셀 파일을 다운로드합니다.');
  };

  const handleExamCenterMove = () => {
    // TODO: 시험장 이동 로직
    alert('시험장 이동 기능입니다.');
  };

  // 1단계 필터링 (시험정보)
  const step1Filtered = assignmentStatuses.filter((status) => {
    const matchesQualification =
      filters.qualification === 'all' ||
      status.qualification === filters.qualification;
    const matchesExamType =
      filters.examType === 'all' || status.examType === filters.examType;
    const matchesExamSession =
      !filters.examSession || status.examSession.includes(filters.examSession);

    return matchesQualification && matchesExamType && matchesExamSession;
  });

  // 2단계 필터링 (지역)
  const step2Filtered = step1Filtered.filter((status) => {
    const matchesRegion =
      filters.region === 'all' || status.region === filters.region;
    return matchesRegion;
  });

  // 3단계 필터링 (고사장)
  const step3Filtered = step2Filtered.filter((status) => {
    const matchesExamCenter =
      filters.examCenter === 'all' || status.examCenter === filters.examCenter;
    return matchesExamCenter;
  });

  // 최종 필터링 (4단계 상세옵션 포함)
  const filteredStatuses = step3Filtered.filter((status) => {
    const matchesPeriod =
      filters.period === 'all' || status.period === filters.period;
    const matchesRoom = filters.room === 'all' || status.room === filters.room;
    const matchesOrganization =
      filters.organization === 'all' ||
      status.organization === filters.organization;
    const matchesName = !filters.name || status.name.includes(filters.name);

    return matchesPeriod && matchesRoom && matchesOrganization && matchesName;
  });

  // 각 단계에서 사용 가능한 옵션 목록 추출
  const availableRegions = isStep1Complete
    ? Array.from(new Set(step1Filtered.map((s) => s.region))).sort()
    : [];

  const availableExamCenters = isStep2Complete
    ? Array.from(new Set(step2Filtered.map((s) => s.examCenter))).sort()
    : [];

  const availableRooms = isStep3Complete
    ? Array.from(new Set(step3Filtered.map((s) => s.room))).sort()
    : [];

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== '' && v !== 'all'
  ).length;

  return (
    <div className='w-full space-y-6'>
      {/* 필터 버튼 영역 */}
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <ExamCenterFilterDialog
            filters={filters}
            onFilterChange={handleFilterChange}
            onApply={handleApply}
            onReset={handleReset}
            availableRegions={availableRegions}
            availableExamCenters={availableExamCenters}
            availableRooms={availableRooms}
            isStep1Complete={isStep1Complete}
            isStep2Complete={isStep2Complete}
            isStep3Complete={isStep3Complete}
            filteredCount={filteredStatuses.length}
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
              {filters.region && filters.region !== 'all' && (
                <Badge variant='secondary' className='gap-1'>
                  지역: {filters.region}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('region', 'all')}
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
              {filters.examSession && (
                <Badge variant='secondary' className='gap-1'>
                  시험회차: {filters.examSession}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('examSession', '')}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className='flex items-center gap-3'>
          <Button variant='outline' size='lg' onClick={handleExcelDownload}>
            <FileDown className='mr-2 h-4 w-4' />
            엑셀저장
          </Button>

          <Button variant='outline' size='lg' onClick={handleExamCenterMove}>
            <MapPin className='mr-2 h-4 w-4' />
            시험장이동
          </Button>
        </div>
      </div>

      {/* 결과 헤더 */}
      <div className='flex items-center justify-between'>
        <div className='text-lg'>
          <span className='text-primary font-bold'>
            {filteredStatuses.length}개
          </span>
          <span className='text-muted-foreground'>의 배정현황이 있습니다.</span>
        </div>
      </div>

      {/* 메인 콘텐츠 - 배정현황 목록 */}
      <div className='space-y-4'>
        {filteredStatuses.map((status) => (
          <Card
            key={status.id}
            className='hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'
          >
            <CardHeader className='pb-3'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-lg leading-tight font-semibold'>
                      {status.name}
                    </h3>
                    <Badge variant='default' className='shrink-0'>
                      {status.examNumber}
                    </Badge>
                  </div>
                  <p className='text-muted-foreground text-sm'>
                    {status.qualification} · {status.birthDate}
                  </p>
                </div>
                <Badge variant='secondary' className='shrink-0'>
                  {status.region}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-4'>
                <div>
                  <span className='text-sm font-medium'>고사장:</span>
                  <span className='text-muted-foreground ml-2 text-sm'>
                    {status.examCenter}
                  </span>
                </div>
                <div>
                  <span className='text-sm font-medium'>단체명:</span>
                  <span className='text-muted-foreground ml-2 text-sm'>
                    {status.organization}
                  </span>
                </div>
                <div>
                  <span className='text-sm font-medium'>실:</span>
                  <span className='text-muted-foreground ml-2 text-sm'>
                    {status.room}
                  </span>
                </div>
                <div>
                  <span className='text-sm font-medium'>교시:</span>
                  <span className='text-muted-foreground ml-2 text-sm'>
                    {status.period}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredStatuses.length === 0 && (
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
