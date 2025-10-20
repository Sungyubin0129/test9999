'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import {
  IconUser,
  IconFileText,
  IconSearch,
  IconCheck,
  IconBell,
  IconSettings,
  IconDatabase,
  IconMail,
  IconPhone,
  IconClock
} from '@tabler/icons-react';

export interface AdminActivity {
  id: string;
  time: string;
  type:
    | 'login'
    | 'notice'
    | 'query'
    | 'approval'
    | 'alert'
    | 'system'
    | 'backup'
    | 'support';
  title: string;
  description: string;
  admin: string;
  status: 'completed' | 'processing' | 'pending' | 'failed';
  priority: 'high' | 'medium' | 'low';
}

interface AdminActivityTimelineProps {
  activities: AdminActivity[];
}

const activityConfig = {
  login: {
    icon: IconUser,
    color: 'bg-blue-100 text-blue-700',
    bgColor: 'bg-blue-50',
    iconColor: 'bg-blue-500'
  },
  notice: {
    icon: IconFileText,
    color: 'bg-green-100 text-green-700',
    bgColor: 'bg-green-50',
    iconColor: 'bg-green-500'
  },
  query: {
    icon: IconSearch,
    color: 'bg-purple-100 text-purple-700',
    bgColor: 'bg-purple-50',
    iconColor: 'bg-purple-500'
  },
  approval: {
    icon: IconCheck,
    color: 'bg-emerald-100 text-emerald-700',
    bgColor: 'bg-emerald-50',
    iconColor: 'bg-emerald-500'
  },
  alert: {
    icon: IconBell,
    color: 'bg-orange-100 text-orange-700',
    bgColor: 'bg-orange-50',
    iconColor: 'bg-orange-500'
  },
  system: {
    icon: IconSettings,
    color: 'bg-gray-100 text-gray-700',
    bgColor: 'bg-gray-50',
    iconColor: 'bg-gray-500'
  },
  backup: {
    icon: IconDatabase,
    color: 'bg-indigo-100 text-indigo-700',
    bgColor: 'bg-indigo-50',
    iconColor: 'bg-indigo-500'
  },
  support: {
    icon: IconPhone,
    color: 'bg-pink-100 text-pink-700',
    bgColor: 'bg-pink-50',
    iconColor: 'bg-pink-500'
  }
};

const statusConfig = {
  completed: {
    label: '완료',
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  processing: {
    label: '처리중',
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  pending: {
    label: '대기',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  },
  failed: {
    label: '실패',
    color: 'bg-red-100 text-red-700 border-red-200'
  }
};

const priorityConfig = {
  high: {
    color: 'border-l-red-500',
    dot: 'bg-red-500'
  },
  medium: {
    color: 'border-l-yellow-500',
    dot: 'bg-yellow-500'
  },
  low: {
    color: 'border-l-green-500',
    dot: 'bg-green-500'
  }
};

export function AdminActivityTimeline({
  activities
}: AdminActivityTimelineProps) {
  // 시간 순서를 반대로 정렬 (최신 활동이 위에 오도록)
  const sortedActivities = [...activities].reverse();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNewActivity, setIsNewActivity] = useState(false);

  // 자동 슬라이드 기능 (3개씩 표시)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxPages = Math.ceil(Math.min(sortedActivities.length, 9) / 3); // 최대 9개를 3개씩 3페이지
        const nextIndex = (prevIndex + 1) % maxPages;
        return nextIndex;
      });
    }, 4000); // 4초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, [sortedActivities.length]);

  // 새로운 활동 감지
  useEffect(() => {
    setIsNewActivity(true);
    const timer = setTimeout(() => setIsNewActivity(false), 5000); // 5초 후 NEW 표시 제거
    return () => clearTimeout(timer);
  }, [activities.length]);

  const visibleActivities = sortedActivities.slice(0, 9); // 최대 9개를 3개씩 3페이지로 표시

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <IconClock className='h-5 w-5' />
          관리자 활동 타임라인
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 현재 표시되는 활동 */}
        <div className='space-y-2 rounded-lg bg-gray-50/30 p-2'>
          {visibleActivities.length > 0 && (
            <>
              {/* 현재 페이지의 3개 활동 표시 */}
              {visibleActivities
                .slice(currentIndex * 3, (currentIndex + 1) * 3)
                .map((activity, relativeIndex) => {
                  const config = activityConfig[activity.type];
                  const Icon = config.icon;
                  const actualIndex = currentIndex * 3 + relativeIndex;

                  return (
                    <div
                      key={activity.id}
                      className={cn(
                        'flex min-h-[60px] gap-3 rounded-lg border border-l-4 border-gray-100 bg-white p-3 shadow-sm transition-all duration-300',
                        priorityConfig[activity.priority].color
                      )}
                    >
                      {/* 시간 및 아이콘 */}
                      <div className='flex flex-col items-center'>
                        <div className='text-muted-foreground mb-1 text-xs font-medium'>
                          {activity.time}
                        </div>
                        <div
                          className={cn(
                            'relative flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm',
                            config.iconColor
                          )}
                        >
                          <Icon className='h-4 w-4' />

                          {/* NEW 표시 */}
                          {actualIndex === 0 && isNewActivity && (
                            <div className='absolute -top-1 -right-1 animate-pulse rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white'>
                              NEW
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 활동 내용 */}
                      <div className='min-w-0 flex-1'>
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <h4 className='mb-1 line-clamp-1 text-sm font-semibold text-gray-900'>
                              {activity.title}
                            </h4>
                            <p className='mb-1 line-clamp-1 text-xs text-gray-600'>
                              {activity.description}
                            </p>
                            <div className='text-muted-foreground flex items-center gap-1 text-xs'>
                              <span>{activity.admin}</span>
                            </div>
                          </div>

                          <div className='ml-2 flex items-center gap-2'>
                            {/* 상태 배지 */}
                            <Badge
                              variant='outline'
                              className={cn(
                                'text-xs',
                                statusConfig[activity.status].color
                              )}
                            >
                              {statusConfig[activity.status].label}
                            </Badge>

                            {/* 우선순위 표시 */}
                            <div className='flex items-center gap-1'>
                              <div
                                className={cn(
                                  'h-1.5 w-1.5 rounded-full',
                                  priorityConfig[activity.priority].dot
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          )}

          {/* 인디케이터 */}
          <div className='mt-4 flex justify-center gap-2'>
            {Array.from({
              length: Math.ceil(Math.min(visibleActivities.length, 9) / 3)
            }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => setCurrentIndex(pageIndex)}
                className={cn(
                  'h-2 w-2 rounded-full transition-all duration-200',
                  pageIndex === currentIndex
                    ? 'bg-primary w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                )}
              />
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className='mt-4 text-center'>
            <button
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                isNewActivity
                  ? 'animate-pulse bg-red-500 text-white hover:bg-red-600'
                  : 'text-primary hover:text-primary/80 hover:bg-primary/10'
              )}
            >
              {isNewActivity ? '🔥 새로운 활동 확인하기' : '더 많은 활동 보기'}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
