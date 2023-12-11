import { useQuery, type QueryClient } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { ArticleShortResponse } from '@/api/types/api.Articles'

export const fetchArticlesToReview = async (): Promise<ArticleShortResponse> => {
  try {
    const url = new URL(`${API}${endpoints.articles.getArticlesToReview}`)

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

export const prefetchArticlesToReview = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({ queryKey: ['articlesToReview'], queryFn: () => fetchArticlesToReview() })
}

export const useFetchArticlesToReview = () => {
  const { data, isError, error, refetch } = useQuery<ArticleShortResponse, Error>({
    queryKey: ['articlesToReview'],
    queryFn: () => fetchArticlesToReview(),
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
