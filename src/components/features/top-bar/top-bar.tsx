'use client'

import { useQueryClient } from '@tanstack/react-query'
import { ChevronDown, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFetchUsersDetails } from '@/api/hooks/user/useFetchUserData'
import { useLogoutMutation } from '@/api/hooks/user/useLogoutMutation'
import { NavMenu } from '@/components/features/top-bar/navigation-menu'
import { Button } from '@/components/ui/button'
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
      queryClient.invalidateQueries({ queryKey: ['usersDetails'] })
      router.push('/')
    }
  )
  return (
    <header className='fixed flex h-14 w-full items-center justify-between gap-4 border-b-2 bg-background px-4'>
      <NavMenu role={data?.role} mail={data?.mail} />
      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <Button size='icon' variant='outline'>
          <Search className='h-5 w-5' />
        </Button>
        <DropdownMenu>
          {data?.mail && (
            <DropdownMenuTrigger className='flex flex-row items-center gap-1 [&[data-state=open]>svg:last-of-type]:rotate-180'>
              <Typography>{data?.mail}</Typography>
              <ChevronDown className='transition-all' />
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
