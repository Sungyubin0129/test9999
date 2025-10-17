'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconSend,
  IconInfoCircle,
  IconAlertCircle,
  IconEye,
  IconCalendar
} from '@tabler/icons-react';
import dynamic from 'next/dynamic';

const CKEditorComponent = dynamic(
  () => import('@/components/ckeditor-wrapper'),
  {
    ssr: false,
    loading: () => (
      <div className='flex min-h-[400px] items-center justify-center rounded border bg-gray-50 p-4'>
        <p className='text-gray-500'>에디터를 로딩 중입니다...</p>
      </div>
    )
  }
);

// 공지사항 타입 설정
const typeConfig = {
  general: {
    label: '일반 공지사항',
    icon: '📢',
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  popup: {
    label: '팝업 공지사항',
    icon: '🔔',
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  urgent: {
    label: '긴급 공지사항',
    icon: '🚨',
    color: 'bg-red-100 text-red-700 border-red-200'
  }
};

// 대상 사용자 설정
const targetConfig = {
  all: {
    label: '전체',
    icon: '👥'
  },
  students: {
    label: '수험생',
    icon: '🎓'
  },
  admins: {
    label: '관리자',
    icon: '👔'
  }
};

export default function NoticeCreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'general' | 'popup' | 'urgent'>('general');
  const [targetUsers, setTargetUsers] = useState<'all' | 'students' | 'admins'>(
    'all'
  );
  const [isPreview, setIsPreview] = useState(false);

  const handleCancel = () => {
    router.push('/dashboard/profile/notice-management');
  };

  const handleSaveDraft = () => {
    console.log('임시저장:', { title, content, type, targetUsers });
    alert('임시저장되었습니다.');
  };

  const handlePublish = () => {
    console.log('게시:', { title, content, type, targetUsers });
    alert('공지사항이 게시되었습니다.');
    router.push('/dashboard/profile/notice-management');
  };

  return (
    <div className='flex h-screen flex-col'>
      {/* 헤더 */}
      <div className='flex flex-shrink-0 items-center justify-between border-b bg-white px-6 py-4'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='sm'
            onClick={handleCancel}
            className='gap-2'
          >
            <IconArrowLeft className='h-4 w-4' />
            목록으로
          </Button>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>공지사항 작성</h2>
            <p className='text-muted-foreground text-sm'>
              공지사항을 작성하고 게시하세요
            </p>
          </div>
        </div>
      </div>

      {/* 메인 레이아웃: 왼쪽(작성 영역) + 오른쪽(미리보기) - 5:7 비율, 여백 없음 */}
      <div className='grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-12'>
        {/* 왼쪽: 작성 영역 (5/12) */}
        <div className='space-y-4 overflow-y-auto border-r p-6 pb-18 lg:col-span-5'>
          {/* 제목 및 작성 가이드 섹션 */}
          <Card>
            <CardHeader className='pb-4'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg'>📋 공지사항 정보</CardTitle>
                <Badge className={`${typeConfig[type].color} text-xs`}>
                  {typeConfig[type].icon} {typeConfig[type].label}
                </Badge>
              </div>
              <CardDescription>
                공지사항의 기본 정보를 입력하세요
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* 작성 가이드 */}
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                <div className='mb-2 flex items-center gap-2'>
                  <IconInfoCircle className='h-4 w-4 text-blue-600' />
                  <h3 className='text-sm font-semibold text-blue-900'>
                    작성 가이드
                  </h3>
                </div>
                <div className='space-y-2 text-xs text-blue-800'>
                  <div className='flex items-start gap-2'>
                    <span className='mt-0.5 text-blue-600'>•</span>
                    <p>
                      <strong>일반 공지사항:</strong> 일반적인 안내사항
                    </p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='mt-0.5 text-blue-600'>•</span>
                    <p>
                      <strong>팝업 공지사항:</strong> 로그인 시 팝업 표시
                    </p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='mt-0.5 text-blue-600'>•</span>
                    <p>
                      <strong>긴급 공지사항:</strong> 최상단 강조 표시
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* 제목, 유형, 공개범위 - 한 줄 배치 */}
              <div className='grid grid-cols-12 items-end gap-3'>
                {/* 제목 입력 */}
                <div className='col-span-6 space-y-2'>
                  <Label htmlFor='title' className='text-sm font-medium'>
                    제목 <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='title'
                    placeholder='공지사항 제목을 입력하세요'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='h-9'
                  />
                </div>

                {/* 유형 선택 */}
                <div className='col-span-3 space-y-2'>
                  <Label className='text-sm font-medium'>
                    유형 <span className='text-red-500'>*</span>
                  </Label>
                  <Select
                    value={type}
                    onValueChange={(value: 'general' | 'popup' | 'urgent') =>
                      setType(value)
                    }
                  >
                    <SelectTrigger className='h-9'>
                      <SelectValue placeholder='유형' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='general'>
                        <div className='flex items-center gap-2'>
                          <span>📢</span>
                          <span>일반</span>
                        </div>
                      </SelectItem>
                      <SelectItem value='popup'>
                        <div className='flex items-center gap-2'>
                          <span>🔔</span>
                          <span>팝업</span>
                        </div>
                      </SelectItem>
                      <SelectItem value='urgent'>
                        <div className='flex items-center gap-2'>
                          <span>🚨</span>
                          <span>긴급</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 공개범위 선택 */}
                <div className='col-span-3 space-y-2'>
                  <Label className='text-sm font-medium'>
                    범위 <span className='text-red-500'>*</span>
                  </Label>
                  <Select
                    value={targetUsers}
                    onValueChange={(value: 'all' | 'students' | 'admins') =>
                      setTargetUsers(value)
                    }
                  >
                    <SelectTrigger className='h-9'>
                      <SelectValue placeholder='범위' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>
                        <div className='flex items-center gap-2'>
                          <span>👥</span>
                          <span>전체</span>
                        </div>
                      </SelectItem>
                      <SelectItem value='students'>
                        <div className='flex items-center gap-2'>
                          <span>🎓</span>
                          <span>수험생</span>
                        </div>
                      </SelectItem>
                      <SelectItem value='admins'>
                        <div className='flex items-center gap-2'>
                          <span>👔</span>
                          <span>관리자</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 내용 작성 섹션 */}
          <Card className='flex flex-col'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-lg'>✏️ 내용 작성</CardTitle>
              <CardDescription>
                공지사항의 상세 내용을 작성하세요
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-1'>
              <div className='min-h-[300px]'>
                <CKEditorComponent
                  data={content}
                  onChange={setContent}
                  config={{
                    toolbar: [
                      'heading',
                      '|',
                      'bold',
                      'italic',
                      'underline',
                      '|',
                      'bulletedList',
                      'numberedList',
                      '|',
                      'outdent',
                      'indent',
                      '|',
                      'blockQuote',
                      'link',
                      '|',
                      'undo',
                      'redo'
                    ]
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* 주의사항 및 작업 버튼 - 간소화 */}
          <Card className='border-orange-200 bg-orange-50/30'>
            <CardContent className='pt-3 pb-3'>
              <div className='space-y-3'>
                {/* 주의사항 - 간소화 */}
                <div>
                  <div className='mb-1.5 flex items-center gap-2'>
                    <IconAlertCircle className='h-3.5 w-3.5 text-orange-600' />
                    <h3 className='text-xs font-semibold text-orange-900'>
                      주의사항
                    </h3>
                  </div>
                  <div className='text-[11px] leading-relaxed text-orange-800'>
                    임시저장 후 나중에 수정 가능 • 게시 시 즉시 노출 • 긴급
                    공지는 최상단 강조
                  </div>
                </div>

                <Separator />

                {/* 작업 버튼 */}
                <div className='flex items-center justify-end gap-2'>
                  <Button variant='ghost' onClick={handleCancel} size='sm'>
                    취소
                  </Button>
                  <Button
                    variant='outline'
                    onClick={handleSaveDraft}
                    disabled={!title.trim() || !content.trim()}
                    className='gap-2'
                    size='sm'
                  >
                    <IconDeviceFloppy className='h-4 w-4' />
                    임시저장
                  </Button>
                  <Button
                    onClick={handlePublish}
                    disabled={!title.trim() || !content.trim()}
                    className='gap-2'
                    size='sm'
                  >
                    <IconSend className='h-4 w-4' />
                    게시하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽: 실시간 미리보기 (7/12) */}
        <div className='overflow-y-auto bg-gradient-to-br from-blue-50/30 to-white p-6 pb-20 lg:col-span-7'>
          <Card className='flex h-full flex-col'>
            <CardHeader className='flex-shrink-0 border-b bg-white'>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle className='flex items-center gap-2 text-lg'>
                    <IconEye className='h-5 w-5 text-blue-600' />
                    실시간 미리보기
                  </CardTitle>
                  <CardDescription className='mt-1'>
                    작성하는 대로 실시간으로 표시됩니다
                  </CardDescription>
                </div>
                <Badge
                  className={`${typeConfig[type].color} px-3 py-1 text-sm`}
                >
                  {typeConfig[type].icon} {typeConfig[type].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className='flex flex-1 flex-col overflow-y-auto p-6'>
              {/* 미리보기 헤더 */}
              <div className='mb-6 flex-shrink-0 rounded-lg border bg-white p-6 shadow-sm'>
                <div className='mb-4 flex items-start justify-between'>
                  <div className='flex-1'>
                    <h2
                      className={cn(
                        'mb-3 text-2xl font-bold transition-all',
                        title ? 'text-gray-900' : 'text-gray-400'
                      )}
                    >
                      {title || '제목을 입력하세요'}
                    </h2>
                    <div className='text-muted-foreground flex items-center gap-4 text-sm'>
                      <div className='flex items-center gap-2'>
                        <IconCalendar className='h-4 w-4' />
                        <span>{new Date().toLocaleDateString('ko-KR')}</span>
                      </div>
                      <span>•</span>
                      <span>관리자</span>
                      <span>•</span>
                      <Badge variant='outline' className='text-sm'>
                        {targetConfig[targetUsers].icon}{' '}
                        {targetConfig[targetUsers].label}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Separator />
              </div>

              {/* 미리보기 본문 */}
              <div className='flex-1 rounded-lg border bg-white p-8 shadow-sm'>
                {content ? (
                  <div
                    className='prose prose-base max-w-none'
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <div className='flex h-full flex-col items-center justify-center py-20 text-gray-400'>
                    <IconEye className='mb-4 h-16 w-16 opacity-30' />
                    <p className='text-base font-medium'>
                      내용을 입력하면 여기에 미리보기가 표시됩니다
                    </p>
                    <p className='mt-2 text-sm'>
                      CKEditor에서 작성한 내용이 실시간으로 반영됩니다
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
