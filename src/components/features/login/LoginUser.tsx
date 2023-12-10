'use client'

import Link from 'next/link'
import { LoginForm } from '@/components/features/login/Form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { appRouting } from '@/lib/app-routing'

export const LoginUser = () => (
  <div className='flex flex-col items-center gap-3'>
    <Card className='h-fit w-96'>
      <CardHeader>
        <CardTitle>Zaloguj się</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
    <Button variant='link'>
      <Typography variant='p-14-400'>
        <Link href={appRouting.register}>Stwórz nowe konto</Link>
      </Typography>
    </Button>
  </div>
)
