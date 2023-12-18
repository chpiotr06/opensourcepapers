import { useQuery, type QueryClient } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { ArticleShortResponse } from '@/api/types/api.Articles'

export const fetchReviewedArticles = async (filtersQuery?: string): Promise<ArticleShortResponse> => {
  try {
    const url = new URL(`${API}${endpoints.articles.getReviewedArticle}${filtersQuery ? `?${filtersQuery}` : ''}`)

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

export const prefetchReviewedArticles = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({ queryKey: ['reviewedArticles'], queryFn: () => fetchReviewedArticles() })
}

export const useFetchReviewedArticles = (filtersQuery?: string) => {
  const { data, isError, error, refetch, isPending } = useQuery<ArticleShortResponse, Error>({
    queryKey: ['reviewedArticles', filtersQuery],
    queryFn: () => fetchReviewedArticles(filtersQuery),
    refetchOnWindowFocus: false,
    staleTime: 300_000,
  })
  return {
    data,
    isError,
    error,
    refetch,
    isPending,
  }
}
