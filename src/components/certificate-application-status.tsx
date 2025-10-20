'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  IconCertificate,
  IconUser,
  IconCalendar,
  IconPhone,
  IconMail,
  IconDownload,
  IconPrinter
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';

interface CertificateApplication {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  examType: string;
  examDate: Date;
  applicationDate: Date;
  status: 'pending' | 'approved' | 'issued' | 'delivered';
  certificateNumber?: string;
  avatar?: string;
}

const mockApplications: CertificateApplication[] = [
  {
    id: '1',
    userName: '김수험',
    userEmail: 'kim.exam@email.com',
    userPhone: '010-1234-5678',
    examType: '재경관리사',
    examDate: new Date('2024-11-09'),
    applicationDate: new Date('2024-12-15'),
    status: 'issued',
    certificateNumber: 'FIN-2024-001234'
  },
  {
    id: '2',
    userName: '이합격',
    userEmail: 'lee.pass@email.com',
    userPhone: '010-9876-5432',
    examType: '회계관리 1급',
    examDate: new Date('2024-11-09'),
    applicationDate: new Date('2024-12-20'),
    status: 'approved',
    certificateNumber: 'ACC1-2024-005678'
  },
  {
    id: '3',
    userName: '박시험',
    userEmail: 'park.test@email.com',
    userPhone: '010-5555-1234',
    examType: '회계관리 2급',
    examDate: new Date('2024-11-09'),
    applicationDate: new Date('2025-01-10'),
    status: 'pending'
  },
  {
    id: '4',
    userName: '최자격',
    userEmail: 'choi.cert@email.com',
    userPhone: '010-7777-8888',
    examType: '보험중개사',
    examDate: new Date('2024-11-09'),
    applicationDate: new Date('2025-01-12'),
    status: 'issued',
    certificateNumber: 'INS-2024-009876'
  },
  {
    id: '5',
    userName: '정관리',
    userEmail: 'jung.mgmt@email.com',
    userPhone: '010-3333-4444',
    examType: '재경관리사',
    examDate: new Date('2024-11-09'),
    applicationDate: new Date('2025-01-14'),
    status: 'approved',
    certificateNumber: 'FIN-2024-002345'
  },
  {
    id: '6',
    userName: '한회계',
    userEmail: 'han.acc@email.com',
    userPhone: '010-6666-7777',
    examType: '회계관리 1급',
    examDate: new Date('2024-11-09'),
    applicationDate: new Date('2025-01-16'),
    status: 'pending'
  }
];

const statusConfig = {
  pending: {
    label: '검토중',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    dot: 'bg-yellow-500'
  },
  approved: {
    label: '승인완료',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    dot: 'bg-blue-500'
  },
  issued: {
    label: '발급완료',
    color: 'bg-green-100 text-green-700 border-green-200',
    dot: 'bg-green-500'
  },
  delivered: {
    label: '배송완료',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    dot: 'bg-purple-500'
  }
};

export function CertificateApplicationStatus() {
  const [applications] = useState<CertificateApplication[]>(mockApplications);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드 기능 (2개씩 표시)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxPages = Math.ceil(applications.length / 2); // 2개씩 그룹화
        const nextIndex = (prevIndex + 1) % maxPages;
        return nextIndex;
      });
    }, 4500); // 4.5초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, [applications.length]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.charAt(0);
  };

  // 현재 페이지의 2개 항목 가져오기
  const getCurrentPageApplications = () => {
    const startIndex = currentIndex * 2;
    return applications.slice(startIndex, startIndex + 2);
  };

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <IconCertificate className='h-5 w-5' />
          자격증 신청 현황
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='min-h-[400px] space-y-4'>
          {getCurrentPageApplications().map((app) => (
            <div
              key={app.id}
              className='rounded-lg border bg-white p-4 transition-all duration-200 hover:shadow-md'
            >
              {/* 사용자 정보 헤더 */}
              <div className='mb-3 flex items-center gap-3'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage src={app.avatar} />
                  <AvatarFallback className='bg-primary/10 text-primary font-medium'>
                    {getInitials(app.userName)}
                  </AvatarFallback>
                </Avatar>
                <div className='min-w-0 flex-1'>
                  <div className='mb-1 flex items-center gap-2'>
                    <h4 className='text-sm font-medium text-gray-900'>
                      {app.userName}
                    </h4>
                    <Badge
                      variant='outline'
                      className={cn('text-xs', statusConfig[app.status].color)}
                    >
                      <div
                        className={cn(
                          'mr-1 h-2 w-2 rounded-full',
                          statusConfig[app.status].dot
                        )}
                      />
                      {statusConfig[app.status].label}
                    </Badge>
                  </div>
                  <div className='text-xs font-medium text-gray-600'>
                    {app.examType}
                  </div>
                </div>
                <div className='flex items-center gap-1'>
                  {app.status === 'issued' && (
                    <>
                      <Button variant='ghost' size='sm' className='h-7 w-7 p-0'>
                        <IconDownload className='h-3 w-3' />
                      </Button>
                      <Button variant='ghost' size='sm' className='h-7 w-7 p-0'>
                        <IconPrinter className='h-3 w-3' />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* 상세 정보 */}
              <div className='grid grid-cols-2 gap-3 text-xs'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <IconMail className='h-3 w-3' />
                    <span>{app.userEmail}</span>
                  </div>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <IconPhone className='h-3 w-3' />
                    <span>{app.userPhone}</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <IconCalendar className='h-3 w-3' />
                    <span>시험일: {formatDate(app.examDate)}</span>
                  </div>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <IconUser className='h-3 w-3' />
                    <span>신청일: {formatDate(app.applicationDate)}</span>
                  </div>
                </div>
              </div>

              {/* 자격증 번호 */}
              {app.certificateNumber && (
                <div className='mt-3 border-t pt-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-gray-600'>자격증 번호</span>
                    <span className='font-mono text-xs font-medium text-gray-900'>
                      {app.certificateNumber}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 인디케이터 */}
        <div className='mt-4 flex justify-center gap-2'>
          {Array.from({ length: Math.ceil(applications.length / 2) }).map(
            (_, pageIndex) => (
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
            )
          )}
        </div>

        <div className='mt-4 border-t pt-3'>
          <div className='flex items-center justify-between text-sm text-gray-600'>
            <span>총 {applications.length}건</span>
            <span>
              발급완료{' '}
              {applications.filter((a) => a.status === 'issued').length}건
            </span>
          </div>
          <div className='mt-2 flex items-center justify-center text-xs text-gray-500'>
            페이지 {currentIndex + 1} / {Math.ceil(applications.length / 2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
