'use client';

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from 'react';
import { useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridApi, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-quartz.css';
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
import { Plus, RefreshCw, Search, FileDown, RotateCcw } from 'lucide-react';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ScheduleData {
  id: number;
  qualification: string;
  examSession: string;
  examType: string;
  registrationPeriod: string;
  refundPeriod: string;
  examDate: string;
  resultDate: string;
}

const generateScheduleData = (): ScheduleData[] => {
  const qualifications = [
    '정보처리기사',
    '정보처리산업기사',
    '빅데이터분석기사',
    '정보보안기사',
    '네트워크관리사',
    '컴퓨터활용능력1급',
    '정보통신기사',
    '전자계산기조직응용기사'
  ];
  const examTypes = ['정기', '수시', '특별'];
  const years = [2024, 2025];

  const schedules: ScheduleData[] = [];
  let id = 1;
  qualifications.forEach((qualification) => {
    years.forEach((year) => {
      for (let session = 1; session <= 3; session++) {
        const examType =
          examTypes[Math.floor(Math.random() * examTypes.length)];
        const regStartMonth = session === 1 ? 1 : session === 2 ? 4 : 7;
        const regStartDay = 10 + Math.floor(Math.random() * 10);
        const regEndDay = regStartDay + 14;
        const registrationPeriod = `${year}.${String(regStartMonth).padStart(2, '0')}.${String(regStartDay).padStart(2, '0')} - ${year}.${String(regStartMonth).padStart(2, '0')}.${String(regEndDay).padStart(2, '0')}`;
        const refundEndDay = regStartDay + 7;
        const refundPeriod = `${year}.${String(regStartMonth).padStart(2, '0')}.${String(regStartDay).padStart(2, '0')} - ${year}.${String(regStartMonth).padStart(2, '0')}.${String(refundEndDay).padStart(2, '0')}`;
        const examMonth = regStartMonth + 1;
        const examDay = 15 + Math.floor(Math.random() * 10);
        const examDate = `${year}.${String(examMonth).padStart(2, '0')}.${String(examDay).padStart(2, '0')}`;
        const resultMonth = examMonth + 1;
        const resultDay = 10 + Math.floor(Math.random() * 10);
        const resultDate = `${year}.${String(resultMonth).padStart(2, '0')}.${String(resultDay).padStart(2, '0')}`;

        schedules.push({
          id: id++,
          qualification,
          examSession: `${session}`,
          examType,
          registrationPeriod,
          refundPeriod,
          examDate,
          resultDate
        });
      }
    });
  });

  return schedules;
};

export default function ScheduleManagement() {
  const router = useRouter();
  const [rowData, setRowData] = useState<ScheduleData[]>([]);
  const [qualification, setQualification] = useState('all');
  const [examSession, setExamSession] = useState('');
  const gridRef = useRef<AgGridReact<ScheduleData>>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  useEffect(() => {
    setRowData(generateScheduleData());
  }, []);

  const filteredData = useMemo(() => {
    return rowData.filter((row) => {
      const matchesQualification =
        qualification === 'all' || row.qualification === qualification;
      const matchesExamSession =
        examSession === '' ||
        row.examSession.toLowerCase().includes(examSession.toLowerCase());
      return matchesQualification && matchesExamSession;
    });
  }, [rowData, qualification, examSession]);

  const columnDefs = useMemo<ColDef<ScheduleData>[]>(
    () => [
      {
        headerName: 'No',
        valueGetter: 'node.rowIndex + 1',
        filter: false,
        sortable: false,
        width: 70,
        maxWidth: 70,
        cellStyle: { textAlign: 'center' }
      },
      {
        headerName: '자격명',
        field: 'qualification',
        filter: true,
        sortable: true,
        flex: 1.5,
        minWidth: 180
      },
      {
        headerName: '시험회차',
        field: 'examSession',
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 120
      },
      {
        headerName: '시험구분',
        field: 'examType',
        filter: true,
        sortable: true,
        flex: 0.8,
        minWidth: 100
      },
      {
        headerName: '접수기간',
        field: 'registrationPeriod',
        filter: true,
        sortable: true,
        flex: 1.5,
        minWidth: 200
      },
      {
        headerName: '50%환불기간',
        field: 'refundPeriod',
        filter: true,
        sortable: true,
        flex: 1.5,
        minWidth: 200
      },
      {
        headerName: '시험일정',
        field: 'examDate',
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 120
      },
      {
        headerName: '합격자발표일',
        field: 'resultDate',
        filter: true,
        sortable: true,
        flex: 1.2,
        minWidth: 140
      }
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true
    }),
    []
  );

  // Grid API 연결
  const onGridReady = useCallback((params: { api: GridApi }) => {
    setGridApi(params.api);
  }, []);

  const handleReset = useCallback(() => {
    setQualification('all');
    setExamSession('');
    // 필터 UI 초기화까지 필요하면:
    gridApi?.setFilterModel(null);
    gridApi?.onFilterChanged();
  }, [gridApi]);

  const handleRefresh = useCallback(() => {
    setRowData(generateScheduleData());
  }, []);

  const handleAdd = useCallback(() => {
    router.push('/dashboard/registration/schedule-management/form');
  }, [router]);

  // CSV 다운로드 (Community 기본)
  const handleCsvDownload = useCallback(() => {
    if (!gridApi) return;
    gridApi.exportDataAsCsv({
      fileName: '시험일정.csv',
      columnSeparator: ',',
      suppressQuotes: false // 한국어/공백 포함 셀 안전하게 내보내려면 true 권장
      // onlySelected: true,               // 선택된 행만 내보내기 옵션
      // processCellCallback: p => p.value // 필요 시 포맷 조정
    });
  }, [gridApi]);

  // Excel 다운로드 (Enterprise만 가능) - 필요 시 주석 해제
  // const handleExcelDownload = useCallback(() => {
  //   if (!gridApi) return;
  //   // @ts-ignore - Enterprise API
  //   gridApi.exportDataAsExcel({ fileName: '시험일정.xlsx' });
  // }, [gridApi]);

  return (
    <div className='w-full space-y-6'>
      {/* 검색 및 필터 영역 */}
      <div className='from-muted/50 to-muted rounded-lg bg-gradient-to-br p-6'>
        <div className='grid gap-4'>
          <div className='flex flex-wrap items-center gap-3'>
            <Select value={qualification} onValueChange={setQualification}>
              <SelectTrigger className='bg-background w-[220px] border-0 shadow-sm'>
                <SelectValue placeholder='자격명' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>전체</SelectItem>
                <SelectItem value='정보처리기사'>정보처리기사</SelectItem>
                <SelectItem value='정보처리산업기사'>
                  정보처리산업기사
                </SelectItem>
                <SelectItem value='빅데이터분석기사'>
                  빅데이터분석기사
                </SelectItem>
                <SelectItem value='정보보안기사'>정보보안기사</SelectItem>
                <SelectItem value='네트워크관리사'>네트워크관리사</SelectItem>
                <SelectItem value='컴퓨터활용능력1급'>
                  컴퓨터활용능력1급
                </SelectItem>
                <SelectItem value='정보통신기사'>정보통신기사</SelectItem>
                <SelectItem value='전자계산기조직응용기사'>
                  전자계산기조직응용기사
                </SelectItem>
              </SelectContent>
            </Select>

            <div className='relative min-w-[220px] flex-1'>
              <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
              <Input
                placeholder='시험회차 검색 (예: 1)'
                value={examSession}
                onChange={(e) => setExamSession(e.target.value)}
                className='bg-background border-0 pl-10 shadow-sm'
              />
            </div>

            <Button
              variant='outline'
              size='default'
              onClick={handleReset}
              className='bg-background border-0 shadow-sm'
            >
              <RotateCcw className='mr-2 h-4 w-4' />
              초기화
            </Button>
          </div>
        </div>
      </div>

      {/* 결과 헤더 */}
      <div className='flex items-center justify-between'>
        <div className='text-lg'>
          <span className='text-primary font-bold'>
            {filteredData.length}개
          </span>
          <span className='text-muted-foreground'>
            의 일정이 검색되었습니다.
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='default'
            onClick={handleCsvDownload}
            className='gap-2'
          >
            <FileDown className='h-4 w-4' />
            엑셀 다운로드(CSV)
          </Button>
          {/* <Button variant="outline" size="default" onClick={handleExcelDownload}>
            <FileDown className="h-4 w-4" />
            Excel(xlsx)
          </Button> */}
          <Button variant='outline' size='default' onClick={handleRefresh}>
            <RefreshCw className='mr-2 h-4 w-4' />
            새로고침
          </Button>
          <Button size='default' onClick={handleAdd}>
            <Plus className='mr-2 h-4 w-4' />
            일정 추가
          </Button>
        </div>
      </div>

      {/* AG Grid */}
      <Card className='overflow-hidden border shadow-sm'>
        <div className='ag-theme-quartz' style={{ height: 600, width: '100%' }}>
          <AgGridReact<ScheduleData>
            ref={gridRef}
            onGridReady={onGridReady}
            rowData={filteredData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection='multiple'
            pagination={true}
            paginationPageSize={20}
            paginationPageSizeSelector={[10, 20, 50, 100]}
            animateRows={true}
            suppressCellFocus={false}
            enableCellTextSelection={true}
            domLayout='normal'
          />
        </div>
      </Card>
    </div>
  );
}
