'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileDragAndDrop } from '@/components/ui/file-dnd'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import 'react-quill/dist/quill.snow.css'

const formSchema = z.object({
  title: z.string(),
  authors: z.string(),
  discipline: z.string(),
  desc: z.string(),
})
type FormSchema = z.infer<typeof formSchema>

export const ArticleForm = () => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

  const [quillValue, setQuillValue] = useState('')

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      authors: '',
      discipline: '',
      desc: '',
    },
  })

  const onSubmit = (values: FormSchema) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='mx-6 mb-6 flex flex-col gap-6'>
          <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2'>
            <Card className='h-full w-full'>
              <CardHeader>
                <CardTitle>Podstawowe informacje</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-2'>
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
            <Card className='h-full w-full'>
              <CardHeader>
                <CardTitle>Dodaj pliki</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                  <div className='mt-3 flex flex-col gap-1'>
                    <div>Praca naukowa</div>
                    <FileDragAndDrop folderName='articles' fileName='article-test' />
                  </div>
                  <div className='mt-3 flex flex-col gap-1'>
                    <div>Praca naukowa bez danych osobowych</div>
                    <FileDragAndDrop folderName='no-data-articles' fileName='no-data-article-test' />
                  </div>
                  <div className='mt-3 flex flex-col gap-1'>
                    <div>Grafika</div>
                    <FileDragAndDrop folderName='article-images' fileName='article-images-test' />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className='h-fit'>
            <CardHeader>
              <CardTitle>Streszczenie</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactQuill theme='snow' value={quillValue} onChange={setQuillValue} />
            </CardContent>
          </Card>
          <Button type='submit' className='w-fit'>
            Dodaj Pracę do oceny
          </Button>
        </div>
      </form>
    </Form>
  )
}
