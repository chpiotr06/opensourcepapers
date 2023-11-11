import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const RegisterUser = () => (
  <Card className='h-fit w-96'>
    <CardHeader>
      <CardTitle>Zarejestruj się</CardTitle>
    </CardHeader>
    <CardContent>
      <form>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1'>
            <Label htmlFor='name'>Imię</Label>
            <Input id='name' placeholder='Jan' />
          </div>
          <div className='flex flex-col space-y-1'>
            <Label htmlFor='surname'>Nazwisko</Label>
            <Input id='surname' placeholder='Kowalski' />
          </div>
          <div className='flex flex-col space-y-1'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' placeholder='mail@example.com' />
          </div>
          <div className='flex flex-col space-y-1'>
            <Label htmlFor='password'>Hasło</Label>
            <Input type='password' id='password' placeholder='*************' />
          </div>
          <div className='flex flex-col space-y-1'>
            <Label htmlFor='confirmPassword'>Powtórz hasło</Label>
            <Input type='password' id='confirmPassword' placeholder='*************' />
          </div>
        </div>
      </form>
    </CardContent>
  </Card>
)
