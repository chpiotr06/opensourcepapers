'use client'

import { useQueryClient } from '@tanstack/react-query'
import { ChevronDown, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFetchUsersDetails } from '@/api/hooks/user/useFetchUserData'
import { useLogoutMutation } from '@/api/hooks/user/useLogoutMutation'
import { NavMenu } from '@/components/features/top-bar/navigation-menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'

export const TopBar = () => {
  const { data } = useFetchUsersDetails()
  const { toast } = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate } = useLogoutMutation(
    () =>
      toast({
        variant: 'destructive',
        duration: 5000,
        title: 'Ups! Coś poszło nie tak',
        description:
          'Nie udało się poprawnie wylogować. Spróbuj jeszcze raz. Jesli problem bedzie się powtarzał, skontaktuj się z nami',
      }),
    () => {
      toast({
        variant: 'success',
        duration: 5000,
        title: 'Wylogwano poprawnie',
        description: 'Przekierowano na stronę główną',
      })
      queryClient.invalidateQueries({ refetchType: 'all' })
      queryClient.resetQueries()
      queryClient.removeQueries()
      queryClient.clear()
      router.push('/')
    }
  )
  return (
    <header className='fixed z-10 flex h-14 w-full items-center justify-between gap-4 border-b-2 bg-background px-4'>
      <NavMenu role={data?.role} mail={data?.mail} />
      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <DropdownMenu>
          {data?.mail && (
            <DropdownMenuTrigger className='flex flex-row items-center gap-1 [&[data-state=open]>svg:last-of-type]:rotate-180'>
              <div className='hidden flex-row items-center gap-1 sm:flex [&[data-state=open]>svg:last-of-type]:rotate-180'>
                <Typography>{data?.mail}</Typography>
                <ChevronDown className='transition-all' />
              </div>
              <Menu className='sm:hidden' />
            </DropdownMenuTrigger>
          )}
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => mutate()}>
              <Typography>Wyloguj się</Typography>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
