'use client'
import { useFetchUsersToVerify } from '@/api/hooks/admin/useFetchUsersToVerify'
import { TableSkeleton } from '@/components/features/admin/table-skeleton'
import { DataTable } from '@/components/features/admin/users-to-verify-table/data-table'
import { useColumns } from '@/components/features/admin/users-to-verify-table/use-columns'
import { ErrorMessage } from '@/components/features/error-message/error-message'

export const UsersToVerifyTable = () => {
  const { data, isPending, isError } = useFetchUsersToVerify()
  const { columns } = useColumns()

  if (isPending) return <TableSkeleton />

  if (!data || isError)
    return (
      <ErrorMessage
        title='Błąd sieci'
        description='Nie udało się pobrać kont do zweryfikowania. Odśwież stronę i spróbuj jeszcze raz.'
      />
    )
  return <DataTable columns={columns} data={data.data} />
}
