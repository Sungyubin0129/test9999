import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, BookOpen, Clock, Users, CheckCircle } from 'lucide-react';

const certificationData = [
  {
    id: 1,
    name: '재경관리사',
    description: '재무와 경영을 아우르는 종합적인 재경전문가',
    level: '국가공인',
    duration: '2시간 30분',
    questions: 100,
    passingScore: 60,
    fee: '50,000원',
    benefits: [
      '공공기관 채용 시 우대',
      '금융기관 취업 시 가점',
      '대기업 재무부서 우대',
      '자격증 유효기간 무제한'
    ],
    subjects: [
      '재무관리',
      '회계원리',
      '경영학개론',
      '경제학개론',
      '금융론'
    ],
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 2,
    name: '회계관리 1급',
    description: '회계업무 수행능력을 갖춘 전문가',
    level: '국가공인',
    duration: '2시간',
    questions: 80,
    passingScore: 70,
    fee: '40,000원',
    benefits: [
      '회계사무소 취업 우대',
      '대기업 회계부서 우대',
      '세무사 시험 응시 자격',
      '자격증 유효기간 5년'
    ],
    subjects: [
      '회계원리',
      '재무회계',
      '원가회계',
      '관리회계',
      '세무회계'
    ],
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    id: 3,
    name: '회계관리 2급',
    description: '회계에 대한 기본지식이 필요한 입문자',
    level: '국가공인',
    duration: '1시간 30분',
    questions: 60,
    passingScore: 60,
    fee: '30,000원',
    benefits: [
      '회계 기초 지식 인증',
      '회계 관련 취업 시 우대',
      '1급 시험 응시 자격',
      '자격증 유효기간 3년'
    ],
    subjects: [
      '회계원리',
      '재무회계',
      '원가회계',
      '관리회계'
    ],
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    id: 4,
    name: '국제회계전문가',
    description: '국제회계기준(IFRS) 전문가',
    level: '국제공인',
    duration: '3시간',
    questions: 120,
    passingScore: 75,
    fee: '80,000원',
    benefits: [
      '글로벌 기업 취업 우대',
      '회계법인 해외부서 우대',
      '국제회계기준 전문성 인증',
      '자격증 유효기간 3년'
    ],
    subjects: [
      'IFRS 기본원칙',
      '재무제표 작성',
      '회계정책 선택',
      '공시사항 관리',
      '국제회계기준 해석'
    ],
    color: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  {
    id: 5,
    name: '공공회계전문가',
    description: '공공부문 회계 전문가',
    level: '국가공인',
    duration: '2시간 30분',
    questions: 90,
    passingScore: 70,
    fee: '60,000원',
    benefits: [
      '공공기관 회계부서 우대',
      '정부기관 회계업무 우대',
      '공공회계 전문성 인증',
      '자격증 유효기간 5년'
    ],
    subjects: [
      '공공회계기준',
      '정부회계',
      '예산회계',
      '성과관리회계',
      '공공부문 감사'
    ],
    color: 'bg-red-50 text-red-700 border-red-200'
  }
];

export default function SubjectsPage() {
  return (
    <PageContainer>
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold'>종목소개</h1>
          <p className='text-muted-foreground mt-2'>
            삼일회계법인에서 시행하는 다양한 자격증 종목을 소개합니다.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {certificationData.map((cert) => (
            <Card key={cert.id} className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center justify-between mb-2'>
                  <Badge className={cert.color}>
                    {cert.level}
                  </Badge>
                  <Badge variant='outline'>
                    {cert.fee}
                  </Badge>
                </div>
                <CardTitle className='text-xl'>{cert.name}</CardTitle>
                <CardDescription className='text-sm'>
                  {cert.description}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* 시험 정보 */}
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-4 h-4 text-muted-foreground' />
                    <span>{cert.duration}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <BookOpen className='w-4 h-4 text-muted-foreground' />
                    <span>{cert.questions}문제</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <CheckCircle className='w-4 h-4 text-muted-foreground' />
                    <span>{cert.passingScore}점 이상</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='w-4 h-4 text-muted-foreground' />
                    <span>온라인</span>
                  </div>
                </div>

                {/* 과목 */}
                <div>
                  <h4 className='font-semibold text-sm mb-2'>시험과목</h4>
                  <div className='flex flex-wrap gap-1'>
                    {cert.subjects.map((subject, index) => (
                      <Badge key={index} variant='secondary' className='text-xs'>
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 우대사항 */}
                <div>
                  <h4 className='font-semibold text-sm mb-2'>우대사항</h4>
                  <ul className='space-y-1 text-xs text-muted-foreground'>
                    {cert.benefits.map((benefit, index) => (
                      <li key={index} className='flex items-start gap-2'>
                        <Award className='w-3 h-3 mt-0.5 flex-shrink-0' />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className='w-full' variant='outline'>
                  자세히 보기
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 추가 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>자격증 취득 가이드</CardTitle>
            <CardDescription>
              자격증 취득을 위한 단계별 가이드입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='text-center space-y-2'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                  <span className='text-primary font-bold'>1</span>
                </div>
                <h3 className='font-semibold'>시험 접수</h3>
                <p className='text-sm text-muted-foreground'>
                  원하는 자격증을 선택하고 온라인으로 접수하세요.
                </p>
              </div>
              <div className='text-center space-y-2'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                  <span className='text-primary font-bold'>2</span>
                </div>
                <h3 className='font-semibold'>시험 응시</h3>
                <p className='text-sm text-muted-foreground'>
                  지정된 날짜에 온라인으로 시험을 응시하세요.
                </p>
              </div>
              <div className='text-center space-y-2'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                  <span className='text-primary font-bold'>3</span>
                </div>
                <h3 className='font-semibold'>자격증 발급</h3>
                <p className='text-sm text-muted-foreground'>
                  합격 시 자격증을 발급받고 취업에 활용하세요.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
