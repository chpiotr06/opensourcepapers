'use client'

import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export function NavMenu({ role, mail }: { role: string | undefined; mail: string | undefined }) {
  return (
    <div className='flex w-fit gap-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>Przeglądaj</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
            <li className='row-span-3'>
              <DropdownMenuItem>
                <a
                  className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                  href='/'
                >
                  <div className='mb-2 mt-4 text-lg font-medium'>Strona główna</div>
                  <p className='text-sm leading-tight text-muted-foreground'>Darmowy dostęp do prac naukowych</p>
                </a>
              </DropdownMenuItem>
            </li>
            <DropdownMenuItem title='Przeglądaj'>
              <Link href='/articles'>Znajdź interesującą Cię pracę naukową</Link>
            </DropdownMenuItem>
            {(role === 'admin' || role === 'scientist') && (
              <>
                <DropdownMenuItem title='Dodaj recenzję'>
                  <Link href='/articles/add-article'>Dodaj pracę naukową do naszej bazy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem title='Do recenzji'>
                  <Link href='/articles/to-review'>Przeglądaj listę prac które wymagają recenzji</Link>
                </DropdownMenuItem>
              </>
            )}
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
      {mail === null && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Zaloguj</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem title='Zaloguj sie'>
              <Link href='/login'>Zaloguj sie do systemu</Link>
            </DropdownMenuItem>
            <DropdownMenuItem title='Zarejestruj się'>
              <Link href='/register'>Utwórz konto zwykłego użytkownika</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/scientific-register'>Utwórz konto pracownika naukowego</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {role === 'admin' && (
        <Button variant='outline'>
          <Link href='/admin'>
            <div>Administracja</div>
          </Link>
        </Button>
      )}
    </div>
  )
}
