'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  IconBell,
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconEyeOff,
  IconCalendar
} from '@tabler/icons-react';
import { useState } from 'react';

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

const mockPopupNotices: PopupNotice[] = [
  {
    id: '1',
    title: '제56회 시험장 변경 긴급 공지',
    content: '서울 지역 시험장이 변경되었습니다. 반드시 확인하세요.',
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

export function PopupNoticeManagement() {
  const [notices] = useState<PopupNotice[]>(mockPopupNotices);

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
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2'>
            <IconBell className='h-5 w-5' />
            팝업 공지사항 추가 관리
          </CardTitle>
          <Button size='sm' className='h-8'>
            <IconPlus className='mr-1 h-4 w-4' />
            추가
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={cn(
                'rounded-lg border p-4 transition-all duration-200 hover:shadow-md',
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
                      'mb-2 line-clamp-2 text-xs',
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
                  <div className='flex items-center gap-1'>
                    <Button variant='ghost' size='sm' className='h-6 w-6 p-0'>
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
          <div className='flex items-center justify-between text-sm text-gray-600'>
            <span>총 {notices.length}개 공지사항</span>
            <span>활성 {notices.filter((n) => n.isActive).length}개</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
