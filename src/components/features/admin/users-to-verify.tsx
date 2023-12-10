'use client'
import { useFetchUsersToVerify } from '@/api/hooks/admin/useFetchUsersToVerify'
import { DataTable } from '@/components/features/admin/users-to-verify-table/data-table'
import { useColumns } from '@/components/features/admin/users-to-verify-table/use-columns'

export const UsersToVerifyTable = () => {
  const { data } = useFetchUsersToVerify()
  const { columns } = useColumns()
  if (!data) return <>There was an error</>
  return <DataTable columns={columns} data={data.data} />
}
