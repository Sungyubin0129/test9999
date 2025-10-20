'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  IconBell,
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconEyeOff,
  IconCalendar,
  IconSpeakerphone,
  IconBellRinging
} from '@tabler/icons-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 일반 공지사항 데이터
const regularNotices = [
  {
    id: '1',
    title: '[긴급] 제56회 시험장 변경 안내',
    date: '2025.01.16',
    category: '긴급',
    color: 'bg-red-500'
  },
  {
    id: '2',
    title: '제56회 성적우수자 시상식 개최',
    date: '2025.01.15',
    category: '이벤트',
    color: 'bg-blue-500'
  },
  {
    id: '3',
    title: '재경관리사/회계관리 자격시험 확정답안 안내',
    date: '2025.01.12',
    category: '답안',
    color: 'bg-green-500'
  },
  {
    id: '4',
    title: '[공고] 2025년 2월 시험 시행 안내',
    date: '2025.01.10',
    category: '공고',
    color: 'bg-purple-500'
  }
];

// 팝업 공지사항 데이터
interface PopupNotice {
  id: string;
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  priority: 'high' | 'medium' | 'low';
  targetUsers: 'all' | 'students' | 'admins';
}

const popupNotices: PopupNotice[] = [
  {
    id: '1',
    title: '제56회 시험장 변경 긴급 공지',
    content: '서울 지역 시험장이 변경되었습니다.',
    startDate: new Date('2025-01-16'),
    endDate: new Date('2025-02-15'),
    isActive: true,
    priority: 'high',
    targetUsers: 'all'
  },
  {
    id: '2',
    title: '시험 접수 마감 임박 안내',
    content: '2월 시험 접수가 3일 후 마감됩니다.',
    startDate: new Date('2025-01-15'),
    endDate: new Date('2025-02-12'),
    isActive: true,
    priority: 'medium',
    targetUsers: 'students'
  },
  {
    id: '3',
    title: '시스템 점검 안내',
    content: '1월 20일 새벽 2시-4시 시스템 점검이 있습니다.',
    startDate: new Date('2025-01-18'),
    endDate: new Date('2025-01-21'),
    isActive: false,
    priority: 'low',
    targetUsers: 'all'
  }
];

const priorityConfig = {
  high: {
    label: '높음',
    color: 'bg-red-100 text-red-700 border-red-200',
    dot: 'bg-red-500'
  },
  medium: {
    label: '보통',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    dot: 'bg-orange-500'
  },
  low: {
    label: '낮음',
    color: 'bg-green-100 text-green-700 border-green-200',
    dot: 'bg-green-500'
  }
};

const targetConfig = {
  all: { label: '전체', color: 'bg-blue-100 text-blue-700' },
  students: { label: '수험생', color: 'bg-purple-100 text-purple-700' },
  admins: { label: '관리자', color: 'bg-gray-100 text-gray-700' }
};

