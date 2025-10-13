'use client';

import { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react';

// Java 프로젝트의 Qualification 데이터 타입
export interface Qualification {
  tq_id: string;
  tq_num: string;
  mber_nm: string;
  ex_level: string;
  ex_name: string;
  pass_date: string;
  tq_sdate: string;
  tq_edate: string;
  bosu_day: number;
  score1?: string;
  score2?: string;
  score3?: string;
  ext_date?: string;
  tq_state: string;
  tq_state_name: string;
}

// Mock 데이터 (Java 프로젝트의 Qualification 데이터 구조)
const mockQualificationData: Qualification[] = [
  {
    tq_id: 'Q2024001',
    tq_num: '회계사 1급',
    mber_nm: '김회계',
    ex_level: '1급',
    ex_name: '회계사',
    pass_date: '2024-01-15',
    tq_sdate: '2024-01-15',
    tq_edate: '2029-01-15',
    bosu_day: 90,
    score1: '85',
    score2: '92',
    score3: '88',
    tq_state: 'ACTIVE',
    tq_state_name: '활성'
  },
  {
    tq_id: 'Q2024002',
    tq_num: '세무사 2급',
    mber_nm: '이세무',
    ex_level: '2급',
    ex_name: '세무사',
    pass_date: '2024-02-20',
    tq_sdate: '2024-02-20',
    tq_edate: '2029-02-20',
    bosu_day: 75,
    score1: '78',
    score2: '85',
    score3: '82',
    tq_state: 'ACTIVE',
    tq_state_name: '활성'
  },
  {
    tq_id: 'Q2024003',
    tq_num: '감사원 3급',
    mber_nm: '박감사',
    ex_level: '3급',
    ex_name: '감사원',
    pass_date: '2024-03-10',
    tq_sdate: '2024-03-10',
    tq_edate: '2029-03-10',
    bosu_day: 60,
    score1: '90',
    score2: '88',
    score3: '92',
    tq_state: 'EXPIRED',
    tq_state_name: '만료'
  }
];

export function QualificationTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Java 프로젝트의 컬럼 정의 (QualificationManage.xml 기반)
  const columns: ColumnDef<Qualification>[] = [
    {
      accessorKey: 'tq_id',
      header: '자격증ID',
      cell: ({ row }) => (
        <div className='font-medium'>{row.getValue('tq_id')}</div>
      )
    },
    {
      accessorKey: 'tq_num',
      header: '자격번호',
      cell: ({ row }) => (
        <div className='font-medium'>{row.getValue('tq_num')}</div>
      )
    },
    {
      accessorKey: 'mber_nm',
      header: '회원명',
      cell: ({ row }) => (
        <div className='font-medium'>{row.getValue('mber_nm')}</div>
      )
    },
    {
      accessorKey: 'ex_level',
      header: '등급',
      cell: ({ row }) => {
        const level = row.getValue('ex_level') as string;
        return (
          <Badge
            variant={
              level === '1급'
                ? 'default'
                : level === '2급'
                  ? 'secondary'
                  : 'outline'
            }
          >
            {level}
          </Badge>
        );
      }
    },
    {
      accessorKey: 'ex_name',
      header: '시험이름',
      cell: ({ row }) => <div>{row.getValue('ex_name')}</div>
    },
    {
      accessorKey: 'pass_date',
      header: '합격일',
      cell: ({ row }) => <div>{row.getValue('pass_date')}</div>
    },
    {
      accessorKey: 'tq_sdate',
      header: '유효시작일',
      cell: ({ row }) => <div>{row.getValue('tq_sdate')}</div>
    },
    {
      accessorKey: 'tq_edate',
      header: '유효만료일',
      cell: ({ row }) => {
        const endDate = row.getValue('tq_edate') as string;
        const isExpired = new Date(endDate) < new Date();
        return <div className={isExpired ? 'text-red-500' : ''}>{endDate}</div>;
      }
    },
    {
      accessorKey: 'bosu_day',
      header: '보수과정 남은일',
      cell: ({ row }) => {
        const days = row.getValue('bosu_day') as number;
        return (
          <Badge
            variant={
              days < 30 ? 'destructive' : days < 60 ? 'secondary' : 'default'
            }
          >
            {days}일
          </Badge>
        );
      }
    },
    {
      accessorKey: 'tq_state_name',
      header: '상태',
      cell: ({ row }) => {
        const state = row.getValue('tq_state_name') as string;
        return (
          <Badge variant={state === '활성' ? 'default' : 'destructive'}>
            {state}
          </Badge>
        );
      }
    },
    {
      id: 'actions',
      header: '작업',
      cell: ({ row }) => {
        const qualification = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuCheckboxItem>
                <Eye className='mr-2 h-4 w-4' />
                상세보기
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                <Edit className='mr-2 h-4 w-4' />
                수정
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                <Download className='mr-2 h-4 w-4' />
                자격증 다운로드
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className='text-red-600'>
                <Trash2 className='mr-2 h-4 w-4' />
                삭제
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  const table = useReactTable({
    data: mockQualificationData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <div className='w-full'>
      {/* Java 프로젝트의 검색 및 필터 기능 */}
      <div className='flex items-center space-x-2 py-4'>
        <div className='flex items-center space-x-2'>
          <Search className='h-4 w-4' />
          <Input
            placeholder='회원명으로 검색...'
            value={
              (table.getColumn('mber_nm')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('mber_nm')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        </div>

        <Button variant='outline' size='sm'>
          <Filter className='mr-2 h-4 w-4' />
          고급필터
        </Button>

        <Button variant='outline' size='sm'>
          <Download className='mr-2 h-4 w-4' />
          Excel 다운로드
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              컬럼 <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 테이블 */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Java 프로젝트의 페이징 기능 */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='text-muted-foreground flex-1 text-sm'>
          {table.getFilteredSelectedRowModel().rows.length}개 중{' '}
          {table.getFilteredRowModel().rows.length}개 행이 선택됨
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            이전
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
