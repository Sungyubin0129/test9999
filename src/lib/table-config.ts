// 테이블 라이브러리 설정
// Tanstack Table 대신 React Table v8 또는 AG Grid 사용

export const tableConfig = {
  // React Table v8 설정
  reactTable: {
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    enableGlobalFilter: true
  },

  // AG Grid 설정 (더 강력한 기능)
  agGrid: {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true
    },
    pagination: true,
    paginationPageSize: 20,
    enableRangeSelection: true,
    enableCharts: true
  }
};

// Java 프로젝트의 테이블 기능 매핑
export const javaTableFeatures = {
  // Java 프로젝트의 주요 테이블 기능들
  qualification: {
    columns: [
      'tq_id',
      'tq_num',
      'mber_nm',
      'ex_level',
      'pass_date',
      'tq_sdate',
      'tq_edate'
    ],
    sorting: [
      'ex_level',
      'tq_id',
      'mber_id',
      'mber_nm',
      'tq_num',
      'tq_sdate',
      'tq_edate'
    ],
    filtering: ['exam_kind', 'exam_rec', 'mber_id', 'name']
  },

  examCart: {
    columns: ['cart_no', 'license_code', 'exam_kind', 'exam_rec', 'reg_date'],
    sorting: ['cart_no', 'license_code', 'reg_date'],
    filtering: ['exam_kind', 'exam_rec', 'user_no']
  }
};
