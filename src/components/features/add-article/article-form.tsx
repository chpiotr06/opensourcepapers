'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { uuid } from 'uuidv4'
import * as z from 'zod'
import { useAddArticleMutation } from '@/api/hooks/useAddArticleMutation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileDragAndDrop } from '@/components/ui/file-dnd'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import 'react-quill/dist/quill.snow.css'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  title: z.string(),
  author: z.string(),
  coAuthors: z.string(),
  discipline: z.string(),
  shortDesc: z.string(),
})
type FormSchema = z.infer<typeof formSchema>

export const ArticleForm = () => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

  const [articleUid, setArticleUid] = useState(uuid())
  const [noDataArticleUid, setNoDataArticleUid] = useState(uuid())
  const [imageUid, setImageUid] = useState(uuid())

  const [quillValue, setQuillValue] = useState('')

  const { toast } = useToast()
  const { mutate, isSuccess, isPending } = useAddArticleMutation(
    () =>
      toast({
        variant: 'destructive',
        duration: 5000,
        title: 'Ups! Coś poszło nie tak',
        description:
          'Sprawdź poprawność danych i spróbuj jeszcze raz. Jesli problem bedzie się powtarzał, skontaktuj się z nami',
      }),
    () =>
      toast({
        variant: 'success',
        duration: 5000,
        title: 'Konto utworzone',
        description: 'Pracę umieszczono w systemie poprawnie',
      })
  )

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      coAuthors: '',
      discipline: '',
      shortDesc: '',
    },
  })

  const onSubmit = (values: FormSchema) => {
    if (articleUid !== undefined || noDataArticleUid !== undefined || imageUid !== undefined) {
      mutate({
        ...values,
        abstract: quillValue,
        articleUrl: `articles/${articleUid}`,
        articleNoPersonalUrl: `no-data-articles/${noDataArticleUid}`,
        imageUrl: `article-images/${imageUid}`,
      })
    } else {
      toast({
        variant: 'destructive',
        duration: 5000,
        title: 'Ups! Coś poszło nie tak',
        description:
          'Upewnij się, że umieściłeś wszystkie pliki i spróbuj jeszcze raz. Jesli problem bedzie się powtarzał, skontaktuj się z nami',
      })
    }
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
                  name='author'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Autorzy</FormLabel>
                      <FormControl>
                        <Input placeholder='Podaj głównego autora' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='coAuthors'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Współautorzy</FormLabel>
                      <FormControl>
                        <Input placeholder='Podaj współautorów pracy' {...field} />
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
                  name='shortDesc'
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
                    <FileDragAndDrop folderName='articles' fileName={articleUid} setUid={setArticleUid} />
                  </div>
                  <div className='mt-3 flex flex-col gap-1'>
                    <div>Praca naukowa bez danych osobowych</div>
                    <FileDragAndDrop
                      folderName='no-data-articles'
                      fileName={noDataArticleUid}
                      setUid={setNoDataArticleUid}
                    />
                  </div>
                  <div className='mt-3 flex flex-col gap-1'>
                    <div>Grafika</div>
                    <FileDragAndDrop folderName='article-images' fileName={imageUid} setUid={setImageUid} />
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
          <Button disabled={isSuccess} type='submit'>
            {!isPending ? 'Dodaj pracę do systemu' : <Loader2 className='animate-spin' />}
          </Button>
        </div>
      </form>
    </Form>
  )
}
