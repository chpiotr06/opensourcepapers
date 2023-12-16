'use client'

import Link from 'next/link'
import { RegisterForm } from '@/components/features/register/Form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { appRouting } from '@/lib/app-routing'

export const RegisterUser = () => (
  <div className='flex flex-col items-center gap-3'>
    <Card className='h-fit w-96'>
      <CardHeader>
        <CardTitle>Zarejestruj się</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
    <Typography variant='p-14-400'>
      Masz już konto?
      <Button variant='link'>
        <Link href={appRouting.login}>Zaloguj się</Link>
      </Button>
    </Typography>
    <Typography variant='p-14-400'>
      Jesteś Pracownikiem Naukowym?
      <Button variant='link'>
        <Link href={appRouting.scientificRegister}>Załóż konto Pracownika Naukowego.</Link>
      </Button>
    </Typography>
  </div>
)
