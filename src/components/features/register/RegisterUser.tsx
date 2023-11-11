'use client'

import { RegisterForm } from '@/components/features/register/Form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const RegisterUser = () => (
  <Card className='h-fit w-96'>
    <CardHeader>
      <CardTitle>Zarejestruj się</CardTitle>
    </CardHeader>
    <CardContent>
      <RegisterForm />
    </CardContent>
  </Card>
)
