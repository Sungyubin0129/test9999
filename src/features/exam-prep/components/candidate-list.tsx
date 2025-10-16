'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, FileDown, RotateCcw } from 'lucide-react';
import CandidateListFilterDialog from './candidate-list-filter-dialog';

// 수험자명단 더미 데이터 생성
const generateCandidateList = () => {
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
  const departments = [
    '개발팀',
    '영업팀',
    '기획팀',
    '인사팀',
    '총무팀',
    '마케팅팀'
  ];
  const positions = ['사원', '주임', '대리', '과장', '차장', '부장'];
  const genders = ['남', '여'];
  const receptionTypes = ['온라인', '방문', '우편'];
  const paymentTypes = ['카드', '계좌이체', '현금'];

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

  const generateReceptionDate = () => {
    const year = 2024;
    const month = String(Math.floor(Math.random() * 3) + 10).padStart(2, '0'); // 10-12월
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  const generateMobilePhone = () => {
    const middle = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    const last = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    return `010-${middle}-${last}`;
  };

  const generatePhone = () => {
    const area = ['02', '031', '032', '051', '053', '062', '042'][
      Math.floor(Math.random() * 7)
    ];
    const middle = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    const last = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    return `${area}-${middle}-${last}`;
  };

  const generateEmail = (name: string) => {
    const domains = ['naver.com', 'gmail.com', 'daum.net', 'hanmail.net'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${name.toLowerCase()}${Math.floor(Math.random() * 1000)}@${domain}`;
  };

  const generatePostalCode = () => {
    return String(Math.floor(Math.random() * 90000) + 10000);
  };

  const generateAddress = () => {
    const cities = ['서울', '부산', '대구', '인천', '광주', '대전', '울산'];
    const districts = ['강남구', '서초구', '송파구', '강동구', '중구', '동구'];
    const streets = ['테헤란로', '역삼로', '논현로', '선릉로', '봉은사로'];

    const city = cities[Math.floor(Math.random() * cities.length)];
    const district = districts[Math.floor(Math.random() * districts.length)];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const number = Math.floor(Math.random() * 200) + 1;

    return `${city}시 ${district} ${street} ${number}`;
  };

  const candidates = [];
  for (let i = 0; i < 120; i++) {
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
    const name = generateName();

    candidates.push({
      id: i + 1,
      name,
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
      receptionDate: generateReceptionDate(),
      mobilePhone: generateMobilePhone(),
      phone: generatePhone(),
      email: generateEmail(name),
      postalCode: generatePostalCode(),
      address: generateAddress(),
      affiliation:
        organizations[Math.floor(Math.random() * organizations.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
      gender: genders[Math.floor(Math.random() * genders.length)],
      receptionType:
        receptionTypes[Math.floor(Math.random() * receptionTypes.length)],
      paymentType: paymentTypes[Math.floor(Math.random() * paymentTypes.length)]
    });
  }
  return candidates;
};

export default function CandidateList() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    qualification: 'all',
    examSession: '',
    examType: 'all',
    region: 'all',
    examCenter: 'all'
  });

  const [candidateList, setCandidateList] = useState<any[]>([]);

  // useEffect를 사용하여 클라이언트에서만 데이터 생성
  useEffect(() => {
    setCandidateList(generateCandidateList());
  }, []);

  // 단계별 활성화 상태 확인
  // 자격명 + 시험회차를 입력하면 시험구분 조회 가능
  const canSelectExamType =
    filters.qualification !== 'all' && filters.examSession !== '';

  // Step 1 완료: 자격명 + 시험회차 + 시험구분까지 선택
  const isStep1Complete = canSelectExamType && filters.examType !== 'all';

  // Step 2 완료: 지역까지 선택
  const isStep2Complete = isStep1Complete && filters.region !== 'all';

  const handleFilterChange = (name: string, value: string) => {
    // 이전 단계를 변경하면 다음 단계 초기화
    if (name === 'qualification' || name === 'examSession') {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
        examType: 'all',
        region: 'all',
        examCenter: 'all'
      }));
    } else if (name === 'examType') {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
        region: 'all',
        examCenter: 'all'
      }));
    } else if (name === 'region') {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
        examCenter: 'all'
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    setFilters({
      qualification: 'all',
      examSession: '',
      examType: 'all',
      region: 'all',
      examCenter: 'all'
    });
  };

  const handleApply = () => {
    setOpen(false);
  };

  const handleExcelDownload = () => {
    // TODO: 엑셀 다운로드 로직
    alert('엑셀 파일을 다운로드합니다.');
  };

  // 1단계 필터링 (자격명 + 시험회차)
  const step1Filtered = candidateList.filter((candidate) => {
    const matchesQualification =
      filters.qualification === 'all' ||
      candidate.qualification === filters.qualification;
    const matchesExamSession =
      !filters.examSession ||
      candidate.examSession.includes(filters.examSession);

    return matchesQualification && matchesExamSession;
  });

  // 자격명 + 시험회차 입력 시 사용 가능한 시험구분 목록
  const availableExamTypes = canSelectExamType
    ? Array.from(new Set(step1Filtered.map((c) => c.examType))).sort()
    : [];

  // 2단계 필터링 (시험구분)
  const step2Filtered = step1Filtered.filter((candidate) => {
    const matchesExamType =
      filters.examType === 'all' || candidate.examType === filters.examType;
    return matchesExamType;
  });

  // Step1 완료 시 사용 가능한 지역 목록
  const availableRegions = isStep1Complete
    ? Array.from(new Set(step2Filtered.map((c) => c.region))).sort()
    : [];

  // 3단계 필터링 (지역)
  const step3Filtered = step2Filtered.filter((candidate) => {
    const matchesRegion =
      filters.region === 'all' || candidate.region === filters.region;
    return matchesRegion;
  });

  // Step2 완료 시 사용 가능한 고사장 목록
  const availableExamCenters = isStep2Complete
    ? Array.from(new Set(step3Filtered.map((c) => c.examCenter))).sort()
    : [];

  // 최종 필터링 (고사장 - 선택사항)
  const filteredCandidates = step3Filtered.filter((candidate) => {
    const matchesExamCenter =
      filters.examCenter === 'all' ||
      candidate.examCenter === filters.examCenter;
    return matchesExamCenter;
  });

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== '' && v !== 'all'
  ).length;

  return (
    <div className='w-full space-y-6'>
      {/* 필터 버튼 영역 */}
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <CandidateListFilterDialog
            filters={filters}
            onFilterChange={handleFilterChange}
            onApply={handleApply}
            onReset={handleReset}
            availableExamTypes={availableExamTypes}
            availableRegions={availableRegions}
            availableExamCenters={availableExamCenters}
            canSelectExamType={canSelectExamType}
            isStep1Complete={isStep1Complete}
            isStep2Complete={isStep2Complete}
            filteredCount={filteredCandidates.length}
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
              {filters.region && filters.region !== 'all' && (
                <Badge variant='secondary' className='gap-1'>
                  지역: {filters.region}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('region', 'all')}
                  />
                </Badge>
              )}
              {filters.examCenter && filters.examCenter !== 'all' && (
                <Badge variant='secondary' className='gap-1'>
                  고사장: {filters.examCenter}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('examCenter', 'all')}
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
        </div>
      </div>

      {/* 결과 헤더 */}
      <div className='flex items-center justify-between'>
        <div className='text-lg'>
          <span className='text-primary font-bold'>
            {filteredCandidates.length}명
          </span>
          <span className='text-muted-foreground'>의 수험자가 있습니다.</span>
        </div>
      </div>

      {/* 메인 콘텐츠 - 수험자명단 목록 */}
      <div className='space-y-4'>
        {filteredCandidates.map((candidate) => (
          <Card
            key={candidate.id}
            className='hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'
          >
            <CardHeader className='pb-3'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-lg leading-tight font-semibold'>
                      {candidate.name}
                    </h3>
                    <Badge variant='default' className='shrink-0'>
                      {candidate.examNumber}
                    </Badge>
                  </div>
                  <p className='text-muted-foreground text-sm'>
                    {candidate.qualification} · {candidate.birthDate}
                  </p>
                </div>
                <Badge variant='secondary' className='shrink-0'>
                  {candidate.region}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* 첫 번째 줄: 고사장, 단체명, 실, 교시 */}
              <div className='flex items-center gap-4'>
                <div>
                  <span className='text-sm font-medium'>고사장:</span>
                  <span className='text-muted-foreground ml-2 text-sm'>
                    {candidate.examCenter}
                  </span>
                </div>
                <div>
                  <span className='text-sm font-medium'>단체명:</span>
                  <span className='text-muted-foreground ml-2 text-sm'>
                    {candidate.organization}
                  </span>
                </div>
                <div>
                  <span className='text-sm font-medium'>실:</span>
                  <span className='text-muted-foreground ml-2 text-sm'>
                    {candidate.room}
                  </span>
                </div>
                <div>
                  <span className='text-sm font-medium'>교시:</span>
                  <span className='text-muted-foreground ml-2 text-sm'>
                    {candidate.period}
                  </span>
                </div>
              </div>

              {/* 추가 정보 영역 */}
              <div className='space-y-2 border-t pt-3'>
                {/* 접수일시, 연락처 */}
                <div className='grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-3'>
                  <div>
                    <span className='text-sm font-medium'>접수일시:</span>
                    <span className='text-muted-foreground ml-2 text-sm'>
                      {candidate.receptionDate}
                    </span>
                  </div>
                  <div>
                    <span className='text-sm font-medium'>핸드폰:</span>
                    <span className='text-muted-foreground ml-2 text-sm'>
                      {candidate.mobilePhone}
                    </span>
                  </div>
                  <div>
                    <span className='text-sm font-medium'>전화번호:</span>
                    <span className='text-muted-foreground ml-2 text-sm'>
                      {candidate.phone}
                    </span>
                  </div>
                  <div className='md:col-span-3'>
                    <span className='text-sm font-medium'>이메일:</span>
                    <span className='text-muted-foreground ml-2 text-sm'>
                      {candidate.email}
                    </span>
                  </div>
                </div>

                {/* 주소 */}
                <div>
                  <span className='text-sm font-medium'>주소:</span>
                  <span className='text-muted-foreground ml-2 text-sm'>
                    ({candidate.postalCode}) {candidate.address}
                  </span>
                </div>

                {/* 소속 정보 */}
                <div className='grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-4'>
                  <div>
                    <span className='text-sm font-medium'>소속:</span>
                    <span className='text-muted-foreground ml-2 text-sm'>
                      {candidate.affiliation}
                    </span>
                  </div>
                  <div>
                    <span className='text-sm font-medium'>부서:</span>
                    <span className='text-muted-foreground ml-2 text-sm'>
                      {candidate.department}
                    </span>
                  </div>
                  <div>
                    <span className='text-sm font-medium'>직위:</span>
                    <span className='text-muted-foreground ml-2 text-sm'>
                      {candidate.position}
                    </span>
                  </div>
                  <div>
                    <span className='text-sm font-medium'>성별:</span>
                    <span className='text-muted-foreground ml-2 text-sm'>
                      {candidate.gender}
                    </span>
                  </div>
                </div>

                {/* 접수/입금 형태 */}
                <div className='grid grid-cols-2 gap-x-6 gap-y-2'>
                  <div>
                    <span className='text-sm font-medium'>접수형태:</span>
                    <span className='text-muted-foreground ml-2 text-sm'>
                      {candidate.receptionType}
                    </span>
                  </div>
                  <div>
                    <span className='text-sm font-medium'>입금형태:</span>
                    <span className='text-muted-foreground ml-2 text-sm'>
                      {candidate.paymentType}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredCandidates.length === 0 && (
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
