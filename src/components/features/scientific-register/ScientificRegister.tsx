'use client'

import { ScientificRegisterForm } from '@/components/features/scientific-register/Form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const ScientificRegister = () => (
  <Card className='h-fit w-[40rem]'>
    <CardHeader>
      <CardTitle>Zarejestruj się jako Pracownik Naukowy</CardTitle>
    </CardHeader>
    <CardContent>
      <ScientificRegisterForm />
    </CardContent>
  </Card>
)
