'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  IconCalendar,
  IconClock,
  IconUsers,
  IconChevronRight,
  IconCheck,
  IconAlertCircle,
  IconChevronLeft
} from '@tabler/icons-react';
import { useState, useRef, useEffect } from 'react';

export interface ExamSchedule {
  id: string;
  title: string;
  examDate: Date;
  registrationStart: Date;
  registrationEnd: Date;
  resultDate: Date;
  currentPhase: 'announcement' | 'registration' | 'exam' | 'result';
  registeredCount: number;
  maxCapacity: number;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  icon: string;
}

interface ExamScheduleTimelineProps {
  schedules: ExamSchedule[];
}

const phaseConfig = {
  announcement: {
    label: '시험실시 공고',
    icon: IconCalendar,
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    bgColor: 'bg-gray-50',
    badgeStyle: 'bg-gray-500 text-white',
    statusMessage: '시험 공고가 발표되었습니다',
    accentColor: 'bg-gray-500',
    activeColor: 'bg-gray-500',
    borderColor: 'border-gray-300'
  },
  registration: {
    label: '원서접수',
    icon: IconUsers,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    bgColor: 'bg-blue-50',
    badgeStyle: 'bg-blue-500 text-white animate-pulse',
    statusMessage: '현재 접수 진행 중입니다',
    accentColor: 'bg-blue-500',
    activeColor: 'bg-blue-500',
    borderColor: 'border-blue-300'
  },
  exam: {
    label: '시험실시',
    icon: IconClock,
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    bgColor: 'bg-orange-50',
    badgeStyle: 'bg-orange-500 text-white',
    statusMessage: '시험이 진행 중입니다',
    accentColor: 'bg-orange-500',
    activeColor: 'bg-orange-500',
    borderColor: 'border-orange-300'
  },
  result: {
    label: '합격자 발표',
    icon: IconCheck,
    color: 'bg-green-100 text-green-700 border-green-200',
    bgColor: 'bg-green-50',
    badgeStyle: 'bg-green-500 text-white',
    statusMessage: '합격자가 발표되었습니다',
    accentColor: 'bg-green-500',
    activeColor: 'bg-green-500',
    borderColor: 'border-green-300'
  }
};

const colorConfig = {
  blue: {
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    accent: 'bg-blue-500'
  },
  green: {
    gradient: 'from-green-50 to-green-100',
    border: 'border-green-200',
    accent: 'bg-green-500'
  },
  purple: {
    gradient: 'from-purple-50 to-purple-100',
    border: 'border-purple-200',
    accent: 'bg-purple-500'
  },
  orange: {
    gradient: 'from-orange-50 to-orange-100',
    border: 'border-orange-200',
    accent: 'bg-orange-500'
  },
  red: {
    gradient: 'from-red-50 to-red-100',
    border: 'border-red-200',
    accent: 'bg-red-500'
  }
};

function getCurrentPhase(schedule: ExamSchedule): ExamSchedule['currentPhase'] {
  return schedule.currentPhase;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short'
  });
}

function formatDateRange(start: Date, end: Date): string {
  const startStr = start.toLocaleDateString('ko-KR', {
    month: 'numeric',
    day: 'numeric'
  });
  const endStr = end.toLocaleDateString('ko-KR', {
    month: 'numeric',
    day: 'numeric'
  });
  return `${startStr} ~ ${endStr}`;
}

function getDaysUntil(targetDate: Date): string {
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '내일';
  if (diffDays > 0) return `${diffDays}일 후`;
  return `${Math.abs(diffDays)}일 전`;
}

