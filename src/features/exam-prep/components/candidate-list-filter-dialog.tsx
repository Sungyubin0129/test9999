'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Filter, X } from 'lucide-react';

interface FilterValues {
  qualification: string;
  examSession: string;
  examType: string;
  region: string;
  examCenter: string;
}

interface CandidateListFilterDialogProps {
  filters: FilterValues;
  onFilterChange: (name: string, value: string) => void;
  onApply: () => void;
  onReset: () => void;
  availableExamTypes: string[];
  availableRegions: string[];
  availableExamCenters: string[];
  canSelectExamType: boolean;
  isStep1Complete: boolean;
  isStep2Complete: boolean;
  filteredCount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CandidateListFilterDialog({
  filters,
  onFilterChange,
  onApply,
  onReset,
  availableExamTypes,
  availableRegions,
  availableExamCenters,
  canSelectExamType,
  isStep1Complete,
  isStep2Complete,
  filteredCount,
  open,
  onOpenChange
}: CandidateListFilterDialogProps) {
  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== '' && v !== 'all'
  ).length;
  const [currentTab, setCurrentTab] = useState('step1');

  // 단계 완료 시 자동으로 다음 탭으로 이동
  useEffect(() => {
    if (isStep1Complete && currentTab === 'step1') {
      setCurrentTab('step2');
    }
  }, [isStep1Complete, currentTab]);

  useEffect(() => {
    if (isStep2Complete && currentTab === 'step2') {
      setCurrentTab('step3');
    }
  }, [isStep2Complete, currentTab]);

