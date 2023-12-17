import { useQuery, type QueryClient } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { ArticleShortResponse } from '@/api/types/api.Articles'

export const fetchArticlesToReview = async (filtersQuery?: string): Promise<ArticleShortResponse> => {
  try {
    const url = new URL(`${API}${endpoints.articles.getArticlesToReview}${filtersQuery ? `?${filtersQuery}` : ''}`)

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

export const useFetchArticlesToReview = (filtersQuery?: string, isDisabled?: boolean) => {
  const { data, isError, error, refetch } = useQuery<ArticleShortResponse, Error>({
    queryKey: ['articlesToReview', filtersQuery],
    queryFn: () => fetchArticlesToReview(filtersQuery),
    refetchOnWindowFocus: false,
    staleTime: 300_000,
    enabled: !isDisabled,
  })
  return {
    data,
    isError,
    error,
    refetch,
  }
}
