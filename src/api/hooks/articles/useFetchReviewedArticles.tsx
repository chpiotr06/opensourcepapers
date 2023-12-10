import { useQuery, type QueryClient } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { ArticleShortResponse } from '@/api/types/api.Articles'

export const fetchReviewedArticles = async (): Promise<ArticleShortResponse> => {
  try {
    const url = new URL(`${API}${endpoints.articles.getReviewedArticle}`)

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
  await queryClient.prefetchQuery({ queryKey: ['articles'], queryFn: () => fetchReviewedArticles() })
}

export const useFetchReviewedArticles = () => {
  const { data, isError, error, refetch } = useQuery<ArticleShortResponse, Error>({
    queryKey: ['articles'],
    queryFn: () => fetchReviewedArticles(),
    refetchOnWindowFocus: false,
    staleTime: 1_200_000,
  })
  return {
    data,
    isError,
    error,
    refetch,
  }
}
