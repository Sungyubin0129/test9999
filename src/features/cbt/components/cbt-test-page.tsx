'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  CheckCircle,
  Circle,
  ArrowLeft,
  ArrowRight,
  Save,
  Send,
  AlertTriangle
} from 'lucide-react';

// Java 프로젝트의 CBT 데이터 타입
interface CBTQuestion {
  exam_no: string;
  que_id: string;
  que_title: string;
  que_content: string;
  que_type: string;
  que_score: number;
  options: string[];
  user_answer?: string;
}

interface CBTExam {
  examinee: {
    timeleft: number;
    question_left: number;
    question_total: number;
    examtime: number;
  };
  questions: CBTQuestion[];
}

// Mock 데이터 (Java 프로젝트의 CBT 데이터 구조)
const mockCBTData: CBTExam = {
  examinee: {
    timeleft: 60, // 60분
    question_left: 1,
    question_total: 10,
    examtime: 60
  },
  questions: [
    {
      exam_no: '1',
      que_id: 'Q001',
      que_title: '회계원리 문제',
      que_content: '다음 중 회계의 기본 원칙에 해당하지 않는 것은?',
      que_type: 'MULTIPLE',
      que_score: 10,
      options: [
        '기업실체의 원칙',
        '화폐측정의 원칙',
        '기간별 보고의 원칙',
        '수익인식의 원칙'
      ]
    },
    {
      exam_no: '2',
      que_id: 'Q002',
      que_title: '재무제표 문제',
      que_content: '대차대조표에서 자산의 분류 기준은?',
      que_type: 'MULTIPLE',
      que_score: 10,
      options: ['유동성 기준', '기능별 기준', '크기별 기준', '중요도 기준']
    }
  ]
};

export function CBTTestPage() {
  const [examData, setExamData] = useState<CBTExam>(mockCBTData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(examData.examinee.timeleft * 60); // 초 단위
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 타이머 기능 (Java 프로젝트의 시험 시간 관리)
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      // 시간 초과 시 자동 제출
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  // 시간 포맷팅
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 답안 선택
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // 이전 문제
  const goPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // 다음 문제
  const goNext = () => {
    if (currentQuestion < examData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // 임시 저장 (Java 프로젝트의 cbtSave 기능)
  const handleSave = () => {
    console.log('임시 저장:', answers);
    // 실제 구현에서는 API 호출
  };

  // 최종 제출 (Java 프로젝트의 cbtSubmit 기능)
  const handleSubmit = () => {
    setIsSubmitted(true);
    console.log('최종 제출:', answers);
    // 실제 구현에서는 API 호출
  };

  const currentQ = examData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / examData.questions.length) * 100;

  return (
    <div className='flex h-screen flex-col bg-gray-50'>
      {/* Java 프로젝트의 시험 헤더 - 고정 */}
      <div className='flex-shrink-0 border-b bg-white shadow-sm'>
        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-bold'>온라인 시험</h1>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-2'>
                <Clock className='h-5 w-5 text-red-500' />
                <span className='font-mono text-lg'>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Badge variant='outline'>
                {currentQuestion + 1} / {examData.questions.length}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className='mt-3' />
        </div>
      </div>

      {/* 메인 콘텐츠 영역 - 스크롤 가능 */}
      <div className='flex flex-1 overflow-hidden'>
        {/* 문제 목록 (Java 프로젝트의 문제 네비게이션) - 고정 너비 */}
        <div className='w-64 flex-shrink-0 border-r bg-white p-4'>
          <div className='mb-4'>
            <h2 className='text-sm font-semibold'>문제 목록</h2>
          </div>
          <div className='grid grid-cols-5 gap-2'>
            {examData.questions.map((question, index) => (
              <Button
                key={question.que_id}
                variant={index === currentQuestion ? 'default' : 'outline'}
                size='sm'
                className='h-8 w-8 p-0'
                onClick={() => setCurrentQuestion(index)}
              >
                {answers[question.que_id] ? (
                  <CheckCircle className='h-4 w-4' />
                ) : (
                  <Circle className='h-4 w-4' />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* 문제 내용 영역 - 스크롤 가능 */}
        <div className='flex-1 overflow-y-auto p-6'>
          <div className='mx-auto max-w-4xl'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-lg'>
                    문제 {currentQuestion + 1}
                  </CardTitle>
                  <Badge variant='secondary'>{currentQ.que_score}점</Badge>
                </div>
              </CardHeader>
              <CardContent className='space-y-6'>
                {/* 문제 내용 */}
                <div className='prose max-w-none'>
                  <h3 className='mb-4 text-lg font-semibold'>
                    {currentQ.que_title}
                  </h3>
                  <p className='text-base leading-relaxed'>
                    {currentQ.que_content}
                  </p>
                </div>

                {/* 선택지 (Java 프로젝트의 객관식 답안) */}
                <div className='space-y-3'>
                  {currentQ.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50 ${
                        answers[currentQ.que_id] === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type='radio'
                        name={`question_${currentQ.que_id}`}
                        value={option}
                        checked={answers[currentQ.que_id] === option}
                        onChange={(e) =>
                          handleAnswerSelect(currentQ.que_id, e.target.value)
                        }
                        className='h-4 w-4 text-blue-600'
                      />
                      <span className='flex-1'>{option}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Java 프로젝트의 시험 주의사항 */}
            <div className='mt-6'>
              <Card className='border-yellow-200 bg-yellow-50'>
                <CardContent className='pt-6'>
                  <div className='flex items-start space-x-3'>
                    <AlertTriangle className='mt-0.5 h-5 w-5 text-yellow-600' />
                    <div className='text-sm text-yellow-800'>
                      <p className='mb-2 font-semibold'>시험 주의사항</p>
                      <ul className='space-y-1 text-sm'>
                        <li>• 시험 시간 내에 모든 문제를 풀어주세요.</li>
                        <li>• 임시저장을 통해 답안을 저장할 수 있습니다.</li>
                        <li>• 최종제출 후에는 답안을 수정할 수 없습니다.</li>
                        <li>
                          • 시험 중 브라우저를 닫거나 새로고침하지 마세요.
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Java 프로젝트의 시험 컨트롤 버튼 - 하단 고정 */}
      <div className='flex-shrink-0 border-t bg-white p-4 shadow-lg'>
        <div className='mx-auto max-w-4xl'>
          <div className='flex items-center justify-between'>
            <div className='flex space-x-2'>
              <Button
                variant='outline'
                onClick={goPrev}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                이전
              </Button>
              <Button
                variant='outline'
                onClick={goNext}
                disabled={currentQuestion === examData.questions.length - 1}
              >
                다음
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>

            <div className='flex space-x-2'>
              <Button
                variant='outline'
                onClick={handleSave}
                className='text-blue-600'
              >
                <Save className='mr-2 h-4 w-4' />
                임시저장
              </Button>
              <Button
                onClick={handleSubmit}
                className='bg-red-600 hover:bg-red-700'
              >
                <Send className='mr-2 h-4 w-4' />
                최종제출
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
