'use client'

import { useFetchArticlesToReview } from '@/api/hooks/articles/useFetchArticlesToReview'
import { useFetchReviewedArticles } from '@/api/hooks/articles/useFetchReviewedArticles'
import { ErrorMessage } from '@/components/features/error-message/error-message'
import { ArticlesGrid } from '@/components/features/main-page/articles-grid'
import { ArticlesSkeletonGrid } from '@/components/features/main-page/articles-skeleton-grid'
import { Typography } from '@/components/ui/typography'

export const MainPage = ({ canSeeToReview }: { canSeeToReview: boolean }) => {
  const {
    data: newArticles,
    isPending: isNewPending,
    isError: isNewError,
  } = useFetchReviewedArticles('order_by=created_at&limit=10')

  const {
    data: sugestedArticles,
    isPending: isSuggesterPending,
    isError: isSuggestedError,
  } = useFetchReviewedArticles('order_by=times_opened&limit=10')

  const {
    data: articlesToReview,
    isPending: isToReviewPending,
    isError: isToReviewError,
  } = useFetchArticlesToReview('limit=10', !canSeeToReview)

  return (
    <div className='flex flex-col gap-6'>
      <Typography variant='h1-30-500'>Dzień dobry</Typography>
      <section>
        <Typography variant='h2-20-500' className='pb-2'>
          Nowe Artykuły
        </Typography>
        {isNewPending ? <ArticlesSkeletonGrid /> : <ArticlesGrid articles={newArticles?.data} />}
        {isNewError && (
          <ErrorMessage
            title='Błąd sieci'
            description='Nie udało się pobrać prac naukowych. Odśwież stronę i spróbuj jeszcze raz.'
          />
        )}
      </section>
      <section>
        <Typography variant='h2-20-500' className='pb-2'>
          Polecane
        </Typography>
        {isSuggesterPending ? <ArticlesSkeletonGrid /> : <ArticlesGrid articles={sugestedArticles?.data} />}
        {isSuggestedError && (
          <ErrorMessage
            title='Błąd sieci'
            description='Nie udało się pobrać prac naukowych. Odśwież stronę i spróbuj jeszcze raz.'
          />
        )}
      </section>
      {canSeeToReview && (
        <section>
          <Typography variant='h2-20-500' className='pb-2'>
            Do recenzji
          </Typography>
          {isToReviewPending ? <ArticlesSkeletonGrid /> : <ArticlesGrid articles={articlesToReview?.data} />}
          {isToReviewError && (
            <ErrorMessage
              title='Błąd sieci'
              description='Nie udało się pobrać prac naukowych. Odśwież stronę i spróbuj jeszcze raz.'
            />
          )}
        </section>
      )}
    </div>
  )
}
