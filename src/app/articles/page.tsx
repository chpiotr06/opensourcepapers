'use client'
import { useFetchReviewedArticles } from '@/api/hooks/articles/useFetchReviewedArticles'
import { ArticleThumbnail } from '@/components/features/article-thumbnail/article-thumbnail'

export default function ArticlesPage() {
  const { data } = useFetchReviewedArticles()
  if (!data) return <div>Error</div>
  return (
    <div className='grid grid-cols-4 gap-8 pt-14'>
      {data.data.map((article) => (
        <ArticleThumbnail key={article.id} article={article} />
      ))}
    </div>
  )
}
