import { useQueryClient } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import { useVerifyUserMutation } from '@/api/hooks/admin/useVerifyUserMutation'
import type { UserToVerify } from '@/api/types/api.UsersToVerify'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'
import type { ReactNode } from 'react'

const TooltipCell = ({ children }: { children: ReactNode }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className='max-w-[150px] truncate text-center'>{children}</TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export const useColumns = () => {
  const columnHelper = createColumnHelper<UserToVerify>()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { mutate } = useVerifyUserMutation(
    () =>
      toast({
        variant: 'destructive',
        duration: 5000,
        title: 'Nie udało się zweryfikować użytkownika',
        description: 'Poczekaj chwilę i spróbuj jeszcze raz. Jesli problem bedzie się powtarzał, skontaktuj się z nami',
      }),
    () => {
      toast({
        variant: 'success',
        duration: 5000,
        title: 'Zweryfikowano użytkownika poprawnie',
      })
      queryClient.invalidateQueries({ queryKey: ['usersToVerify'] })
    }
  )

  const columns = [
    columnHelper.accessor('name', {
      header: 'Imię',
      cell: (cell) => <TooltipCell>{cell.getValue()}</TooltipCell>,
      enableHiding: false,
    }),
    columnHelper.accessor('surname', {
      header: 'Nazwisko',
      cell: (cell) => <TooltipCell>{cell.getValue()}</TooltipCell>,
      enableHiding: false,
    }),
    columnHelper.accessor('scientific_profiles.degree', {
      header: 'Stopień naukowy',
      cell: ({ cell }) => <TooltipCell>{cell.getValue()}</TooltipCell>,
    }),
    columnHelper.accessor('scientific_profiles.institution', {
      header: 'Instytucja',
      cell: ({ cell }) => <TooltipCell>{cell.getValue()}</TooltipCell>,
      enableHiding: false,
    }),
    columnHelper.accessor('scientific_profiles.scientific_discipline', {
      header: 'Dyscyplina naukowa',
      cell: (cell) => <TooltipCell>{cell.getValue()}</TooltipCell>,
      enableHiding: false,
    }),
    columnHelper.accessor('scientific_profile_id', {
      header: 'Zwyeryfikuj',
      cell: (cell) => <Button onClick={() => mutate(cell.getValue())}>Zweryfikuj</Button>,
      enableHiding: false,
    }),
  ]

  return { columns }
}