export function ExamScheduleTimeline({ schedules }: ExamScheduleTimelineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (currentIndex < schedules.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % schedules.length;
        return nextIndex;
      });
    }, 5000); // 5초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, [schedules.length]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // 반응형 카드 너비 계산
      const getCardWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1536) return 384; // 2xl:w-96
        if (screenWidth >= 1280) return 320; // xl:w-80
        return 288; // w-72
      };

      const getGap = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1536) return 32; // 2xl:gap-8
        if (screenWidth >= 1280) return 24; // xl:gap-6
        return 16; // gap-4
      };

      const cardWidth = getCardWidth();
      const gap = getGap();

      container.scrollTo({
        left: currentIndex * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <IconCalendar className='h-5 w-5' />
              시험 일정 현황 관리
            </CardTitle>
            <p className='text-muted-foreground mt-1 text-sm'>
              재경관리사, 회계관리 1급, 회계관리 2급 자격시험 관리 시스템
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className='h-8 w-8 p-0'
            >
              <IconChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={nextSlide}
              disabled={currentIndex === schedules.length - 1}
              className='h-8 w-8 p-0'
            >
              <IconChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className='px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16'>
        {/* 스크롤 가능한 카드 컨테이너 */}
        <div
          ref={scrollContainerRef}
          className='scrollbar-hide flex gap-4 overflow-x-auto px-6 py-6 xl:gap-6 xl:px-8 2xl:gap-8 2xl:px-10'
          style={{
            scrollSnapType: 'x mandatory',
            minHeight: '400px'
          }}
        >
          {schedules.map((schedule, index) => {
            const currentPhase = getCurrentPhase(schedule);
            const PhaseIcon = phaseConfig[currentPhase].icon;
            const registrationRate =
              (schedule.registeredCount / schedule.maxCapacity) * 100;
            const isCurrentPhaseRegistration = currentPhase === 'registration';
            const daysUntilDeadline = isCurrentPhaseRegistration
              ? Math.ceil(
                  (schedule.registrationEnd.getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              : 0;

            return (
              <div
                key={schedule.id}
                className={cn(
                  'relative w-72 flex-shrink-0 cursor-pointer rounded-xl border-2 bg-gradient-to-br p-4 transition-all duration-300 hover:shadow-lg xl:w-80 xl:p-6 2xl:w-96 2xl:p-8',
                  colorConfig[schedule.color].gradient,
                  colorConfig[schedule.color].border,
                  // 상태별 특별한 스타일링
                  currentPhase === 'announcement' &&
                    'shadow-lg shadow-gray-200/50',
                  currentPhase === 'registration' &&
                    'shadow-lg shadow-blue-200/50',
                  currentPhase === 'exam' && 'shadow-lg shadow-orange-200/50',
                  currentPhase === 'result' && 'shadow-lg shadow-green-200/50',
                  index === currentIndex
                    ? 'ring-primary/50 border-primary/50 z-10 opacity-100 shadow-xl ring-2 ring-inset'
                    : 'opacity-75 hover:scale-101 hover:opacity-90'
                )}
                style={{
                  scrollSnapAlign: 'start',
                  minHeight: '500px'
                }}
                onClick={() => goToSlide(index)}
              >
                {/* 상태별 코너 표시 */}
                <div
                  className={cn(
                    'absolute top-0 right-0 h-0 w-0 rounded-tr-xl border-b-[20px] border-l-[20px]',
                    currentPhase === 'announcement' &&
                      'border-b-gray-400 border-l-transparent',
                    currentPhase === 'registration' &&
                      'border-b-blue-500 border-l-transparent',
                    currentPhase === 'exam' &&
                      'border-b-orange-500 border-l-transparent',
                    currentPhase === 'result' &&
                      'border-b-green-500 border-l-transparent'
                  )}
                />

                {/* 선택된 카드 표시 */}
                {index === currentIndex && (
                  <div className='bg-primary absolute -top-2 -right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-lg'>
                    <IconCheck className='h-3 w-3 text-white' />
                  </div>
                )}

                {/* 헤더 */}
                <div className='mb-4 flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='mb-1 text-2xl'>{schedule.icon}</div>
                    <h3 className='text-lg leading-tight font-bold text-gray-800'>
                      {schedule.title}
                    </h3>
                  </div>
                  <Badge
                    className={cn(
                      'border-0 text-xs font-medium',
                      phaseConfig[currentPhase].badgeStyle
                    )}
                  >
                    <PhaseIcon className='mr-1 h-3 w-3' />
                    {phaseConfig[currentPhase].label}
                  </Badge>
                </div>

                {/* 진행 단계 표시 */}
                <div className='relative mb-6 flex items-center justify-between'>
                  {Object.entries(phaseConfig).map(
                    ([phase, config], phaseIndex) => {
                      const Icon = config.icon;
                      const isActive = phase === currentPhase;
                      const isCompleted =
                        Object.keys(phaseConfig).indexOf(currentPhase) >
                        phaseIndex;

                      return (
                        <div
                          key={phase}
                          className='relative z-10 flex flex-col items-center'
                        >
                          <div
                            className={cn(
                              'mb-2 flex h-10 w-10 items-center justify-center rounded-full transition-all',
                              isActive
                                ? cn(
                                    'border-4 text-white shadow-lg',
                                    config.activeColor,
                                    config.borderColor
                                  )
                                : isCompleted
                                  ? 'border-2 border-green-600 bg-green-500 text-white'
                                  : 'border-2 border-gray-200 bg-white/80 text-gray-400'
                            )}
                          >
                            {isCompleted ? (
                              <IconCheck className='h-5 w-5' />
                            ) : (
                              <Icon className='h-5 w-5' />
                            )}
                          </div>
                          <span
                            className={cn(
                              'text-center text-xs leading-tight font-medium',
                              isActive
                                ? 'font-bold text-gray-800'
                                : 'text-gray-600'
                            )}
                          >
                            {config.label}
                          </span>
                        </div>
                      );
                    }
                  )}

                  {/* 연결선 */}
                  <div className='absolute top-5 right-5 left-5 -z-0 h-0.5 bg-gray-200'>
                    <div
                      className={cn(
                        'h-full transition-all duration-500',
                        phaseConfig[currentPhase].activeColor
                      )}
                      style={{
                        width: `${(Object.keys(phaseConfig).indexOf(currentPhase) / (Object.keys(phaseConfig).length - 1)) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* 일정 정보 */}
                <div className='mb-4 space-y-3'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-600'>접수기간</span>
                    <span className='font-medium text-gray-800'>
                      {formatDateRange(
                        schedule.registrationStart,
                        schedule.registrationEnd
                      )}
                    </span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-600'>시험일</span>
                    <span className='font-medium text-gray-800'>
                      {formatDate(schedule.examDate)}
                    </span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-600'>발표일</span>
                    <span className='font-medium text-gray-800'>
                      {formatDate(schedule.resultDate)}
                    </span>
                  </div>
                </div>

                {/* 상태별 메시지 */}
                <div
                  className={cn(
                    'relative mb-4 overflow-hidden rounded-lg border-l-4 p-3',
                    currentPhase === 'announcement' &&
                      'border-gray-400 bg-gray-50',
                    currentPhase === 'registration' &&
                      'border-blue-400 bg-blue-50',
                    currentPhase === 'exam' && 'border-orange-400 bg-orange-50',
                    currentPhase === 'result' && 'border-green-400 bg-green-50'
                  )}
                >
                  <div className='relative z-10 mb-1 flex items-center gap-2'>
                    <div
                      className={cn(
                        'flex h-3 w-3 items-center justify-center rounded-full',
                        phaseConfig[currentPhase].accentColor
                      )}
                    >
                      {currentPhase === 'registration' && (
                        <div className='h-1 w-1 animate-ping rounded-full bg-white' />
                      )}
                    </div>
                    <span className='text-sm font-semibold text-gray-800'>
                      {phaseConfig[currentPhase].statusMessage}
                    </span>
                  </div>

                  {/* 상태별 추가 정보 */}
                  {currentPhase === 'announcement' && (
                    <div className='ml-5 text-xs text-gray-600'>
                      접수 시작까지 {getDaysUntil(schedule.registrationStart)}
                    </div>
                  )}
                  {currentPhase === 'registration' && (
                    <div className='ml-5 text-xs font-medium text-blue-700'>
                      접수 마감까지 {getDaysUntil(schedule.registrationEnd)}
                    </div>
                  )}
                  {currentPhase === 'exam' && (
                    <div className='ml-5 text-xs font-medium text-orange-700'>
                      시험일: {formatDate(schedule.examDate)}
                    </div>
                  )}
                  {currentPhase === 'result' && (
                    <div className='ml-5 text-xs font-medium text-green-700'>
                      결과 확인 가능
                    </div>
                  )}
                </div>

                {/* 접수 현황 */}
                <div className='mb-4 rounded-lg bg-white/50 p-3'>
                  <div className='mb-2 flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>접수현황</span>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        registrationRate > 80
                          ? 'text-red-600'
                          : registrationRate > 60
                            ? 'text-orange-600'
                            : 'text-green-600'
                      )}
                    >
                      {Math.round(registrationRate)}%
                    </span>
                  </div>
                  <Progress
                    value={registrationRate}
                    className={cn(
                      'mb-2 h-2',
                      registrationRate > 80 && '[&>div]:bg-red-500',
                      registrationRate > 60 &&
                        registrationRate <= 80 &&
                        '[&>div]:bg-orange-500'
                    )}
                  />
                  <div className='text-xs text-gray-500'>
                    {schedule.registeredCount.toLocaleString()}명 /{' '}
                    {schedule.maxCapacity.toLocaleString()}명
                  </div>
                </div>

                {/* 긴급 알림 또는 상태 메시지 */}
                {isCurrentPhaseRegistration &&
                  daysUntilDeadline <= 7 &&
                  daysUntilDeadline > 0 && (
                    <div className='flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-100 p-3'>
                      <IconAlertCircle className='h-4 w-4 flex-shrink-0 text-orange-600' />
                      <span className='text-sm text-orange-700'>
                        접수 마감 {getDaysUntil(schedule.registrationEnd)}
                      </span>
                    </div>
                  )}

                {currentPhase === 'announcement' && (
                  <div className='flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-100 p-3'>
                    <IconCalendar className='h-4 w-4 flex-shrink-0 text-blue-600' />
                    <span className='text-sm text-blue-700'>
                      접수 시작 {getDaysUntil(schedule.registrationStart)}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 네비게이션 점 */}
        <div className='mt-4 flex justify-center gap-2'>
          {schedules.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-200',
                index === currentIndex
                  ? 'bg-primary w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