  // Dialog가 열릴 때 탭 초기화
  useEffect(() => {
    if (open) {
      if (!isStep1Complete) {
        setCurrentTab('step1');
      } else if (!isStep2Complete) {
        setCurrentTab('step2');
      } else {
        setCurrentTab('step3');
      }
    }
  }, [open, isStep1Complete, isStep2Complete]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline' size='lg' className='relative'>
          <Filter className='mr-2 h-4 w-4' />
          필터
          {activeFilterCount > 0 && (
            <Badge className='ml-2 rounded-full px-2 py-0.5 text-xs'>
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[80vh] max-w-7xl'>
        <DialogHeader>
          <DialogTitle>필터</DialogTitle>
        </DialogHeader>

        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className='w-full'
        >
          <TabsList className='grid h-auto w-full grid-cols-3'>
            <TabsTrigger
              value='step1'
              className='h-auto flex-col gap-1 px-2 py-2.5 text-sm whitespace-normal'
            >
              <div className='flex items-center gap-1'>
                <span>1단계: 시험정보</span>
                {isStep1Complete && <span className='text-xs'>✓</span>}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value='step2'
              disabled={!isStep1Complete}
              className='h-auto flex-col gap-1 px-2 py-2.5 text-sm whitespace-normal'
            >
              <div className='flex items-center gap-1'>
                <span>2단계: 지역</span>
                {isStep2Complete && <span className='text-xs'>✓</span>}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value='step3'
              disabled={!isStep2Complete}
              className='h-auto flex-col gap-1 px-2 py-2.5 text-sm whitespace-normal'
            >
              <span>3단계: 고사장</span>
            </TabsTrigger>
          </TabsList>

          {/* 1단계: 시험정보 */}
          <TabsContent value='step1' className='min-h-[400px] space-y-4 py-4'>
            <div className='mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950'>
              <p className='text-sm font-medium text-blue-900 dark:text-blue-100'>
                자격명, 시험회차를 입력하면 시험구분을 조회할 수 있습니다. 모두
                선택해야 다음 단계로 진행할 수 있습니다.
              </p>
            </div>
            <div className='grid gap-6'>
              {/* 자격명 */}
              <div className='grid gap-2'>
                <Label
                  htmlFor='qualification'
                  className='text-base font-semibold'
                >
                  자격명 <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={filters.qualification}
                  onValueChange={(value) =>
                    onFilterChange('qualification', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='자격명을 선택하세요' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>선택하세요</SelectItem>
                    <SelectItem value='정보처리기사'>정보처리기사</SelectItem>
                    <SelectItem value='정보처리산업기사'>
                      정보처리산업기사
                    </SelectItem>
                    <SelectItem value='빅데이터분석기사'>
                      빅데이터분석기사
                    </SelectItem>
                    <SelectItem value='정보보안기사'>정보보안기사</SelectItem>
                    <SelectItem value='네트워크관리사'>
                      네트워크관리사
                    </SelectItem>
                    <SelectItem value='컴퓨터활용능력1급'>
                      컴퓨터활용능력1급
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 시험회차 */}
              <div className='grid gap-2'>
                <Label
                  htmlFor='examSession'
                  className='text-base font-semibold'
                >
                  시험회차 <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='examSession'
                  placeholder='시험회차를 입력하세요 (예: 2025년 1회)'
                  value={filters.examSession}
                  onChange={(e) =>
                    onFilterChange('examSession', e.target.value)
                  }
                />
              </div>

              {/* 시험구분 */}
              <div className='grid gap-2'>
                <Label htmlFor='examType' className='text-base font-semibold'>
                  시험구분 <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={filters.examType}
                  onValueChange={(value) => onFilterChange('examType', value)}
                  disabled={!canSelectExamType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='시험구분을 선택하세요' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>선택하세요</SelectItem>
                    {availableExamTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!canSelectExamType && (
                  <p className='text-muted-foreground text-sm'>
                    자격명과 시험회차를 먼저 선택해주세요.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* 2단계: 지역 선택 */}
          <TabsContent value='step2' className='min-h-[400px] space-y-4 py-4'>
            <div className='mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950'>
              <p className='text-sm font-medium text-blue-900 dark:text-blue-100'>
                지역을 선택하면 해당 지역의 고사장을 조회할 수 있습니다.
                {isStep1Complete && (
                  <span className='ml-2'>
                    (조회 가능한 지역: {availableRegions.length}개)
                  </span>
                )}
              </p>
            </div>
            <div className='grid gap-6'>
              {/* 지역 */}
              <div className='grid gap-2'>
                <Label htmlFor='region' className='text-base font-semibold'>
                  지역 <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={filters.region}
                  onValueChange={(value) => onFilterChange('region', value)}
                  disabled={!isStep1Complete}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='지역을 선택하세요' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>선택하세요</SelectItem>
                    {availableRegions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!isStep1Complete && (
                  <p className='text-muted-foreground text-sm'>
                    1단계를 먼저 완료해주세요.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* 3단계: 고사장 선택 */}
          <TabsContent value='step3' className='min-h-[400px] space-y-4 py-4'>
            <div className='mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950'>
              <p className='text-sm font-medium text-blue-900 dark:text-blue-100'>
                고사장을 선택하여 수험자명단을 조회할 수 있습니다.
                {isStep2Complete && (
                  <span className='ml-2'>
                    (조회 가능한 고사장: {availableExamCenters.length}개)
                  </span>
                )}
              </p>
            </div>
            <div className='grid gap-6'>
              {/* 고사장 */}
              <div className='grid gap-2'>
                <Label htmlFor='examCenter' className='text-base font-semibold'>
                  고사장{' '}
                  <span className='text-muted-foreground text-sm'>
                    (선택사항)
                  </span>
                </Label>
                <Select
                  value={filters.examCenter}
                  onValueChange={(value) => onFilterChange('examCenter', value)}
                  disabled={!isStep2Complete}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='고사장을 선택하세요' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>전체</SelectItem>
                    {availableExamCenters.map((center) => (
                      <SelectItem key={center} value={center}>
                        {center}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!isStep2Complete && (
                  <p className='text-muted-foreground text-sm'>
                    2단계를 먼저 완료해주세요.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className='gap-2'>
          <Button type='button' variant='outline' onClick={onReset}>
            <X className='mr-2 h-4 w-4' />
            초기화
          </Button>
          <Button type='button' onClick={onApply} disabled={!isStep1Complete}>
            {isStep1Complete
              ? `${filteredCount}개 결과 보기`
              : '최소 1단계까지 완료해주세요'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
