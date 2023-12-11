'use client'
import { useFetchArticlesToReview } from '@/api/hooks/articles/useFetchArticlesToReview'
import { ArticleThumbnail } from '@/components/features/article-thumbnail/article-thumbnail'

export function ArticlesToReviewList() {
  const { data } = useFetchArticlesToReview()
  if (!data) return <div>Error</div>
  return (
    <div className='grid grid-cols-4 gap-8 pt-14'>
      {data.data.map((article) => (
        <ArticleThumbnail key={article.id} article={article} />
      ))}
    </div>
  )
}
