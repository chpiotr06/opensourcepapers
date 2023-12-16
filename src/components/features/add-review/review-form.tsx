'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import * as z from 'zod'
import { useAddReviewMutation } from '@/api/hooks/articles/useAddReviewMutation'
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
  description: z.string().min(2, { message: 'Musisz podać opis pracy' }),
  coAuthors: z.string(),
})
type FormSchema = z.infer<typeof formSchema>

export const ReviewForm = ({ articleId }: { articleId: string }) => {
  const router = useRouter()

  const [articleUid] = useState(uuid())
  const [articleFile, setArticleFile] = useState<File | null>(null)

  const { toast } = useToast()
  const onError = () =>
    toast({
      variant: 'destructive',
      duration: 5000,
      title: 'Ups! Coś poszło nie tak',
      description:
        'Sprawdź poprawność danych i spróbuj jeszcze raz. Jesli problem bedzie się powtarzał, skontaktuj się z nami',
    })
  const onSuccess = () => {
    toast({
      variant: 'success',
      duration: 5000,
      title: 'Dodano pracę',
      description: 'Recenzję umieszczono w systemie poprawnie',
    })
    router.push('/')
  }

  const { mutate, isSuccess, isPending } = useAddReviewMutation(onError, onSuccess)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      coAuthors: '',
      description: '',
    },
  })

  const onSubmit = (values: FormSchema) => {
    if (articleFile !== null) {
      mutate({
        ...values,
        reviewUrl: `reviews/${articleUid}`,
        articleId: articleId,
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
                  name='description'
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
                <CardTitle>Pliki</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                  <div className='mt-3 flex flex-col gap-1'>
                    <div>Praca naukowa</div>
                    <FileDragAndDrop
                      folderName='reviews'
                      fileName={articleUid}
                      file={articleFile}
                      setFile={setArticleFile}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button disabled={isSuccess} type='submit' className='w-fit'>
            {!isPending ? 'Dodaj recenzję do systemu' : <Loader2 className='animate-spin' />}
          </Button>
        </div>
      </form>
    </Form>
  )
}
