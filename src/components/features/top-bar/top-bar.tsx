import { Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export const TopBar = () => (
  <header className='flex h-14 w-full items-center justify-end gap-4 bg-muted'>
    <ThemeToggle />
    <Button size='icon' variant='outline'>
      <Search className='h-5 w-5' />
    </Button>
    <Menu className='mr-4 h-5 w-5' />
  </header>
)
