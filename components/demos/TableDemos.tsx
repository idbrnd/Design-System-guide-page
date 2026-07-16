import { useState } from 'react'
import { Pagination, Table, TableContainer } from '@idbrnd/design-system'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table'

/* ------------------------------------------------------------------ */
/* 더미 데이터                                                          */
/* ------------------------------------------------------------------ */

interface Employee {
  id: number
  name: string
  team: string
  role: string
  years: number
}

const employees: Employee[] = [
  { id: 1, name: '김민준', team: '1공장 A조', role: '반장', years: 8 },
  { id: 2, name: '이서연', team: '2공장 B조', role: '사원', years: 3 },
  { id: 3, name: '박지훈', team: '1공장 C조', role: '주임', years: 5 },
  { id: 4, name: '최수아', team: '3공장 A조', role: '사원', years: 1 },
  { id: 5, name: '정도윤', team: '2공장 A조', role: '반장', years: 12 },
]

const columns: ColumnDef<Employee>[] = [
  { accessorKey: 'name', header: '이름' },
  { accessorKey: 'team', header: '소속' },
  { accessorKey: 'role', header: '직급' },
  { accessorKey: 'years', header: '근속연수' },
]

/** 페이지네이션 데모용 — 23명 분량의 데이터 */
const manyEmployees: Employee[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `사원 ${i + 1}`,
  team: `${(i % 3) + 1}공장 ${['A', 'B', 'C'][i % 3]}조`,
  role: ['사원', '주임', '반장'][i % 3],
  years: (i % 10) + 1,
}))

/* ------------------------------------------------------------------ */
/* Table                                                               */
/* ------------------------------------------------------------------ */

/** 기본 + 정렬 — 헤더 클릭으로 정렬 토글 */
export function TableSortingDemo() {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: employees,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <TableContainer variant="normal">
      <Table table={table} variant="normal" />
    </TableContainer>
  )
}

/** 행 선택 (체크박스) */
export function TableSelectableDemo() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useReactTable({
    data: employees,
    columns,
    enableRowSelection: true,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TableContainer variant="normal">
      <Table table={table} selectable />
    </TableContainer>
  )
}

/** 아코디언 — 쉐브론 클릭으로 행 펼치기 */
export function TableAccordionDemo() {
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id), // 정렬·필터 사용 시 필수
  })

  return (
    <TableContainer variant="normal">
      <Table
        table={table}
        accordion
        canExpand={(row) => row.original.years >= 5}
        renderAccordionContent={(row) => (
          <div style={{ padding: '16px 20px', fontSize: 14, color: '#555' }}>
            {row.original.name} — {row.original.team} {row.original.role}, 근속{' '}
            {row.original.years}년
          </div>
        )}
      />
    </TableContainer>
  )
}

/** 로딩 스켈레톤 */
export function TableLoadingDemo() {
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TableContainer variant="normal">
      <Table table={table} loading skeletonRowCount={4} />
    </TableContainer>
  )
}

/** 빈 상태 */
export function TableEmptyDemo() {
  const table = useReactTable({
    data: [] as Employee[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TableContainer variant="normal">
      <Table table={table} emptyTitle="데이터가 없습니다" emptyDescription="새 항목을 추가해 주세요" />
    </TableContainer>
  )
}

/* ------------------------------------------------------------------ */
/* Pagination                                                          */
/* ------------------------------------------------------------------ */

/** 독립 사용 — TanStack Table 불필요 */
export function PaginationBasicDemo() {
  const [pageIndex, setPageIndex] = useState(0)
  const pageCount = 20

  return (
    <Pagination
      pageIndex={pageIndex}
      pageCount={pageCount}
      onPageChange={setPageIndex}
      canPreviousPage={pageIndex > 0}
      canNextPage={pageIndex < pageCount - 1}
      onPreviousPage={() => setPageIndex((p) => p - 1)}
      onNextPage={() => setPageIndex((p) => p + 1)}
    />
  )
}

/** compact + 첫/끝 고정 + 페이지 이동 입력란 */
export function PaginationCompactDemo() {
  const [pageIndex, setPageIndex] = useState(0)
  const pageCount = 20

  return (
    <Pagination
      pageIndex={pageIndex}
      pageCount={pageCount}
      onPageChange={setPageIndex}
      canPreviousPage={pageIndex > 0}
      canNextPage={pageIndex < pageCount - 1}
      onPreviousPage={() => setPageIndex((p) => p - 1)}
      onNextPage={() => setPageIndex((p) => p + 1)}
      variant="compact"
      boundary
      trailingContent
    />
  )
}

/** minimize + 페이지 이동 입력란을 맨 우측에 고정 */
export function PaginationMinimizeDemo() {
  const [pageIndex, setPageIndex] = useState(0)
  const pageCount = 20

  return (
    <Pagination
      pageIndex={pageIndex}
      pageCount={pageCount}
      onPageChange={setPageIndex}
      canPreviousPage={pageIndex > 0}
      canNextPage={pageIndex < pageCount - 1}
      onPreviousPage={() => setPageIndex((p) => p - 1)}
      onNextPage={() => setPageIndex((p) => p + 1)}
      variant="minimize"
      trailingContent
      isTrailingContentEnd
    />
  )
}

/** 범위 밖 페이지 입력 시 Toast 표시 */
export function PaginationToastDemo() {
  const [pageIndex, setPageIndex] = useState(0)
  const pageCount = 20

  return (
    <Pagination
      pageIndex={pageIndex}
      pageCount={pageCount}
      onPageChange={setPageIndex}
      canPreviousPage={pageIndex > 0}
      canNextPage={pageIndex < pageCount - 1}
      onPreviousPage={() => setPageIndex((p) => p - 1)}
      onNextPage={() => setPageIndex((p) => p + 1)}
      trailingContent
      outOfRangeToastText="유효하지 않은 페이지 번호입니다."
    />
  )
}

/** TanStack Table 페이지네이션과 연동 */
export function TableWithPaginationDemo() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const table = useReactTable({
    data: manyEmployees,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <TableContainer variant="normal">
      <Table table={table} />
      <Pagination
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        onPageChange={(idx) => table.setPageIndex(idx)}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        onPreviousPage={() => table.previousPage()}
        onNextPage={() => table.nextPage()}
        variant="extended"
        boundary
      />
    </TableContainer>
  )
}
