'use client'

import { LoginForm } from '@/components/features/login/Form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const LoginUser = () => (
  <Card className='h-fit w-96'>
    <CardHeader>
      <CardTitle>Zaloguj się</CardTitle>
    </CardHeader>
    <CardContent>
      <LoginForm />
    </CardContent>
  </Card>
)
