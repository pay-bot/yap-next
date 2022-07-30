import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { PageButton } from '../../shared/Button';
import { SortDownIcon, SortIcon, SortUpIcon } from '../../shared/Icons';
import GlobalFilter from './GlobalFilter';

function ReactTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination
    // tableHooks,  // new
  );

  // Render the UI for your table
  return (
    <div className="rounded border bg-white">
      <div className="px-4 sm:flex sm:gap-x-2">
        <div className="w-full bg-white px-2 pt-4 pb-2">
          <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
        </div>
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render('Filter')}
              </div>
            ) : null
          )
        )}
      </div>
      {/* table */}
      <div className="mt-4  flex flex-col ">
        <div className="-my-2 w-full overflow-x-auto ">
          <div className="inline-block w-full py-2 align-middle ">
            <div className="overflow-x-scroll border-b border-gray-100 shadow ">
              <table {...getTableProps()} className=" divide-y divide-gray-50">
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr key={headerGroup.id} className="" {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          key={column.id}
                          scope="col"
                          className="group px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#1F2937]"
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                        >
                          <div className="flex items-center justify-between">
                            {column.render('Header')}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted && (column.isSortedDesc ? <SortDownIcon className="h-4 w-4 text-gray-400" /> : <SortUpIcon className="h-4 w-4 text-gray-400" />)}
                              {!column.isSorted && <SortIcon className="h-4 w-4 text-gray-400 " />}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="divide-y divide-gray-50 bg-white">
                  {page.map((row) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr key={row.id} {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td key={cell.column.id} {...cell.getCellProps()} className="whitespace-nowrap px-6 py-3 " role="cell">
                              {cell.column.Cell.name === 'defaultRenderer' ? <div className="text-sm text-gray-500">{cell.render('Cell')}</div> : cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between py-3 px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <button type="button" onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-x-2">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
            </span>
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <PageButton className="rounded-l-md" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </PageButton>
              <PageButton onClick={() => previousPage()} disabled={!canPreviousPage}>
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </PageButton>
              <PageButton className="rounded-r-md" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReactTable;
