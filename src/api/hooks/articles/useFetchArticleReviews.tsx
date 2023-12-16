import { useQuery, type QueryClient } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { ReviewsResponse } from '@/api/types/api.Review'

export const fetchArticleReviews = async (articleId: string): Promise<ReviewsResponse> => {
  try {
    const url = new URL(`${API}${endpoints.articles.getArticleReviews(articleId)}`)

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

export const prefetchArticleReviews = async (queryClient: QueryClient, articleId: string) => {
  await queryClient.prefetchQuery({
    queryKey: ['articleReviews', articleId],
    queryFn: () => fetchArticleReviews(articleId),
  })
}

export const useFetchArticleReviews = (articleId: string) => {
  const { data, isError, error, refetch } = useQuery<ReviewsResponse, Error>({
    queryKey: ['articleReviews', articleId],
    queryFn: () => fetchArticleReviews(articleId),
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
