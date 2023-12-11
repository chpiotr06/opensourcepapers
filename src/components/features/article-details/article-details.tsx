'use client'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import { useFetchArticleDetails } from '@/api/hooks/articles/useFetchArticlesDetails'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { appRouting } from '@/lib/app-routing'

export const ArticleDetails = ({ articleId, canAddReview }: { articleId: string; canAddReview: boolean }) => {
  const { data } = useFetchArticleDetails(articleId)

  if (!data) return <div>Error</div>
  if (data.data.length === 0) return <div>Error</div>

  const article = data.data[0]

  return (
    <div className='flex w-full flex-col items-center'>
      <Card className='max-w-5xl'>
        <CardHeader>
          <Typography variant='h1-30-500' className='my-6'>
            {article.title}
          </Typography>
        </CardHeader>
        <CardContent className='flex flex-col gap-3'>
          <Image
            src={article.image_url}
            alt='Article cover photo'
            width={1000}
            height={1000 / 9}
            className='rounded-md'
          />
          <Typography variant='h2-20-500'>
            {article.author} oraz {article.co_authors}
          </Typography>
          <Typography variant='h2-20-500'>{article.discipline}</Typography>
          <Typography variant='h3-16-500' className='max-w-3xl'>
            {article.short_desc}
          </Typography>
          {!article.is_reviewed && (
            <Typography variant='p-14-500' className='text-destructive'>
              Praca naukowa nie ma recenzji!
            </Typography>
          )}
          <div className='flex gap-4'>
            <a
              href={`${process.env.NEXT_PUBLIC_PUBLIC_BUCKET_BASE}${article.article_url}`}
              target='_blank'
              rel='noreferrer'
              className='w-fit'
            >
              <Button>Pobierz pracę naukową</Button>
            </a>
            {canAddReview && !article.is_reviewed && (
              <Link href={appRouting.articles.addReview(article.id)}>
                <Button variant='destructive'>Dodaj Recenzję</Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className='mt-6 max-w-5xl'>
        <CardHeader>
          <Typography variant='h2-20-500'>Streszczenie</Typography>
        </CardHeader>
        <CardContent>
          <Typography variant='p-14-400' className='parsed-html'>
            {parse(article.abstract)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
