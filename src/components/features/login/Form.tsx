'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useLoginUserMutation } from '@/api/hooks/user/useLoginUserMutation'
import type { FormSchema } from '@/components/features/login/formSchema'
import { formSchema } from '@/components/features/login/formSchema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { appRouting } from '@/lib/app-routing'

export const LoginForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isSuccess, isPending } = useLoginUserMutation(
    () =>
      toast({
        variant: 'destructive',
        duration: 5000,
        title: 'Błędny email lub hasło',
        description:
          'Sprawdź poprawność danych i spróbuj jeszcze raz. Jesli problem bedzie się powtarzał, skontaktuj się z nami',
      }),
    () => {
      toast({
        variant: 'success',
        duration: 5000,
        title: 'Zalogowano poprawnie',
      })
      queryClient.invalidateQueries({ refetchType: 'all' })
      queryClient.resetQueries()
      queryClient.removeQueries()
      queryClient.clear()
      router.push(appRouting.articles.default)
    }
  )

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
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
          <Button disabled={isSuccess} type='submit'>
            {!isPending ? 'Zalouj się' : <Loader2 className='animate-spin' />}
          </Button>
        </div>
      </form>
    </Form>
  )
}
