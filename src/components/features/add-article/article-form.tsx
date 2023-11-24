'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileDragAndDrop } from '@/components/ui/file-dnd'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  title: z.string(),
  authors: z.string(),
  discipline: z.string(),
  desc: z.string(),
  abstract: z.string(),
})
type FormSchema = z.infer<typeof formSchema>

export const ArticleForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      authors: '',
      discipline: '',
      desc: '',
      abstract: '',
    },
  })

  const onSubmit = (values: FormSchema) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='h-fit w-96'>
          <CardHeader>
            <CardTitle>Podstawowe informacje</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tytuł</FormLabel>
                  <FormControl>
                    <Input placeholder='Podaj tytuł' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='authors'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autorzy</FormLabel>
                  <FormControl>
                    <Input placeholder='Podaj autorów po przecinku' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='discipline'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dyscyplina naukowa</FormLabel>
                  <FormControl>
                    <Input placeholder='Podaj dyscypline' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='desc'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Krótki opis</FormLabel>
                  <FormControl>
                    <Textarea className='min-h-[8rem]' placeholder='Podaj tytuł' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card className='h-fit w-96'>
          <CardHeader>
            <CardTitle>Dodaj pliki</CardTitle>
          </CardHeader>
          <CardContent>
            <FileDragAndDrop />
            <FileDragAndDrop />
            <FileDragAndDrop />
          </CardContent>
        </Card>
        <Card className='h-fit w-96'>
          <CardHeader>
            <CardTitle>Streszczenie</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea></Textarea>
          </CardContent>
        </Card>
        <Button type='submit'>Dodaj Pracę do oceny</Button>
      </form>
    </Form>
  )
}
