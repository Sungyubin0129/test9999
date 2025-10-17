'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef
} from 'mantine-react-table';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { FileDown, RefreshCw, Filter, RotateCcw, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// 환불자 데이터 타입
interface RefundData {
  id: number;
  name: string;
  birthDate: string;
  examNumber: string;
  qualification: string;
  organization: string;
  refundRequestDate: string;
  amount: number;
  paymentMethod: string;
  refundDate: string;
  refundAmount: number;
  processor: string;
  refundProcess: string;
  status: string; // '휴먼' 또는 공백
}

// 더미 데이터 생성
const generateRefundData = (): RefundData[] => {
  const qualifications = [
    '정보처리기사',
    '정보처리산업기사',
    '빅데이터분석기사',
    '정보보안기사',
    '네트워크관리사',
    '컴퓨터활용능력1급'
  ];

  const organizations = [
    '삼성전자',
    'LG전자',
    '네이버',
    '카카오',
    'SK하이닉스',
    '현대자동차',
    '삼성SDS',
    'LG CNS',
    '한국전력공사',
    '한국수자원공사'
  ];

  const paymentMethods = ['카드', '계좌이체', '무통장입금', '가상계좌'];
  const processors = ['김관리', '이담당', '박주임', '최과장', '정부장'];
  const refundProcesses = ['완료', '진행중', '대기'];
  const statuses = ['', '', '', '휴먼']; // 대부분 공백, 가끔 휴먼

  const lastNames = [
    '김',
    '이',
    '박',
    '최',
    '정',
    '강',
    '조',
    '윤',
    '장',
    '임'
  ];
  const firstNames = [
    '민준',
    '서연',
    '도윤',
    '서준',
    '예준',
    '하은',
    '지우',
    '수빈',
    '시우',
    '준서'
  ];

  const data: RefundData[] = [];

  for (let i = 1; i <= 100; i++) {
    const year = 1980 + Math.floor(Math.random() * 30);
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const birthDate = `${year}.${month}.${day}`;

    const name =
      lastNames[Math.floor(Math.random() * lastNames.length)] +
      firstNames[Math.floor(Math.random() * firstNames.length)];

    const examNumber = `2024${String(Math.floor(Math.random() * 10000) + 10000).slice(1)}`;

    // 환불 신청일
    const refundReqYear = 2024;
    const refundReqMonth = Math.floor(Math.random() * 12) + 1;
    const refundReqDay = Math.floor(Math.random() * 28) + 1;
    const refundRequestDate = `${refundReqYear}.${String(refundReqMonth).padStart(2, '0')}.${String(refundReqDay).padStart(2, '0')}`;

    // 환불일 (신청일 이후)
    const refundDay = refundReqDay + Math.floor(Math.random() * 10) + 1;
    const refundMonth = refundDay > 28 ? refundReqMonth + 1 : refundReqMonth;
    const refundDate = `${refundReqYear}.${String(refundMonth).padStart(2, '0')}.${String(Math.min(refundDay, 28)).padStart(2, '0')}`;

    const amount = [50000, 70000, 80000, 100000][Math.floor(Math.random() * 4)];
    const refundRate = [0.5, 0.7, 1.0][Math.floor(Math.random() * 3)];
    const refundAmount = Math.floor(amount * refundRate);

    data.push({
      id: i,
      name,
      birthDate,
      examNumber,
      qualification:
        qualifications[Math.floor(Math.random() * qualifications.length)],
      organization:
        organizations[Math.floor(Math.random() * organizations.length)],
      refundRequestDate,
      amount,
      paymentMethod:
        paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      refundDate,
      refundAmount,
      processor: processors[Math.floor(Math.random() * processors.length)],
      refundProcess:
        refundProcesses[Math.floor(Math.random() * refundProcesses.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }

  return data;
};

export default function RefundStatus() {
  const [refundData, setRefundData] = useState<RefundData[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 검색 필터 state
  const [filters, setFilters] = useState({
    qualification: 'all',
    examSession: '',
    examType: 'all',
    name: '',
    birthDate: '',
    userId: ''
  });

  useEffect(() => {
    setRefundData(generateRefundData());
  }, []);

  // 활성 필터 개수
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.qualification !== 'all') count++;
    if (filters.examSession) count++;
    if (filters.examType !== 'all') count++;
    if (filters.name) count++;
    if (filters.birthDate) count++;
    if (filters.userId) count++;
    return count;
  }, [filters]);

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    return refundData.filter((item) => {
      if (
        filters.qualification !== 'all' &&
        item.qualification !== filters.qualification
      )
        return false;
      if (filters.examSession && !item.examNumber.includes(filters.examSession))
        return false;
      if (filters.name && !item.name.includes(filters.name)) return false;
      if (
        filters.birthDate &&
        !item.birthDate.includes(filters.birthDate.replace(/-/g, '.'))
      )
        return false;
      if (filters.userId && !item.examNumber.includes(filters.userId))
        return false;
      return true;
    });
  }, [refundData, filters]);

  // 컬럼 정의
  const columns = useMemo<MRT_ColumnDef<RefundData>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No',
        size: 70,
        enableColumnFilter: false
      },
      {
        accessorKey: 'name',
        header: '이름',
        size: 100
      },
      {
        accessorKey: 'birthDate',
        header: '생년월일',
        size: 120
      },
      {
        accessorKey: 'examNumber',
        header: '수험번호',
        size: 120
      },
      {
        accessorKey: 'qualification',
        header: '자격',
        size: 160
      },
      {
        accessorKey: 'organization',
        header: '단체명',
        size: 160
      },
      {
        accessorKey: 'refundRequestDate',
        header: '환불신청일',
        size: 130,
        filterVariant: 'date-range',
        enableColumnFilter: true,
        accessorFn: (row) => {
          const [year, month, day] = row.refundRequestDate.split('.');
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        },
        Cell: ({ row }) => row.original.refundRequestDate
      },
      {
        accessorKey: 'amount',
        header: '금액',
        size: 120,
        Cell: ({ cell }) => `₩${cell.getValue<number>().toLocaleString()}`,
        filterVariant: 'range-slider',
        enableColumnFilter: true,
        mantineFilterRangeSliderProps: {
          min: 0,
          max: 100000,
          step: 5000,
          label: (value) => `₩${value.toLocaleString()}`
        }
      },
      {
        accessorKey: 'paymentMethod',
        header: '결제방법',
        size: 110
      },
      {
        accessorKey: 'refundDate',
        header: '환불일',
        size: 130,
        filterVariant: 'date-range',
        enableColumnFilter: true,
        accessorFn: (row) => {
          const [year, month, day] = row.refundDate.split('.');
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        },
        Cell: ({ row }) => row.original.refundDate
      },
      {
        accessorKey: 'refundAmount',
        header: '환불금액',
        size: 120,
        Cell: ({ cell }) => `₩${cell.getValue<number>().toLocaleString()}`,
        filterVariant: 'range-slider',
        enableColumnFilter: true,
        mantineFilterRangeSliderProps: {
          min: 0,
          max: 100000,
          step: 5000,
          label: (value) => `₩${value.toLocaleString()}`
        }
      },
      {
        accessorKey: 'processor',
        header: '처리자',
        size: 100
      },
      {
        accessorKey: 'refundProcess',
        header: '환불처리',
        size: 110,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          const colorClass =
            value === '완료'
              ? 'text-green-600'
              : value === '진행중'
                ? 'text-blue-600'
                : 'text-gray-600';
          return <span className={`${colorClass} font-medium`}>{value}</span>;
        }
      },
      {
        accessorKey: 'status',
        header: '상태',
        size: 100,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return value ? (
            <span className='font-semibold text-red-600'>{value}</span>
          ) : (
            <span className='text-gray-400'>-</span>
          );
        }
      }
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: filteredData,
    enableColumnFilters: true,
    enableColumnFilterModes: true,
    enablePagination: true,
    enableSorting: true,
    enableRowSelection: true,
    enableColumnResizing: true,
    columnFilterDisplayMode: 'popover',
    initialState: {
      pagination: { pageSize: 20, pageIndex: 0 },
      density: 'xs',
      showColumnFilters: false
    },
    mantineTableProps: {
      striped: false,
      highlightOnHover: true,
      withColumnBorders: false,
      style: {
        fontSize: '14px'
      }
    },
    mantineTableHeadCellProps: {
      style: {
        backgroundColor: '#f8f9fa',
        color: '#374151',
        fontWeight: 600,
        fontSize: '13px'
      }
    },
    mantineTableContainerProps: {
      style: {
        overflowX: 'auto'
      }
    },
    mantinePaperProps: {
      style: {
        width: '100%'
      }
    }
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      qualification: 'all',
      examSession: '',
      examType: 'all',
      name: '',
      birthDate: '',
      userId: ''
    });
  };

  const handleRefresh = () => {
    setRefundData(generateRefundData());
  };

  const handleExcelDownload = () => {
    console.log('엑셀 다운로드', filteredData);
    // TODO: 실제 엑셀 다운로드 기능 구현
  };

  const qualifications = Array.from(
    new Set(refundData.map((item) => item.qualification))
  );

  return (
    <div className='w-full space-y-6'>
      {/* 필터 버튼 영역 */}
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <Button variant='outline' size='lg' className='gap-2'>
                <Filter className='h-4 w-4' />
                필터
                {activeFiltersCount > 0 && (
                  <Badge
                    variant='default'
                    className='ml-1 px-1.5 py-0.5 text-xs'
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
              <DialogHeader>
                <DialogTitle>환불자현황 검색</DialogTitle>
              </DialogHeader>
              <div className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  {/* 자격명 */}
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>자격명</label>
                    <Select
                      value={filters.qualification}
                      onValueChange={(value) =>
                        handleFilterChange('qualification', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='전체' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>전체</SelectItem>
                        {qualifications.map((qual) => (
                          <SelectItem key={qual} value={qual}>
                            {qual}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 시험회차 */}
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>시험회차</label>
                    <Input
                      placeholder='시험회차 입력'
                      value={filters.examSession}
                      onChange={(e) =>
                        handleFilterChange('examSession', e.target.value)
                      }
                    />
                  </div>

                  {/* 시험구분 */}
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>시험구분</label>
                    <Select
                      value={filters.examType}
                      onValueChange={(value) =>
                        handleFilterChange('examType', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='전체' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>전체</SelectItem>
                        <SelectItem value='정기'>정기</SelectItem>
                        <SelectItem value='수시'>수시</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 이름 */}
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>이름</label>
                    <Input
                      placeholder='이름 입력'
                      value={filters.name}
                      onChange={(e) =>
                        handleFilterChange('name', e.target.value)
                      }
                    />
                  </div>

                  {/* 생년월일 */}
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>생년월일</label>
                    <Input
                      placeholder='YYYY.MM.DD'
                      value={filters.birthDate}
                      onChange={(e) =>
                        handleFilterChange('birthDate', e.target.value)
                      }
                    />
                  </div>

                  {/* 아이디 */}
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>아이디</label>
                    <Input
                      placeholder='아이디 입력'
                      value={filters.userId}
                      onChange={(e) =>
                        handleFilterChange('userId', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className='flex justify-end gap-2'>
                  <Button variant='outline' onClick={handleClearFilters}>
                    <RotateCcw className='mr-2 h-4 w-4' />
                    초기화
                  </Button>
                  <Button onClick={() => setIsFilterOpen(false)}>검색</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant='outline'
            size='lg'
            onClick={handleClearFilters}
            disabled={activeFiltersCount === 0}
          >
            <RotateCcw className='mr-2 h-4 w-4' />
            초기화
          </Button>

          {activeFiltersCount > 0 && (
            <div className='flex flex-wrap items-center gap-2'>
              {filters.qualification && filters.qualification !== 'all' && (
                <Badge variant='secondary' className='gap-1'>
                  자격명: {filters.qualification}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('qualification', 'all')}
                  />
                </Badge>
              )}
              {filters.examType && filters.examType !== 'all' && (
                <Badge variant='secondary' className='gap-1'>
                  시험구분: {filters.examType}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('examType', 'all')}
                  />
                </Badge>
              )}
              {filters.examSession && (
                <Badge variant='secondary' className='gap-1'>
                  시험회차: {filters.examSession}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('examSession', '')}
                  />
                </Badge>
              )}
              {filters.name && (
                <Badge variant='secondary' className='gap-1'>
                  이름: {filters.name}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('name', '')}
                  />
                </Badge>
              )}
              {filters.birthDate && (
                <Badge variant='secondary' className='gap-1'>
                  생년월일: {filters.birthDate}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('birthDate', '')}
                  />
                </Badge>
              )}
              {filters.userId && (
                <Badge variant='secondary' className='gap-1'>
                  아이디: {filters.userId}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleFilterChange('userId', '')}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={handleExcelDownload}
            className='gap-2'
          >
            <FileDown className='h-4 w-4' />
            엑셀 다운로드
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={handleRefresh}
            className='gap-2'
          >
            <RefreshCw className='h-4 w-4' />
            새로고침
          </Button>
        </div>
      </div>

      {/* 결과 헤더 */}
      <div className='flex items-center justify-between'>
        <div className='text-lg'>
          <span className='text-primary font-bold'>
            {filteredData.length}개
          </span>
          <span className='text-muted-foreground'>
            의 환불 내역이 검색되었습니다.
          </span>
        </div>
      </div>

      {/* Mantine React Table */}
      <Card className='border shadow-sm'>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <MantineProvider>
            <MantineReactTable table={table} />
          </MantineProvider>
        </div>
      </Card>
    </div>
  );
}
