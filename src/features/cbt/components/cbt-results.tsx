'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Award,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Share2,
  Eye,
  Trophy,
  Target,
  TrendingUp
} from 'lucide-react';

// Java 프로젝트의 CBT 결과 데이터 타입
interface CBTResult {
  examId: string;
  examName: string;
  examDate: string;
  examTime: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  score: number;
  passScore: number;
  isPassed: boolean;
  timeSpent: number; // 분
  rank: number;
  totalParticipants: number;
  detailedResults: QuestionResult[];
}

interface QuestionResult {
  questionId: string;
  questionNumber: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpent: number; // 초
}

// Mock 데이터 (Java 프로젝트의 CBT 결과 구조)
const mockCBTResult: CBTResult = {
  examId: 'CBT2024001',
  examName: '회계사 1급 CBT',
  examDate: '2024-01-15',
  examTime: '09:00-12:00',
  totalQuestions: 50,
  correctAnswers: 42,
  wrongAnswers: 6,
  unanswered: 2,
  score: 84,
  passScore: 70,
  isPassed: true,
  timeSpent: 165, // 2시간 45분
  rank: 15,
  totalParticipants: 120,
  detailedResults: [
    {
      questionId: 'Q001',
      questionNumber: 1,
      question: '다음 중 회계의 기본 원칙에 해당하지 않는 것은?',
      userAnswer: '기업실체의 원칙',
      correctAnswer: '기업실체의 원칙',
      isCorrect: true,
      timeSpent: 45
    },
    {
      questionId: 'Q002',
      questionNumber: 2,
      question: '대차대조표에서 자산의 분류 기준은?',
      userAnswer: '기능별 기준',
      correctAnswer: '유동성 기준',
      isCorrect: false,
      timeSpent: 60
    }
    // ... 더 많은 문제들
  ]
};

