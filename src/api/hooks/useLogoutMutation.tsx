import { useMutation } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'

export const fetchLogoutMutation = async () => {
  try {
    const url = new URL(`${API}${endpoints.user.logout}`)

    const response = await fetch(url.toString(), {
      method: 'POST',
    })

    if (!response.ok) {
      const body = await response.json()
      throw new Error(body.error.message)
    }
  } catch (error) {
    throw error
  }
}

export const useLogoutMutation = (onError?: () => void, onSuccess?: () => void) => {
  const { data, mutate, isError, isSuccess, isPending, error } = useMutation({
    mutationFn: () => fetchLogoutMutation(),
    onError,
    onSuccess,
  })
  return { data, mutate, isError, isSuccess, isPending, error }
}
