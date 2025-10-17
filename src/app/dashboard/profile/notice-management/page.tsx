'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconEyeOff,
  IconCalendar,
  IconSearch,
  IconFilter
} from '@tabler/icons-react';
import PageContainer from '@/components/layout/page-container';

interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'popup' | 'urgent';
  status: 'draft' | 'published' | 'archived';
  targetUsers: 'all' | 'students' | 'admins';
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  author: string;
  views: number;
}

const mockNotices: Notice[] = [
  {
    id: '1',
    title: '[긴급] 제56회 시험장 변경 안내',
    content: '<p>서울 지역 시험장이 변경되었습니다. 자세한 내용은...</p>',
    type: 'urgent',
    status: 'published',
    targetUsers: 'all',
    createdAt: new Date('2025-01-16'),
    updatedAt: new Date('2025-01-16'),
    publishedAt: new Date('2025-01-16'),
    author: '관리자',
    views: 1234
  },
  {
    id: '2',
    title: '제56회 성적우수자 시상식 개최',
    content: '<p>성적우수자 시상식을 개최합니다...</p>',
    type: 'general',
    status: 'published',
    targetUsers: 'students',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    publishedAt: new Date('2025-01-15'),
    author: '관리자',
    views: 856
  },
  {
    id: '3',
    title: '시험 접수 시스템 점검 안내',
    content: '<p>시스템 점검으로 인한 서비스 중단 안내...</p>',
    type: 'popup',
    status: 'draft',
    targetUsers: 'all',
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date('2025-01-14'),
    author: '관리자',
    views: 0
  }
];

const typeConfig = {
  general: { label: '일반', color: 'bg-blue-100 text-blue-700' },
  popup: { label: '팝업', color: 'bg-orange-100 text-orange-700' },
  urgent: { label: '긴급', color: 'bg-red-100 text-red-700' }
};

const statusConfig = {
  draft: { label: '임시저장', color: 'bg-gray-100 text-gray-700' },
  published: { label: '게시중', color: 'bg-green-100 text-green-700' },
  archived: { label: '보관됨', color: 'bg-yellow-100 text-yellow-700' }
};

const targetConfig = {
  all: { label: '전체', color: 'bg-purple-100 text-purple-700' },
  students: { label: '수험생', color: 'bg-indigo-100 text-indigo-700' },
  admins: { label: '관리자', color: 'bg-gray-100 text-gray-700' }
};

export default function NoticeManagementPage() {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notice.type === filterType;
    const matchesStatus =
      filterStatus === 'all' || notice.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateNotice = () => {
    router.push('/dashboard/profile/notice-management/create');
  };

  const handleEditNotice = (noticeId: string) => {
    router.push(`/dashboard/profile/notice-management/edit?id=${noticeId}`);
  };

  const handleDeleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <PageContainer scrollable={true}>
      <div className='space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight'>공지사항 관리</h2>
            <p className='text-muted-foreground'>
              시험 관련 공지사항을 작성하고 관리하세요
            </p>
          </div>
          <Button onClick={handleCreateNotice}>
            <IconPlus className='mr-2 h-4 w-4' />새 공지사항
          </Button>
        </div>

        {/* 검색 및 필터 */}
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-3'>
              {/* 공지사항 유형 */}
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='전체' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>전체</SelectItem>
                  <SelectItem value='general'>일반</SelectItem>
                  <SelectItem value='popup'>팝업</SelectItem>
                  <SelectItem value='urgent'>긴급</SelectItem>
                </SelectContent>
              </Select>

              {/* 상태 */}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className='w-[160px]'>
                  <SelectValue placeholder='상태' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>전체</SelectItem>
                  <SelectItem value='draft'>임시저장</SelectItem>
                  <SelectItem value='published'>게시중</SelectItem>
                  <SelectItem value='archived'>보관됨</SelectItem>
                </SelectContent>
              </Select>

              {/* 검색 */}
              <div className='relative flex-1'>
                <Input
                  id='search'
                  placeholder='제목 또는 내용으로 검색...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pr-10'
                />
                <IconSearch className='text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2' />
              </div>

              {/* 초기화 버튼 */}
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setFilterStatus('all');
                }}
                className='gap-2 whitespace-nowrap'
              >
                <IconFilter className='h-4 w-4' />
                초기화
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 공지사항 목록 */}
        <Card>
          <CardHeader>
            <CardTitle>공지사항 목록 ({filteredNotices.length}개)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>제목</TableHead>
                  <TableHead>유형</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>대상</TableHead>
                  <TableHead>조회수</TableHead>
                  <TableHead>작성일</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableCell>
                      <div className='font-medium'>{notice.title}</div>
                      <div className='text-muted-foreground text-sm'>
                        {notice.author}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={typeConfig[notice.type].color}>
                        {typeConfig[notice.type].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[notice.status].color}>
                        {statusConfig[notice.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={targetConfig[notice.targetUsers].color}
                      >
                        {targetConfig[notice.targetUsers].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{notice.views.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className='text-sm'>
                        {formatDate(notice.createdAt)}
                      </div>
                      {notice.publishedAt && (
                        <div className='text-muted-foreground text-xs'>
                          게시: {formatDate(notice.publishedAt)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleEditNotice(notice.id)}
                        >
                          <IconEdit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleDeleteNotice(notice.id)}
                          className='text-red-600 hover:text-red-700'
                        >
                          <IconTrash className='h-4 w-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
