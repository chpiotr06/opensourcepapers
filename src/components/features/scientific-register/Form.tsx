import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useScientificRegisterMutation } from '@/api/hooks/useScientificRegisterMutation'
import type { FormSchema } from '@/components/features/scientific-register/formSchema'
import { formSchema } from '@/components/features/scientific-register/formSchema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { appRouting } from '@/lib/app-routing'

export const ScientificRegisterForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const { mutate, isSuccess, isPending } = useScientificRegisterMutation(
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
      institution: '',
      degree: '',
      scientific_discipline: '',
    },
  })

  const onSubmit = (values: FormSchema) => {
    mutate(values)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6 sm:flex-row'>
          <div className='flex w-full flex-col items-center justify-normal gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full'>
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
                <FormItem className='w-full'>
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
                <FormItem className='w-full'>
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
                <FormItem className='w-full'>
                  <FormLabel>Hasło</FormLabel>
                  <FormControl>
                    <Input placeholder='***********' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-full flex-col-reverse items-center justify-normal gap-4 sm:flex-col'>
            <FormField
              control={form.control}
              name='institution'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Instytucja naukowa</FormLabel>
                  <FormControl>
                    <Input placeholder='Uniwersytet ...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='degree'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Stopien naukowy</FormLabel>
                  <FormControl>
                    <Input placeholder='magister inżynier' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='scientific_discipline'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Dyscyplina naukowa</FormLabel>
                  <FormControl>
                    <Input placeholder='astrofizyka' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Potwórz hasło</FormLabel>
                  <FormControl>
                    <Input placeholder='***********' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button disabled={isSuccess} type='submit' className='mt-6'>
          {!isPending ? 'Załóż konto' : <Loader2 className='animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}
