'use client'
import { useFetchArticleDetails } from '@/api/hooks/articles/useFetchArticlesDetails'

export const ArticleDetails = ({ articleId }: { articleId: string }) => {
  const { data } = useFetchArticleDetails(articleId)

  return <div>{data?.data[0].abstract}</div>
}
