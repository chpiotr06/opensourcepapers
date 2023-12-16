import { useQuery, type QueryClient } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { ArticleDetailsResponse } from '@/api/types/api.Articles'

export const fetchArticleDetails = async (articleId: string): Promise<ArticleDetailsResponse> => {
  try {
    const url = new URL(`${API}${endpoints.articles.getArticleDetails(articleId)}`)

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}, Status text: ${response.statusText}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    throw error
  }
}

export const prefetchArticleDetails = async (queryClient: QueryClient, articleId: string) => {
  await queryClient.prefetchQuery({
    queryKey: ['articleDetails', articleId],
    queryFn: () => fetchArticleDetails(articleId),
  })
}

export const useFetchArticleDetails = (articleId: string) => {
  const { data, isError, error, refetch } = useQuery<ArticleDetailsResponse, Error>({
    queryKey: ['articleDetails', articleId],
    queryFn: () => fetchArticleDetails(articleId),
    refetchOnWindowFocus: false,
    staleTime: 300_000,
  })
  return {
    data,
    isError,
    error,
    refetch,
  }
}
