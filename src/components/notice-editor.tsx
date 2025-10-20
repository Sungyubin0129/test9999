'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  IconDeviceFloppy,
  IconX,
  IconEye,
  IconSend,
  IconClock
} from '@tabler/icons-react';
import dynamic from 'next/dynamic';

// CKEditor를 동적으로 import (SSR 방지)
const CKEditorComponent = dynamic(() => import('./ckeditor-wrapper'), {
  ssr: false,
  loading: () => (
    <div className='flex min-h-[400px] items-center justify-center rounded border bg-gray-50 p-4'>
      <p className='text-gray-500'>에디터를 로딩 중입니다...</p>
    </div>
  )
});

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

interface NoticeEditorProps {
  notice?: Notice | null;
  onSave: (noticeData: Partial<Notice>) => void;
  onCancel: () => void;
}

export function NoticeEditor({ notice, onSave, onCancel }: NoticeEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'general' | 'popup' | 'urgent'>('general');
  const [targetUsers, setTargetUsers] = useState<'all' | 'students' | 'admins'>(
    'all'
  );
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    if (notice) {
      setTitle(notice.title);
      setContent(notice.content);
      setType(notice.type);
      setTargetUsers(notice.targetUsers);
    } else {
      setTitle('');
      setContent('');
      setType('general');
      setTargetUsers('all');
    }
  }, [notice]);

  const handleSaveDraft = () => {
    onSave({
      title,
      content,
      type,
      targetUsers,
      status: 'draft'
    });
  };

  const handlePublish = () => {
    onSave({
      title,
      content,
      type,
      targetUsers,
      status: 'published'
    });
  };

  const editorConfiguration = {
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
  };

  return (
    <div className='space-y-6'>
      {/* 기본 정보 설정 */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='title'>제목 *</Label>
          <Input
            id='title'
            placeholder='공지사항 제목을 입력하세요'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='type'>공지사항 유형</Label>
          <Select
            value={type}
            onValueChange={(value: 'general' | 'popup' | 'urgent') =>
              setType(value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='유형 선택' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='general'>일반 공지사항</SelectItem>
              <SelectItem value='popup'>팝업 공지사항</SelectItem>
              <SelectItem value='urgent'>긴급 공지사항</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='target'>대상 사용자</Label>
        <Select
          value={targetUsers}
          onValueChange={(value: 'all' | 'students' | 'admins') =>
            setTargetUsers(value)
          }
        >
          <SelectTrigger className='w-full md:w-64'>
            <SelectValue placeholder='대상 선택' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>전체 사용자</SelectItem>
            <SelectItem value='students'>수험생만</SelectItem>
            <SelectItem value='admins'>관리자만</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 미리보기 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <IconEye className='h-5 w-5' />
            미리보기 정보
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            <Badge variant='outline'>
              유형:{' '}
              {type === 'general' ? '일반' : type === 'popup' ? '팝업' : '긴급'}
            </Badge>
            <Badge variant='outline'>
              대상:{' '}
              {targetUsers === 'all'
                ? '전체'
                : targetUsers === 'students'
                  ? '수험생'
                  : '관리자'}
            </Badge>
            <Badge variant='outline'>제목 길이: {title.length}자</Badge>
          </div>
        </CardContent>
      </Card>

      {/* 에디터 */}
      <div className='space-y-2'>
        <Label>내용 *</Label>
        <div className='rounded-md border'>
          <CKEditorComponent
            data={content}
            onChange={setContent}
            config={editorConfiguration}
          />
        </div>
        <p className='text-muted-foreground text-sm'>
          에디터를 사용하여 공지사항 내용을 작성하세요. 텍스트 서식, 표, 링크
          등을 추가할 수 있습니다.
        </p>
      </div>

      {/* 작업 버튼 */}
      <div className='flex flex-col gap-3 border-t pt-4 sm:flex-row'>
        <div className='flex flex-1 gap-2'>
          <Button
            variant='outline'
            onClick={handleSaveDraft}
            disabled={!title.trim() || !content.trim()}
            className='flex-1 sm:flex-none'
          >
            <IconClock className='mr-2 h-4 w-4' />
            임시저장
          </Button>
          <Button
            onClick={handlePublish}
            disabled={!title.trim() || !content.trim()}
            className='flex-1 sm:flex-none'
          >
            <IconSend className='mr-2 h-4 w-4' />
            게시하기
          </Button>
        </div>
        <Button variant='ghost' onClick={onCancel}>
          <IconX className='mr-2 h-4 w-4' />
          취소
        </Button>
      </div>

      {/* 도움말 */}
      <Card className='border-blue-200 bg-blue-50'>
        <CardContent className='pt-6'>
          <div className='text-sm text-blue-800'>
            <h4 className='mb-2 font-medium'>📝 작성 가이드</h4>
            <ul className='space-y-1 text-xs'>
              <li>
                • <strong>일반 공지사항</strong>: 일반적인 안내사항이나 정보
                전달
              </li>
              <li>
                • <strong>팝업 공지사항</strong>: 사용자 로그인 시 팝업으로
                표시되는 중요 공지
              </li>
              <li>
                • <strong>긴급 공지사항</strong>: 즉시 전달이 필요한 긴급한 내용
              </li>
              <li>
                • 임시저장된 공지사항은 나중에 수정하여 게시할 수 있습니다
              </li>
              <li>• 게시된 공지사항은 즉시 사용자에게 표시됩니다</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
