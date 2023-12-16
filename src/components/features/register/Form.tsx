import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useRegisterMutation } from '@/api/hooks/user/useRegisterMutation'
import { formSchema } from '@/components/features/register/formSchema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { appRouting } from '@/lib/app-routing'
import type * as z from 'zod'

type FormSchema = z.infer<typeof formSchema>

export const RegisterForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const { mutate, isSuccess, isPending } = useRegisterMutation(
    () =>
      toast({
        variant: 'destructive',
        duration: 5000,
        title: 'Ups! Coś poszło nie tak',
        description:
          'Sprawdź poprawność danych i spróbuj jeszcze raz. Jesli problem bedzie się powtarzał, skontaktuj się z nami',
      }),
    () => {
      toast({
        variant: 'success',
        duration: 5000,
        title: 'Konto utworzone',
        description: 'Sprawdź maila aby potwierdzić konto',
      })
      router.push(appRouting.articles.default)
    }
  )

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: FormSchema) => {
    mutate(values)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid w-full items-center gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imię</FormLabel>
                <FormControl>
                  <Input placeholder='Jan' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='surname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwisko</FormLabel>
                <FormControl>
                  <Input placeholder='Kowalski' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hasło</FormLabel>
                <FormControl>
                  <Input placeholder='***********' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potwórz hasło</FormLabel>
                <FormControl>
                  <Input placeholder='***********' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSuccess} type='submit'>
            {!isPending ? 'Załóż konto' : <Loader2 className='animate-spin' />}
          </Button>
        </div>
      </form>
    </Form>
  )
}
