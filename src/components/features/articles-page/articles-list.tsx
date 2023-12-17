import { useSearchParams } from 'next/navigation'
import { useFetchReviewedArticles } from '@/api/hooks/articles/useFetchReviewedArticles'
import { ArticleThumbnail } from '@/components/features/article-thumbnail/article-thumbnail'

export const ArticlesList = () => {
  const searchParams = useSearchParams()
  const { data } = useFetchReviewedArticles(searchParams.toString())
  if (!data) return <div>Error</div>

  return (
    <div className='flex h-fit flex-wrap gap-8'>
      {data.data.map((article) => (
        <ArticleThumbnail key={article.id} article={article} />
      ))}
    </div>
  )
}
