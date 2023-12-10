import { useMutation } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { ArticleToAdd } from '@/api/types/api.AddArticle'

export const fetchAddArticleMutation = async (data: ArticleToAdd) => {
  try {
    const url = new URL(`${API}${endpoints.articles.addArticle}`)

    const response = await fetch(url.toString(), {
      body: JSON.stringify(data),
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}, Status text: ${response.statusText}`)
    }
  } catch (error) {
    throw error
  }
}

export const useAddArticleMutation = (onError: () => void, onSuccess: () => void) => {
  const { data, mutate, isError, isSuccess, isPending } = useMutation<void, Error, ArticleToAdd, unknown>({
    mutationFn: (userData) => fetchAddArticleMutation(userData),
    onError,
    onSuccess,
  })
  return { data, mutate, isError, isSuccess, isPending }
}
