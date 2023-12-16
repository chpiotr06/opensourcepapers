import { useMutation } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { ReviewToAdd } from '@/api/types/api.AddReview'

export const fetchAddReviewMutation = async (data: ReviewToAdd) => {
  try {
    const url = new URL(`${API}${endpoints.articles.addReview}`)

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

export const useAddReviewMutation = (onError: () => void, onSuccess: () => void) => {
  const { data, mutate, isError, isSuccess, isPending } = useMutation<void, Error, ReviewToAdd, unknown>({
    mutationFn: (userData) => fetchAddReviewMutation(userData),
    onError,
    onSuccess,
  })
  return { data, mutate, isError, isSuccess, isPending }
}
