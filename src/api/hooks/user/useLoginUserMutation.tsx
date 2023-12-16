import { useMutation } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { Credentials } from '@/api/types/api.login'

export const fetchLoginUserMutation = async (data: Credentials) => {
  try {
    const url = new URL(`${API}${endpoints.user.login}`)

    const response = await fetch(url.toString(), {
      body: JSON.stringify(data),
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

export const useLoginUserMutation = (onError?: () => void, onSuccess?: () => void) => {
  const { data, mutate, isError, isSuccess, isPending, error } = useMutation<void, Error, Credentials, unknown>({
    mutationFn: (userData) => fetchLoginUserMutation(userData),
    onError,
    onSuccess,
  })
  return { data, mutate, isError, isSuccess, isPending, error }
}
