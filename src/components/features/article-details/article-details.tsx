'use client'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import { useFetchArticleReviews } from '@/api/hooks/articles/useFetchArticleReviews'
import { useFetchArticleDetails } from '@/api/hooks/articles/useFetchArticlesDetails'
import { ArticleDetailsSkeleton } from '@/components/features/article-details/article-details-skeleton'
import { ErrorMessage } from '@/components/features/error-message/error-message'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { appRouting } from '@/lib/app-routing'

export const ArticleDetails = ({ articleId, canAddReview }: { articleId: string; canAddReview: boolean }) => {
  const { data, isError, isPending } = useFetchArticleDetails(articleId)
  const { data: reviews } = useFetchArticleReviews(articleId)

  if (isPending) return <ArticleDetailsSkeleton />

  if (!data || isError)
    return (
      <ErrorMessage
        title='Błąd sieci'
        description='Nie udało się pobrać prac naukowych. Odśwież stronę i spróbuj jeszcze raz.'
      />
    )
  if (data.data.length === 0)
    return (
      <ErrorMessage
        title='Błąd sieci'
        description='Nie udało się pobrać prac naukowych. Odśwież stronę i spróbuj jeszcze raz.'
      />
    )

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
          {article.is_reviewed && (
            <Typography variant='h2-20-500'>
              {article.co_authors
                ? `Autorzy: ${article.author} oraz ${article.co_authors}`
                : `Autor: ${article.author}`}
            </Typography>
          )}
          {!article.is_reviewed && (
            <Typography variant='h2-20-500'>Autorzy zostaną pokazani po zrecenzowaniu pracy</Typography>
          )}
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
            {article.is_reviewed ? (
              <a
                href={`${process.env.NEXT_PUBLIC_PUBLIC_BUCKET_BASE}${article.article_url}`}
                target='_blank'
                rel='noreferrer'
                className='w-fit'
              >
                <Button>Pobierz pracę naukową</Button>
              </a>
            ) : (
              <a
                href={`${process.env.NEXT_PUBLIC_PUBLIC_BUCKET_BASE}${article.article_no_personal_url}`}
                target='_blank'
                rel='noreferrer'
                className='w-fit'
              >
                <Button>Pobierz pracę naukową</Button>
              </a>
            )}
            {canAddReview && (
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
      {reviews && reviews?.data.length > 0 && (
        <Card className='mt-6 max-w-5xl'>
          <CardHeader>
            <Typography variant='h2-20-500'>Recenzje</Typography>
          </CardHeader>
          <CardContent className='flex flex-col gap-8'>
            {reviews?.data.map((review) => (
              <div key={review.id} className='flex flex-col gap-2'>
                <Typography variant='h2-20-500'>{review.title}</Typography>
                <Typography variant='h2-20-500'>
                  {review.co_authors ? `${review.author} oraz ${review.co_authors}` : review.author}
                </Typography>
                <Typography variant='h3-16-500'>{review.description}</Typography>
                <a
                  href={`${process.env.NEXT_PUBLIC_PUBLIC_BUCKET_BASE}${review.review_url}`}
                  target='_blank'
                  rel='noreferrer'
                  className='w-fit'
                >
                  <Button>Pobierz Recenzję</Button>
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
