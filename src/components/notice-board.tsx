'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, MessageSquare } from 'lucide-react';

interface NoticeItem {
  id: number;
  title: string;
  content: string;
  date: string;
  views: number;
  comments: number;
  isImportant: boolean;
  category: string;
}

const mockNotices: NoticeItem[] = [
  {
    id: 1,
    title: '제 56회 성적우수자 시상식',
    content: '2025년 1월 15일 성적우수자 시상식이 개최됩니다.',
    date: '2025.01.15',
    views: 1250,
    comments: 23,
    isImportant: true,
    category: '시상식'
  },
  {
    id: 2,
    title: '25년 9월 27일 재경관리사/회계관리 자격시험 확정답안 안내',
    content: '2025년 9월 27일 시행된 자격시험의 확정답안을 공지합니다.',
    date: '2025.01.10',
    views: 3420,
    comments: 45,
    isImportant: true,
    category: '시험안내'
  },
  {
    id: 3,
    title: '25년 9월 27일 재경관리사/회계관리 자격시험 가답안 안내',
    content: '2025년 9월 27일 시행된 자격시험의 가답안을 공지합니다.',
    date: '2025.01.10',
    views: 2890,
    comments: 67,
    isImportant: false,
    category: '시험안내'
  },
  {
    id: 4,
    title: '[공고] 2025년 09월 27일(토) 재경관리사,회계관리 시행안내',
    content: '2025년 9월 27일 시행되는 재경관리사 및 회계관리 자격시험 안내입니다.',
    date: '2025.01.05',
    views: 4560,
    comments: 89,
    isImportant: true,
    category: '공고'
  },
  {
    id: 5,
    title: '[고사장 안내] 2025년 09월 27일 자격시험 고사장 안내',
    content: '2025년 9월 27일 자격시험 고사장 위치 및 주차 안내입니다.',
    date: '2025.01.03',
    views: 3120,
    comments: 34,
    isImportant: false,
    category: '고사장안내'
  }
];

export default function NoticeBoard() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>공지사항</h2>
        <Button variant='outline'>더보기</Button>
      </div>

      <div className='space-y-4'>
        {mockNotices.map((notice) => (
          <Card key={notice.id} className='hover:shadow-md transition-shadow cursor-pointer'>
            <CardHeader className='pb-3'>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-2'>
                    {notice.isImportant && (
                      <Badge variant='destructive' className='text-xs'>
                        중요
                      </Badge>
                    )}
                    <Badge variant='outline' className='text-xs'>
                      {notice.category}
                    </Badge>
                  </div>
                  <CardTitle className='text-lg leading-tight'>
                    {notice.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className='pt-0'>
              <CardDescription className='mb-3 line-clamp-2'>
                {notice.content}
              </CardDescription>
              <div className='flex items-center justify-between text-sm text-muted-foreground'>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='w-4 h-4' />
                    {notice.date}
                  </div>
                  <div className='flex items-center gap-1'>
                    <Eye className='w-4 h-4' />
                    {notice.views.toLocaleString()}
                  </div>
                  <div className='flex items-center gap-1'>
                    <MessageSquare className='w-4 h-4' />
                    {notice.comments}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
