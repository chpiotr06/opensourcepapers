'use client'
import { useSearchParams } from 'next/navigation'
import { useFetchArticlesToReview } from '@/api/hooks/articles/useFetchArticlesToReview'
import { ArticleThumbnail } from '@/components/features/article-thumbnail/article-thumbnail'

export const ArticlesToReviewList = () => {
  const searchParams = useSearchParams()
  const { data } = useFetchArticlesToReview(searchParams.toString())
  if (!data) return <div>Error</div>

  return (
    <div className='flex h-fit flex-wrap justify-center gap-8 sm:justify-start'>
      {data.data.map((article) => (
        <ArticleThumbnail key={article.id} article={article} />
      ))}
    </div>
  )
}