export function UnifiedNoticeManagement() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('regular');

  const handleNoticeClick = (noticeId: string) => {
    router.push(`/dashboard/profile/notice-management/edit?id=${noticeId}`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      month: 'numeric',
      day: 'numeric'
    });
  };

  const getDateRange = (start: Date, end: Date) => {
    return `${formatDate(start)} ~ ${formatDate(end)}`;
  };

  return (
    <Card className='h-full'>
      <CardHeader className='pb-3'>
        <CardTitle className='flex items-center gap-2'>
          <IconSpeakerphone className='h-5 w-5' />
          공지사항 통합 관리
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='mb-4 grid w-full grid-cols-2'>
            <TabsTrigger value='regular' className='flex items-center gap-2'>
              <IconBell className='h-4 w-4' />
              일반 공지사항
              <Badge variant='secondary' className='ml-1 text-xs'>
                {regularNotices.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value='popup' className='flex items-center gap-2'>
              <IconBellRinging className='h-4 w-4' />
              팝업 공지사항
              <Badge variant='secondary' className='ml-1 text-xs'>
                {popupNotices.filter((n) => n.isActive).length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* 일반 공지사항 탭 */}
          <TabsContent value='regular' className='mt-0'>
            <div className='mb-4 flex items-center justify-between'>
              <p className='text-muted-foreground text-sm'>
                시험 관련 공지사항 및 중요 알림 관리
              </p>
              <Button size='sm' className='h-8'>
                <IconPlus className='mr-1 h-4 w-4' />
                추가
              </Button>
            </div>

            <div className='max-h-80 space-y-2 overflow-y-auto'>
              {regularNotices.map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => handleNoticeClick(notice.id)}
                  className='hover:bg-muted/50 group flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors'
                >
                  <div
                    className={cn(
                      'mt-2 h-2 w-2 flex-shrink-0 rounded-full',
                      notice.color
                    )}
                  ></div>
                  <div className='min-w-0 flex-1'>
                    <div className='line-clamp-2 text-sm font-medium'>
                      {notice.title}
                    </div>
                    <div className='text-muted-foreground mt-1 text-xs'>
                      {notice.date} • {notice.category}
                    </div>
                  </div>
                  <div className='flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-6 w-6 p-0'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNoticeClick(notice.id);
                      }}
                    >
                      <IconEdit className='h-3 w-3' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-6 w-6 p-0 text-red-500 hover:text-red-700'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IconTrash className='h-3 w-3' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-4 border-t pt-3'>
              <Button variant='outline' size='sm' className='w-full'>
                더보기
              </Button>
            </div>
          </TabsContent>

          {/* 팝업 공지사항 탭 */}
          <TabsContent value='popup' className='mt-0'>
            <div className='mb-4 flex items-center justify-between'>
              <p className='text-muted-foreground text-sm'>
                사용자에게 팝업으로 표시되는 중요 공지사항
              </p>
              <Button
                size='sm'
                className='h-8 bg-orange-500 hover:bg-orange-600'
              >
                <IconPlus className='mr-1 h-4 w-4' />
                팝업 추가
              </Button>
            </div>

            <div className='max-h-80 space-y-3 overflow-y-auto'>
              {popupNotices.map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => handleNoticeClick(notice.id)}
                  className={cn(
                    'group cursor-pointer rounded-lg border p-3 transition-all duration-200 hover:shadow-md',
                    notice.isActive
                      ? 'border-gray-200 bg-white'
                      : 'border-gray-100 bg-gray-50'
                  )}
                >
                  <div className='mb-2 flex items-start justify-between'>
                    <div className='min-w-0 flex-1'>
                      <div className='mb-1 flex items-center gap-2'>
                        <h4
                          className={cn(
                            'line-clamp-1 text-sm font-medium',
                            notice.isActive ? 'text-gray-900' : 'text-gray-500'
                          )}
                        >
                          {notice.title}
                        </h4>
                        {notice.isActive ? (
                          <IconEye className='h-4 w-4 flex-shrink-0 text-green-500' />
                        ) : (
                          <IconEyeOff className='h-4 w-4 flex-shrink-0 text-gray-400' />
                        )}
                      </div>
                      <p
                        className={cn(
                          'mb-2 line-clamp-1 text-xs',
                          notice.isActive ? 'text-gray-600' : 'text-gray-400'
                        )}
                      >
                        {notice.content}
                      </p>
                      <div className='flex items-center gap-2 text-xs text-gray-500'>
                        <IconCalendar className='h-3 w-3' />
                        <span>
                          {getDateRange(notice.startDate, notice.endDate)}
                        </span>
                      </div>
                    </div>
                    <div className='ml-3 flex flex-col items-end gap-2'>
                      <div className='flex items-center gap-1'>
                        <div
                          className={cn(
                            'h-2 w-2 rounded-full',
                            priorityConfig[notice.priority].dot
                          )}
                        />
                        <Badge
                          variant='outline'
                          className={cn(
                            'text-xs',
                            priorityConfig[notice.priority].color
                          )}
                        >
                          {priorityConfig[notice.priority].label}
                        </Badge>
                      </div>
                      <Badge
                        variant='outline'
                        className={cn(
                          'text-xs',
                          targetConfig[notice.targetUsers].color
                        )}
                      >
                        {targetConfig[notice.targetUsers].label}
                      </Badge>
                      <div className='flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-6 w-6 p-0'
                        >
                          <IconEdit className='h-3 w-3' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-6 w-6 p-0 text-red-500 hover:text-red-700'
                        >
                          <IconTrash className='h-3 w-3' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-4 border-t pt-3'>
              <div className='mb-3 flex items-center justify-between text-sm text-gray-600'>
                <span>총 {popupNotices.length}개 팝업</span>
                <span>
                  활성 {popupNotices.filter((n) => n.isActive).length}개
                </span>
              </div>
              <Button variant='outline' size='sm' className='w-full'>
                팝업 관리 페이지로
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
