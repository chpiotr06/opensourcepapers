'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='outline'>
          <Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Zmiana języka</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' className='drop-shadow-dropdown bg-main-300'>
        <DropdownMenuItem onClick={() => setTheme('light')}>Jasny Motyw</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Ciemny Motyw</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>Motyw Systemowy</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
