'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import * as z from 'zod'
import { useAddArticleMutation } from '@/api/hooks/articles/useAddArticleMutation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileDragAndDrop } from '@/components/ui/file-dnd'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import 'react-quill/dist/quill.snow.css'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  title: z.string().min(2, { message: 'Musisz podać tytuł' }),
  author: z.string().min(2, { message: 'Musisz podać autora' }),
  coAuthors: z.string(),
  discipline: z.string().min(2, { message: 'Musisz podać dyscyplinę' }),
  shortDesc: z.string().min(2, { message: 'Musisz podać opis pracy' }),
})
type FormSchema = z.infer<typeof formSchema>

export const ArticleForm = () => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])
  const router = useRouter()

  const [articleUid] = useState(uuid())
  const [articleFile, setArticleFile] = useState<File | null>(null)

  const [noDataArticleUid] = useState(uuid())
  const [noDataArticleFile, setNoDataArticleFile] = useState<File | null>(null)

  const [imageUid] = useState(uuid())
  const [imageFile, setImageFile] = useState<File | null>(null)

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
    () => {
      toast({
        variant: 'success',
        duration: 5000,
        title: 'Dodano pracę',
        description: 'Pracę umieszczono w systemie poprawnie',
      })
      router.push('/')
    }
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
    if (imageFile !== null && articleFile !== null && noDataArticleFile !== null) {
      if (quillValue) {
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
            'Dodaj streszenie pracy i spróbuj jeszcze raz. Jesli problem bedzie się powtarzał, skontaktuj się z nami',
        })
      }
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
        <div className='flex flex-col gap-6'>
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
                      <FormLabel>Autor</FormLabel>
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
                        <Input placeholder='Podaj dyscyplinę' {...field} />
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
                        <Textarea className='min-h-[8rem]' placeholder='Podaj krótki opis pracy' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card className='h-full w-full'>
              <CardHeader>
                <CardTitle>Pliki</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                  <div className='mt-3 flex flex-col gap-1'>
                    <div>Praca naukowa</div>
                    <FileDragAndDrop
                      folderName='articles'
                      fileName={articleUid}
                      file={articleFile}
                      setFile={setArticleFile}
                    />
                  </div>
                  <div className='mt-3 flex flex-col gap-1'>
                    <div>Praca naukowa bez danych osobowych</div>
                    <FileDragAndDrop
                      folderName='no-data-articles'
                      fileName={noDataArticleUid}
                      file={noDataArticleFile}
                      setFile={setNoDataArticleFile}
                    />
                  </div>
                  <div className='mt-3 flex flex-col gap-1'>
                    <div>Grafika</div>
                    <FileDragAndDrop
                      folderName='article-images'
                      fileName={imageUid}
                      file={imageFile}
                      setFile={setImageFile}
                    />
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
          <Button disabled={isSuccess} type='submit' className='w-fit'>
            {!isPending ? 'Dodaj pracę do systemu' : <Loader2 className='animate-spin' />}
          </Button>
        </div>
      </form>
    </Form>
  )
}
