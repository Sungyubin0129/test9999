'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, RotateCcw, Filter, Search, Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { getRegionSettingsById } from '@/features/exam-center/components/exam-center-region-settings';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridApi, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ExamCenterDetailData {
  id: number;
  region: string;
  examCenter: string;
  capacity: string;
}

interface ExamCenterListData {
  id: number;
  region: string;
  examCenter: string;
  address: string;
  capacity: number;
  facilities: string;
}

// 더미 데이터 생성 함수
const generateExamCenterDetailData = (): ExamCenterDetailData[] => {
  const regions = [
    '강원',
    '경기',
    '경기(송내)',
    '경주',
    '광주',
    '당진',
    '대구',
    '대전',
    '부산',
    '서울',
    '서울(구룡)',
    '서울(무학)',
    '서울(여자)',
    '서울(한양중공업)',
    '아산(천안)',
    '안동',
    '울산',
    '인천',
    '전주(익산)',
    '창원',
    '청주'
  ];

  const examCenters = [
    '강원대학교',
    '경기대학교',
    '송내고등학교',
    '경주고등학교',
    '광주대학교',
    '당진고등학교',
    '대구대학교',
    '대전대학교',
    '부산대학교',
    '서울대학교',
    '구룡고등학교',
    '무학고등학교',
    '여자고등학교',
    '한양중공업고등학교',
    '아산고등학교',
    '안동대학교',
    '울산대학교',
    '인천대학교',
    '전주고등학교',
    '창원대학교',
    '청주대학교'
  ];

  const data: ExamCenterDetailData[] = [];
  let id = 1;

  regions.forEach((region, index) => {
    const examCenter = examCenters[index] || `${region}고등학교`;

    data.push({
      id: id++,
      region,
      examCenter,
      capacity: '변경'
    });
  });

  return data;
};

// 고사장 리스트 더미 데이터 생성 함수
const generateExamCenterListData = (): ExamCenterListData[] => {
  const regions = [
    '강원',
    '경기',
    '경기(송내)',
    '경주',
    '광주',
    '당진',
    '대구',
    '대전',
    '부산',
    '서울',
    '서울(구룡)',
    '서울(무학)',
    '서울(여자)',
    '서울(한양중공업)',
    '아산(천안)',
    '안동',
    '울산',
    '인천',
    '전주(익산)',
    '창원',
    '청주'
  ];

  const examCenters = [
    '강원대학교',
    '경기대학교',
    '송내고등학교',
    '경주고등학교',
    '광주대학교',
    '당진고등학교',
    '대구대학교',
    '대전대학교',
    '부산대학교',
    '서울대학교',
    '구룡고등학교',
    '무학고등학교',
    '여자고등학교',
    '한양중공업고등학교',
    '아산고등학교',
    '안동대학교',
    '울산대학교',
    '인천대학교',
    '전주고등학교',
    '창원대학교',
    '청주대학교'
  ];

  const addresses = [
    '강원도 춘천시 강원대학길 1',
    '경기도 수원시 영통구 월드컵로 206',
    '경기도 부천시 송내대로 123',
    '경상북도 경주시 경주대학교길 1',
    '광주광역시 북구 용봉로 77',
    '충청남도 당진시 당진고등학교길 1',
    '대구광역시 동구 동대구로 1',
    '대전광역시 동구 대전대학교길 1',
    '부산광역시 부산진구 부산대학교길 1',
    '서울특별시 관악구 관악로 1',
    '서울특별시 구룡고등학교길 1',
    '서울특별시 무학고등학교길 1',
    '서울특별시 여자고등학교길 1',
    '서울특별시 한양중공업고등학교길 1',
    '충청남도 아산시 아산고등학교길 1',
    '경상북도 안동시 안동대학교길 1',
    '울산광역시 남구 울산대학교길 1',
    '인천광역시 연수구 인천대학교길 1',
    '전라북도 전주시 전주고등학교길 1',
    '경상남도 창원시 창원대학교길 1',
    '충청북도 청주시 청주대학교길 1'
  ];

  const facilities = [
    '컴퓨터실, 강의실',
    '컴퓨터실, 강의실, 도서관',
    '컴퓨터실, 강의실, 체육관',
    '컴퓨터실, 강의실, 도서관',
    '컴퓨터실, 강의실',
    '컴퓨터실, 강의실, 체육관',
    '컴퓨터실, 강의실, 도서관',
    '컴퓨터실, 강의실',
    '컴퓨터실, 강의실, 체육관',
    '컴퓨터실, 강의실, 도서관',
    '컴퓨터실, 강의실',
    '컴퓨터실, 강의실, 체육관',
    '컴퓨터실, 강의실, 도서관',
    '컴퓨터실, 강의실',
    '컴퓨터실, 강의실, 체육관',
    '컴퓨터실, 강의실, 도서관',
    '컴퓨터실, 강의실',
    '컴퓨터실, 강의실, 체육관',
    '컴퓨터실, 강의실, 도서관',
    '컴퓨터실, 강의실',
    '컴퓨터실, 강의실, 체육관'
  ];

  const data: ExamCenterListData[] = [];
  let id = 1;

  regions.forEach((region, index) => {
    const examCenter = examCenters[index] || `${region}고등학교`;
    const address = addresses[index] || `${region}고등학교길 1`;
    const facility = facilities[index] || '컴퓨터실, 강의실';

    data.push({
      id: id++,
      region,
      examCenter,
      address,
      capacity: Math.floor(Math.random() * 200) + 50, // 50~249명
      facilities: facility
    });
  });

  return data;
};

export default function ExamCenterRegionSettingsFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // 그리드 데이터와 필터 상태
  const [rowData, setRowData] = useState<ExamCenterDetailData[]>([]);
  const [filters, setFilters] = useState({
    qualification: '',
    examSession: '',
    examType: '',
    region: ''
  });
  const gridRef = useRef<AgGridReact<ExamCenterDetailData>>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  // 고사장 리스트 모달 상태
  const [isExamCenterModalOpen, setIsExamCenterModalOpen] = useState(false);
  const [examCenterListData, setExamCenterListData] = useState<
    ExamCenterListData[]
  >([]);
  const [examCenterFilters, setExamCenterFilters] = useState({
    region: '',
    search: ''
  });
  const examCenterGridRef = useRef<AgGridReact<ExamCenterListData>>(null);
  const [examCenterGridApi, setExamCenterGridApi] = useState<GridApi | null>(
    null
  );
  const [selectedExamCenters, setSelectedExamCenters] = useState<
    ExamCenterListData[]
  >([]);

  // URL 파라미터에서 데이터 로드
  useEffect(() => {
    if (id) {
      const regionSettings = getRegionSettingsById(parseInt(id));
      console.log('로드된 데이터:', regionSettings); // 디버깅용

      if (regionSettings) {
        // 시험회차 형식 변환 (숫자 -> 회차 형식)
        const examSessionFormatted = `${regionSettings.examSession}회차`;
        console.log('변환된 시험회차:', examSessionFormatted); // 디버깅용

        setFilters({
          qualification: regionSettings.qualification,
          examSession: examSessionFormatted,
          examType: '정기',
          region: ''
        });
      }
    }
    setRowData(generateExamCenterDetailData());
  }, [id]);

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    return rowData.filter((row) => {
      const matchesQualification =
        filters.qualification === '' || filters.qualification !== '';

      // 시험회차는 부분 일치 검색
      const matchesExamSession =
        filters.examSession === '' || filters.examSession !== '';

      const matchesExamType =
        filters.examType === '' || filters.examType === '정기';

      const matchesRegion =
        filters.region === '' || row.region === filters.region;

      return (
        matchesQualification &&
        matchesExamSession &&
        matchesExamType &&
        matchesRegion
      );
    });
  }, [rowData, filters]);

  // AG Grid 컬럼 정의
  const columnDefs = useMemo<ColDef<ExamCenterDetailData>[]>(
    () => [
      {
        headerName: 'No',
        valueGetter: (params) => {
          // 전체 데이터 길이에서 현재 행 인덱스를 빼서 내림차순 번호 생성
          const totalRows = params.api.getDisplayedRowCount();
          return totalRows - params.node.rowIndex;
        },
        filter: false,
        sortable: false,
        width: 70,
        maxWidth: 70,
        cellStyle: { textAlign: 'center' }
      },
      {
        headerName: '지역',
        field: 'region',
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 120
      },
      {
        headerName: '고사장',
        field: 'examCenter',
        filter: true,
        sortable: true,
        flex: 2,
        minWidth: 200
      },
      {
        headerName: '수용인원',
        field: 'capacity',
        filter: true,
        sortable: true,
        flex: 1.5,
        minWidth: 150,
        cellStyle: (params: any) => {
          return {
            fontWeight: '500',
            color: '#6b7280',
            textAlign: 'center'
          };
        }
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

  // 동적 테마 색상 적용 (시험일정관리와 동일)
  useEffect(() => {
    const applyDynamicTheme = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const colors = {
        background:
          computedStyle.getPropertyValue('--background').trim() ||
          'hsl(var(--background))',
        foreground:
          computedStyle.getPropertyValue('--foreground').trim() ||
          'hsl(var(--foreground))',
        muted:
          computedStyle.getPropertyValue('--muted').trim() ||
          'hsl(var(--muted))',
        mutedForeground:
          computedStyle.getPropertyValue('--muted-foreground').trim() ||
          'hsl(var(--muted-foreground))',
        border:
          computedStyle.getPropertyValue('--border').trim() ||
          'hsl(var(--border))',
        accent:
          computedStyle.getPropertyValue('--accent').trim() ||
          'hsl(var(--accent))',
        primary:
          computedStyle.getPropertyValue('--primary').trim() ||
          'hsl(var(--primary))'
      };

      console.log('AG Grid 동적 테마 색상:', colors); // 디버깅용

      const style = document.createElement('style');
      style.textContent = `
        /* AG Grid 전체 컨테이너 스타일 - 동적 색상 적용 */
        .ag-theme-quartz {
          border-radius: 12px !important;
          overflow: hidden !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          border: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
          background: ${colors.background || 'hsl(var(--background))'} !important;
        }
        
        /* AG Grid 헤더 스타일 - 연한 회색으로 변경 */
        .ag-theme-quartz .ag-header {
          background: ${colors.muted || 'hsl(var(--muted))'} !important;
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        }
        
        .ag-theme-quartz .ag-header-cell {
          border-right: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
          padding: 16px 12px !important;
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
          font-weight: 600 !important;
        }
        
        .ag-theme-quartz .ag-header-cell:hover {
          background-color: ${colors.accent || 'hsl(var(--accent))'} !important;
        }
        
        /* AG Grid 헤더 아이콘 스타일 - 연한 회색에 맞게 조정 */
        .ag-theme-quartz .ag-header-cell .ag-icon {
          color: ${colors.mutedForeground || 'hsl(var(--muted-foreground))'} !important;
          filter: none !important;
        }
        
        .ag-theme-quartz .ag-header-cell .ag-icon:hover {
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
          transform: scale(1.1) !important;
          transition: all 0.2s ease !important;
        }
        
        /* AG Grid 행 스타일 - 동적 색상 적용 */
        .ag-theme-quartz .ag-row {
          border-bottom: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
          transition: background-color 0.2s ease !important;
          background: ${colors.background || 'hsl(var(--background))'} !important;
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
        }
        
        .ag-theme-quartz .ag-row:hover {
          background-color: ${colors.muted || 'hsl(var(--muted))'} !important;
        }
        
        .ag-theme-quartz .ag-row.ag-row-selected {
          background-color: ${colors.accent || 'hsl(var(--accent))'} !important;
          border-left: 4px solid ${colors.primary || 'hsl(var(--primary))'} !important;
        }
        
        /* AG Grid 셀 스타일 - 동적 색상 적용 */
        .ag-theme-quartz .ag-cell {
          padding: 12px !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          border-right: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
          background: ${colors.background || 'hsl(var(--background))'} !important;
        }
        
        .ag-theme-quartz .ag-cell:focus {
          border: 2px solid ${colors.primary || 'hsl(var(--primary))'} !important;
          border-radius: 4px !important;
          outline: none !important;
        }
        
        /* AG Grid 컬럼 검색칸 스타일 - 연한 회색 헤더에 맞게 조정 */
        .ag-theme-quartz .ag-header-row .ag-header-cell .ag-text-field-input {
          border: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          font-size: 13px !important;
          background-color: ${colors.background || 'hsl(var(--background))'} !important;
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
          backdrop-filter: blur(10px) !important;
          height: 36px !important;
        }
        
        .ag-theme-quartz .ag-header-row .ag-header-cell .ag-text-field-input:focus {
          border-color: ${colors.primary || 'hsl(var(--primary))'} !important;
          outline: none !important;
          background-color: ${colors.background || 'hsl(var(--background))'} !important;
          box-shadow: 0 0 0 3px ${colors.primary || 'hsl(var(--primary))'}1A !important;
        }
        
        .ag-theme-quartz .ag-header-row .ag-header-cell .ag-text-field-input::placeholder {
          color: ${colors.mutedForeground || 'hsl(var(--muted-foreground))'} !important;
          font-size: 12px !important;
        }
        
        /* AG Grid 페이지네이션 스타일 - 동적 색상 적용 */
        .ag-theme-quartz .ag-paging-panel {
          background: ${colors.background || 'hsl(var(--background))'} !important;
          border-top: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
          padding: 16px !important;
        }
        
        .ag-theme-quartz .ag-paging-panel .ag-paging-button {
          background: ${colors.background || 'hsl(var(--background))'} !important;
          border: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
          border-radius: 6px !important;
          padding: 8px 12px !important;
          margin: 0 4px !important;
          transition: all 0.2s ease !important;
        }
        
        .ag-theme-quartz .ag-paging-panel .ag-paging-button:hover {
          background: ${colors.accent || 'hsl(var(--accent))'} !important;
          border-color: ${colors.primary || 'hsl(var(--primary))'} !important;
        }
        
        .ag-theme-quartz .ag-paging-panel .ag-paging-button.ag-disabled {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }
        
        /* AG Grid 체크박스 스타일 - 동적 색상 적용 */
        .ag-theme-quartz .ag-checkbox-input-wrapper {
          border: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
          background: ${colors.background || 'hsl(var(--background))'} !important;
        }
        
        .ag-theme-quartz .ag-checkbox-input-wrapper.ag-checked {
          background: ${colors.primary || 'hsl(var(--primary))'} !important;
          border-color: ${colors.primary || 'hsl(var(--primary))'} !important;
        }
        
        /* AG Grid 스크롤바 스타일 - 동적 색상 적용 */
        .ag-theme-quartz ::-webkit-scrollbar {
          width: 8px !important;
          height: 8px !important;
        }
        
        .ag-theme-quartz ::-webkit-scrollbar-track {
          background: ${colors.muted || 'hsl(var(--muted))'} !important;
          border-radius: 4px !important;
        }
        
        .ag-theme-quartz ::-webkit-scrollbar-thumb {
          background: ${colors.border || 'hsl(var(--border))'} !important;
          border-radius: 4px !important;
        }
        
        .ag-theme-quartz ::-webkit-scrollbar-thumb:hover {
          background: ${colors.mutedForeground || 'hsl(var(--muted-foreground))'} !important;
        }
        
        /* AG Grid 필터 팝업 스타일 - 동적 색상 적용 */
        .ag-theme-quartz .ag-popup {
          background: ${colors.background || 'hsl(var(--background))'} !important;
          border: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }
        
        .ag-theme-quartz .ag-filter-toolpanel {
          background: ${colors.background || 'hsl(var(--background))'} !important;
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
        }
        
        .ag-theme-quartz .ag-filter-toolpanel-header {
          background: ${colors.muted || 'hsl(var(--muted))'} !important;
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
          border-bottom: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
        }
        
        /* AG Grid 컬럼 메뉴 스타일 - 동적 색상 적용 */
        .ag-theme-quartz .ag-menu {
          background: ${colors.background || 'hsl(var(--background))'} !important;
          border: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }
        
        .ag-theme-quartz .ag-menu-option {
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
          padding: 8px 16px !important;
        }
        
        .ag-theme-quartz .ag-menu-option:hover {
          background: ${colors.accent || 'hsl(var(--accent))'} !important;
        }
        
        /* AG Grid 컨텍스트 메뉴 스타일 - 동적 색상 적용 */
        .ag-theme-quartz .ag-context-menu {
          background: ${colors.background || 'hsl(var(--background))'} !important;
          border: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }
        
        .ag-theme-quartz .ag-context-menu-option {
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
          padding: 8px 16px !important;
        }
        
        .ag-theme-quartz .ag-context-menu-option:hover {
          background: ${colors.accent || 'hsl(var(--accent))'} !important;
        }
        
        /* AG Grid 툴팁 스타일 - 동적 색상 적용 */
        .ag-theme-quartz .ag-tooltip {
          background: ${colors.background || 'hsl(var(--background))'} !important;
          border: 1px solid ${colors.border || 'hsl(var(--border))'} !important;
          border-radius: 6px !important;
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
        
        /* AG Grid 로딩 스타일 - 동적 색상 적용 */
        .ag-theme-quartz .ag-overlay-loading-wrapper {
          background: ${colors.background || 'hsl(var(--background))'} !important;
          color: ${colors.foreground || 'hsl(var(--foreground))'} !important;
        }
        
        .ag-theme-quartz .ag-overlay-no-rows-wrapper {
          background: ${colors.background || 'hsl(var(--background))'} !important;
          color: ${colors.mutedForeground || 'hsl(var(--muted-foreground))'} !important;
        }
      `;

      // 기존 스타일 제거
      const existingStyle = document.getElementById('ag-grid-dynamic-theme');
      if (existingStyle) {
        existingStyle.remove();
      }

      style.id = 'ag-grid-dynamic-theme';
      document.head.appendChild(style);
    };

    // 초기 적용
    applyDynamicTheme();

    // 테마 변경 감지
    const observer = new MutationObserver(() => {
      applyDynamicTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    });

    return () => {
      observer.disconnect();
      const existingStyle = document.getElementById('ag-grid-dynamic-theme');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = useCallback(() => {
    setFilters({
      qualification: '',
      examSession: '',
      examType: '',
      region: ''
    });
    gridApi?.setFilterModel(null);
    gridApi?.onFilterChanged();
  }, [gridApi]);

  const handleSubmit = () => {
    console.log('등록 완료');
    alert('등록이 완료되었습니다.');
    router.push('/dashboard/exam-center/region-settings');
  };

  const handleCancel = () => {
    router.push('/dashboard/exam-center/region-settings');
  };

  return (
    <PageContainer scrollable>
      <div className='w-full space-y-6'>
        <div className='flex items-center gap-4'>
          <Heading
            title='고사장지역설정'
            description='고사장 지역 설정을 등록하거나 수정할 수 있습니다'
          />
        </div>

        {/* 필터 버튼 */}
        <div className='flex justify-start'>
          <button
            data-slot='dialog-trigger'
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 relative inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border px-6 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            type='button'
            aria-haspopup='dialog'
            aria-expanded={isFilterOpen}
            aria-controls='filter-dialog'
            data-state={isFilterOpen ? 'open' : 'closed'}
          >
            <Filter className='mr-2 h-4 w-4' />
            필터
          </button>
        </div>

        {/* 필터 내용 */}
        {isFilterOpen && (
          <Card>
            <CardContent>
              <div className='space-y-6'>
                {/* 자격명 필터 */}
                <div className='space-y-3'>
                  <div className='text-sm font-medium text-gray-700'>
                    자격명
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {[
                      '정보처리기사',
                      '정보처리산업기사',
                      '빅데이터분석기사',
                      '정보보안기사',
                      '네트워크관리사',
                      '컴퓨터활용능력1급',
                      '정보통신기사',
                      '전자계산기조직응용기사',
                      'SQLD',
                      'SQLP',
                      'ADsP',
                      'DAsP',
                      '리눅스마스터',
                      'MOS',
                      'ITQ',
                      'GTQ',
                      '컴활2급',
                      'OA마스터'
                    ].map((qual) => (
                      <button
                        key={qual}
                        onClick={() =>
                          handleFilterChange('qualification', qual)
                        }
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          filters.qualification === qual
                            ? 'bg-black text-white'
                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {qual}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 시험회차 필터 */}
                <div className='space-y-3'>
                  <div className='text-sm font-medium text-gray-700'>
                    시험회차
                  </div>
                  <div className='flex gap-2'>
                    <div className='relative inline-flex items-center'>
                      <Input
                        type='number'
                        min='1'
                        max='3'
                        placeholder='1'
                        value={filters.examSession.replace('회차', '')}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '') {
                            handleFilterChange('examSession', '');
                          } else {
                            const num = parseInt(value);
                            if (num >= 1 && num <= 3) {
                              handleFilterChange('examSession', `${num}회차`);
                            }
                          }
                        }}
                        className='h-10 w-16 rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 text-center text-lg font-semibold shadow-sm transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      />
                      <span className='ml-2 text-sm font-medium text-gray-600'>
                        회차
                      </span>
                    </div>
                  </div>
                </div>

                {/* 시험구분 필터 - 정기만 */}
                <div className='space-y-3'>
                  <div className='text-sm font-medium text-gray-700'>
                    시험구분
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    <button
                      onClick={() => handleFilterChange('examType', '정기')}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        filters.examType === '정기'
                          ? 'bg-black text-white'
                          : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      정기
                    </button>
                  </div>
                </div>

                {/* 지역 필터 */}
                <div className='space-y-3'>
                  <div className='text-sm font-medium text-gray-700'>지역</div>
                  <div className='flex flex-wrap gap-2'>
                    {[
                      '강원',
                      '경기',
                      '경기(송내)',
                      '경주',
                      '광주',
                      '당진',
                      '대구',
                      '대전',
                      '부산',
                      '서울',
                      '서울(구룡)',
                      '서울(무학)',
                      '서울(여자)',
                      '서울(한양중공업)',
                      '아산(천안)',
                      '안동',
                      '울산',
                      '인천',
                      '전주(익산)',
                      '창원',
                      '청주'
                    ].map((region) => (
                      <button
                        key={region}
                        onClick={() => handleFilterChange('region', region)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          filters.region === region
                            ? 'bg-black text-white'
                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                    <button
                      onClick={handleReset}
                      className='flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50'
                    >
                      <RotateCcw className='h-4 w-4' />
                      초기화
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 고사장 상세 정보 그리드 */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>고사장 상세 정보</CardTitle>
              <div className='flex gap-3'>
                <Button type='button' variant='outline' onClick={handleCancel}>
                  취소
                </Button>
                <Button type='button' onClick={handleSubmit} className='gap-2'>
                  <Save className='h-4 w-4' />
                  등록
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className='ag-theme-quartz'
              style={{ height: '500px', width: '100%' }}
            >
              <AgGridReact
                ref={gridRef}
                rowData={filteredData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                pagination={true}
                paginationPageSize={20}
                paginationPageSizeSelector={[10, 20, 50, 100]}
                localeText={{
                  page: '페이지',
                  more: '더보기',
                  to: '~',
                  of: '/',
                  next: '다음',
                  last: '마지막',
                  first: '첫번째',
                  previous: '이전',
                  loadingOoo: '로딩중...',
                  selectAll: '전체선택',
                  searchOoo: '검색...',
                  blanks: '빈값',
                  filterOoo: '필터...',
                  applyFilter: '필터적용',
                  equals: '같음',
                  notEqual: '다름',
                  lessThan: '작음',
                  greaterThan: '큼',
                  contains: '포함',
                  notContains: '포함안함',
                  startsWith: '시작',
                  endsWith: '끝',
                  andCondition: '그리고',
                  orCondition: '또는',
                  noRowsToShow: '표시할 데이터가 없습니다',
                  pageSize: '페이지 크기',
                  pageTotal: '총 페이지',
                  rowCount: '행 수'
                }}
                suppressRowClickSelection={true}
                rowSelection='multiple'
                animateRows={true}
                enableCellTextSelection={true}
                ensureDomOrder={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