export function CBTResults() {
  const [result] = useState<CBTResult>(mockCBTResult);
  const [showDetailedResults, setShowDetailedResults] = useState(false);

  // 점수에 따른 등급 계산
  const getGrade = (score: number) => {
    if (score >= 90)
      return { grade: 'A+', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 80)
      return { grade: 'A', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 70)
      return { grade: 'B+', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 60)
      return { grade: 'B', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 50)
      return {
        grade: 'C+',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100'
      };
    return { grade: 'F', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const gradeInfo = getGrade(result.score);
  const accuracy = (result.correctAnswers / result.totalQuestions) * 100;

  return (
    <div className='space-y-6'>
      {/* Java 프로젝트의 CBT 결과 헤더 */}
      <div>
        <h1 className='text-3xl font-bold'>CBT 시험 결과</h1>
        <p className='text-muted-foreground'>
          {result.examName} 시험 결과를 확인하세요.
        </p>
      </div>

      {/* 결과 요약 */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card
          className={
            result.isPassed
              ? 'border-green-200 bg-green-50'
              : 'border-red-200 bg-red-50'
          }
        >
          <CardHeader className='pb-3'>
            <CardTitle className='flex items-center justify-between'>
              <span className='text-sm font-medium'>시험 결과</span>
              {result.isPassed ? (
                <CheckCircle className='h-5 w-5 text-green-600' />
              ) : (
                <XCircle className='h-5 w-5 text-red-600' />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {result.isPassed ? '합격' : '불합격'}
            </div>
            <p className='text-muted-foreground text-sm'>
              {result.isPassed ? '축하합니다!' : '다음 기회에 도전하세요'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium'>점수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{result.score}점</div>
            <div className='mt-1 flex items-center space-x-2'>
              <Badge className={`${gradeInfo.bgColor} ${gradeInfo.color}`}>
                {gradeInfo.grade}
              </Badge>
              <span className='text-muted-foreground text-sm'>
                (합격점: {result.passScore}점)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium'>정답률</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{accuracy.toFixed(1)}%</div>
            <Progress value={accuracy} className='mt-2' />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium'>순위</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{result.rank}위</div>
            <p className='text-muted-foreground text-sm'>
              전체 {result.totalParticipants}명 중
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 상세 결과 */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* 문제별 결과 */}
        <Card>
          <CardHeader>
            <CardTitle>문제별 결과</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-green-600'>
                    {result.correctAnswers}
                  </div>
                  <div className='text-muted-foreground text-sm'>정답</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-red-600'>
                    {result.wrongAnswers}
                  </div>
                  <div className='text-muted-foreground text-sm'>오답</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-600'>
                    {result.unanswered}
                  </div>
                  <div className='text-muted-foreground text-sm'>미답</div>
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>총 문제 수</span>
                  <span>{result.totalQuestions}문제</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>소요 시간</span>
                  <span>
                    {Math.floor(result.timeSpent / 60)}시간{' '}
                    {result.timeSpent % 60}분
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>평균 문제당 시간</span>
                  <span>
                    {Math.round(result.timeSpent / result.totalQuestions)}분
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 성적 분석 */}
        <Card>
          <CardHeader>
            <CardTitle>성적 분석</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>정답률</span>
                <div className='flex items-center space-x-2'>
                  <Progress value={accuracy} className='w-20' />
                  <span className='text-sm font-medium'>
                    {accuracy.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-sm'>합격률</span>
                <div className='flex items-center space-x-2'>
                  <Progress
                    value={(result.score / result.passScore) * 100}
                    className='w-20'
                  />
                  <span className='text-sm font-medium'>
                    {((result.score / result.passScore) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className='border-t pt-4'>
              <h4 className='mb-2 font-semibold'>개선 사항</h4>
              <ul className='text-muted-foreground space-y-1 text-sm'>
                {result.wrongAnswers > 0 && (
                  <li>• 오답 문제 {result.wrongAnswers}개 복습 필요</li>
                )}
                {result.unanswered > 0 && (
                  <li>• 미답 문제 {result.unanswered}개 시간 관리 개선</li>
                )}
                <li>• 전반적인 이해도 향상 필요</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 상세 문제 결과 */}
      {showDetailedResults && (
        <Card>
          <CardHeader>
            <CardTitle>상세 문제 결과</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {result.detailedResults.map((question) => (
                <div
                  key={question.questionId}
                  className='rounded-lg border p-4'
                >
                  <div className='mb-2 flex items-center justify-between'>
                    <span className='font-medium'>
                      문제 {question.questionNumber}
                    </span>
                    <div className='flex items-center space-x-2'>
                      {question.isCorrect ? (
                        <CheckCircle className='h-4 w-4 text-green-600' />
                      ) : (
                        <XCircle className='h-4 w-4 text-red-600' />
                      )}
                      <Badge
                        variant={question.isCorrect ? 'default' : 'destructive'}
                      >
                        {question.isCorrect ? '정답' : '오답'}
                      </Badge>
                    </div>
                  </div>

                  <p className='mb-3 text-sm'>{question.question}</p>

                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div>
                      <span className='font-medium'>내 답안:</span>
                      <p className='text-muted-foreground'>
                        {question.userAnswer}
                      </p>
                    </div>
                    <div>
                      <span className='font-medium'>정답:</span>
                      <p className='text-muted-foreground'>
                        {question.correctAnswer}
                      </p>
                    </div>
                  </div>

                  <div className='text-muted-foreground mt-2 text-xs'>
                    소요시간: {question.timeSpent}초
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 액션 버튼 */}
      <div className='flex space-x-4'>
        <Button onClick={() => setShowDetailedResults(!showDetailedResults)}>
          <Eye className='mr-2 h-4 w-4' />
          {showDetailedResults ? '상세 결과 숨기기' : '상세 결과 보기'}
        </Button>

        <Button variant='outline'>
          <Download className='mr-2 h-4 w-4' />
          성적표 다운로드
        </Button>

        <Button variant='outline'>
          <Share2 className='mr-2 h-4 w-4' />
          결과 공유
        </Button>

        {result.isPassed && (
          <Button variant='outline'>
            <Trophy className='mr-2 h-4 w-4' />
            자격증 신청
          </Button>
        )}
      </div>
    </div>
  );
}
