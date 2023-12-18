'use client'

import Link from 'next/link'
import { ScientificRegisterForm } from '@/components/features/scientific-register/Form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { appRouting } from '@/lib/app-routing'

export const ScientificRegister = () => (
  <div className='flex flex-col items-center gap-3 '>
    <Card className='h-fit w-screen sm:w-[40rem]'>
      <CardHeader>
        <CardTitle>Zarejestruj się jako Pracownik Naukowy</CardTitle>
      </CardHeader>
      <CardContent>
        <ScientificRegisterForm />
      </CardContent>
    </Card>
    <Typography variant='p-14-400' className='text-center'>
      Masz już konto?
      <Button variant='link'>
        <Link href={appRouting.login}>Zaloguj się</Link>
      </Button>
    </Typography>
    <Typography variant='p-14-400' className='text-center'>
      Nie potrzebujesz konta naukowego?
      <Button variant='link'>
        <Link href={appRouting.scientificRegister}>Załóż konto Użytkownika.</Link>
      </Button>
    </Typography>
  </div>
)
