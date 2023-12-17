'use client'

import { useFetchArticlesToReview } from '@/api/hooks/articles/useFetchArticlesToReview'
import { useFetchReviewedArticles } from '@/api/hooks/articles/useFetchReviewedArticles'
import { ArticlesGrid } from '@/components/features/main-page/articles-grid'
import { Typography } from '@/components/ui/typography'

export const MainPage = ({ canSeeToReview }: { canSeeToReview: boolean }) => {
  const { data: newArticles } = useFetchReviewedArticles('order_by=created_at&limit=10')
  const { data: sugestedArticles } = useFetchReviewedArticles('order_by=times_opened&limit=10')
  const { data: articlesToReview } = useFetchArticlesToReview(!canSeeToReview)

  return (
    <div className='flex flex-col gap-6'>
      <Typography variant='h1-30-500'>Dzień dobry</Typography>
      <section>
        <Typography variant='h2-20-500' className='pb-2'>
          Nowe Artykuły
        </Typography>
        <ArticlesGrid articles={newArticles?.data} />
      </section>
      <section>
        <Typography variant='h2-20-500' className='pb-2'>
          Polecane
        </Typography>
        <ArticlesGrid articles={sugestedArticles?.data} />
      </section>
      {canSeeToReview && (
        <section>
          <Typography variant='h2-20-500' className='pb-2'>
            Do recenzji
          </Typography>
          <ArticlesGrid articles={articlesToReview?.data} />
        </section>
      )}
    </div>
  )
}
