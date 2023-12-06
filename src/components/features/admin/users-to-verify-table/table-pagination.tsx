import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { UserToVerify } from '@/api/types/api.UsersToVerify'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import type { Table } from '@tanstack/react-table'

export const TablePagination = ({ table }: { table: Table<UserToVerify> }) => {
  const totalRows = table.getRowModel().rows.length

  return (
    <div className='bottom-0 flex h-10 w-full items-center justify-end rounded-b-md px-4'>
      <Button
        variant='link'
        className='p-0'
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft />
      </Button>
      <Typography variant='p-12-400'>
        Strona
        <span className='rounded-xs bg-main-300 mx-1 p-[3px]'>
          {totalRows > 0 ? table.getState().pagination.pageIndex + 1 : 0}
        </span>
        z {table.getPageCount()}
      </Typography>
      <Button variant='link' className='p-0' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        <ChevronRight />
      </Button>
    </div>
  )
}
