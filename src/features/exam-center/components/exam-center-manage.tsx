'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, RotateCcw, FileDown } from 'lucide-react';

// 더미 데이터 생성 함수
const generateExamCenters = () => {
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

  // 지역별 고유 번호 매핑
  const regionCodes: { [key: string]: string } = {};
  regions.forEach((region, idx) => {
    regionCodes[region] = String(100 + idx).padStart(3, '0');
  });

  // 한글 성씨와 이름 풀
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

  const generatePhoneNumber = () => {
    const middle = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    const last = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    return `010-${middle}-${last}`;
  };

  const generateName = () => {
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    return lastName + firstName;
  };

  // 학교 이름 생성
  const schoolPrefixes = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
    '한국',
    '중앙',
    '동부'
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
    '새',
    '참',
    '빛',
    '별',
    '샛별',
    '해솔',
    '꿈나무',
    '한빛',
    '새빛',
    '은빛',
    '늘푸른'
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

  const tagsList = [
    ...regions,
    '인슈어런스',
    '벨크',
    '토스',
    '새앤스',
    '카카오',
    '네이버'
  ];

  const centers = [];
  for (let i = 0; i < 98; i++) {
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    const regionCode = regionCodes[randomRegion];
    const name = generateName();
    const phone = generatePhoneNumber();
    const schoolName = generateSchoolName();

    centers.push({
      id: i + 1,
      title: schoolName,
      company: randomRegion,
      department: `${regionCode} ${name}, ${phone}`,
      tags: [randomRegion],
      category: randomRegion
    });
  }
  return centers;
};

export default function ExamCenterManage() {
  const router = useRouter();

  const [examCenters, setExamCenters] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('all');

  // useEffect를 사용하여 클라이언트에서만 데이터 생성
  useEffect(() => {
    setExamCenters(generateExamCenters());
  }, []);

  const handleReset = () => {
    setSearchQuery('');
    setDepartment('all');
  };

  const handleCardClick = (id: number) => {
    router.push(`/dashboard/exam-center/manage/${id}`);
  };

  const handleExcelDownload = () => {
    // 엑셀 다운로드 로직
    // TODO: 실제 엑셀 라이브러리 연동 필요
    console.log('엑셀 다운로드', filteredCenters);
  };

  const filteredCenters = examCenters.filter((center) => {
    const matchesSearch =
      searchQuery === '' ||
      center.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      department === 'all' || center.category === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className='w-full space-y-6'>
      {/* 검색 및 필터 영역 */}
      <div className='from-muted/50 to-muted rounded-lg bg-gradient-to-br p-6'>
        <div className='grid gap-4'>
          {/* 필터 및 검색 */}
          <div className='flex flex-wrap items-center gap-3'>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className='bg-background w-[180px] border-0 shadow-sm'>
                <SelectValue placeholder='지역' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>전체</SelectItem>
                <SelectItem value='강원'>강원</SelectItem>
                <SelectItem value='경기'>경기</SelectItem>
                <SelectItem value='경기(송내)'>경기(송내)</SelectItem>
                <SelectItem value='경주'>경주</SelectItem>
                <SelectItem value='광주'>광주</SelectItem>
                <SelectItem value='당진'>당진</SelectItem>
                <SelectItem value='대구'>대구</SelectItem>
                <SelectItem value='대전'>대전</SelectItem>
                <SelectItem value='부산'>부산</SelectItem>
                <SelectItem value='서울'>서울</SelectItem>
                <SelectItem value='서울(구룡)'>서울(구룡)</SelectItem>
                <SelectItem value='서울(무학)'>서울(무학)</SelectItem>
                <SelectItem value='서울(여자)'>서울(여자)</SelectItem>
                <SelectItem value='서울(한양중공업)'>
                  서울(한양중공업)
                </SelectItem>
                <SelectItem value='아산(천안)'>아산(천안)</SelectItem>
                <SelectItem value='안동'>안동</SelectItem>
                <SelectItem value='울산'>울산</SelectItem>
                <SelectItem value='인천'>인천</SelectItem>
                <SelectItem value='전주(익산)'>전주(익산)</SelectItem>
                <SelectItem value='창원'>창원</SelectItem>
                <SelectItem value='청주'>청주</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder='고사장을 입력해주세요'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='bg-background w-[300px] border-0 shadow-sm'
            />

            <Button
              variant='outline'
              size='default'
              onClick={handleReset}
              className='bg-background border-0 shadow-sm'
            >
              <RotateCcw className='mr-2 h-4 w-4' />
              초기화
            </Button>
          </div>
        </div>
      </div>

      {/* 결과 헤더 */}
      <div className='flex items-center justify-between'>
        <div className='text-lg'>
          <span className='text-primary font-bold'>
            {filteredCenters.length}개
          </span>
          <span className='text-muted-foreground'>
            의 고사장이 등록되어 있습니다.
          </span>
        </div>
        <Button
          variant='outline'
          size='default'
          onClick={handleExcelDownload}
          className='gap-2'
        >
          <FileDown className='h-4 w-4' />
          엑셀 저장
        </Button>
      </div>

      {/* 메인 콘텐츠 - 고사장 목록 */}
      <div className='space-y-4'>
        {filteredCenters.map((center) => (
          <Card
            key={center.id}
            className='hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'
            onClick={() => handleCardClick(center.id)}
          >
            <CardHeader className='pb-3'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1 space-y-2'>
                  <h3 className='text-lg leading-tight font-semibold'>
                    {center.title}
                  </h3>
                  <p className='text-muted-foreground text-sm'>
                    {center.company} · {center.department}
                  </p>
                </div>
                <Badge variant='secondary' className='shrink-0'>
                  {center.tags[0]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-2'>
                {center.tags.slice(1).map((tag, idx) => (
                  <Badge key={idx} variant='outline' className='text-xs'>
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredCenters.length === 0 && (
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
