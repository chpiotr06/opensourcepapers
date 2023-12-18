import { useSearchParams } from 'next/navigation'
import { useFetchReviewedArticles } from '@/api/hooks/articles/useFetchReviewedArticles'
import { ArticleSkeleton } from '@/components/features/article-thumbnail/article-skeleton'
import { ArticleThumbnail } from '@/components/features/article-thumbnail/article-thumbnail'
import { ErrorMessage } from '@/components/features/error-message/error-message'

export const ArticlesList = () => {
  const searchParams = useSearchParams()
  const { data, isPending, isError } = useFetchReviewedArticles(searchParams.toString())

  if (isPending)
    return (
      <div className='flex h-fit flex-wrap justify-center gap-8 sm:justify-start'>
        {Array.from({ length: 25 }, (_, index) => (
          <ArticleSkeleton key={index} />
        ))}
      </div>
    )

  if (!data || isError)
    return (
      <ErrorMessage
        title='Błąd sieci'
        description='Nie udało się pobrać prac naukowych. Odśwież stronę i spróbuj jeszcze raz.'
      />
    )

  return (
    <div className='flex h-fit flex-wrap justify-center gap-8 sm:justify-start'>
      {data.data.map((article) => (
        <ArticleThumbnail key={article.id} article={article} />
      ))}
    </div>
  )
}
