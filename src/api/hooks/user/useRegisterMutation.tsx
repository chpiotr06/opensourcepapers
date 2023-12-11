import { useMutation } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { UserData } from '@/api/types/api.Register'

export const fetchRegisterMutation = async (data: UserData) => {
  try {
    const url = new URL(`${API}${endpoints.user.register}`)

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

export const useRegisterMutation = (onError: () => void, onSuccess: () => void) => {
  const { data, mutate, isError, isSuccess, isPending } = useMutation<void, Error, UserData, unknown>({
    mutationFn: (userData) => fetchRegisterMutation(userData),
    onError,
    onSuccess,
  })
  return { data, mutate, isError, isSuccess, isPending }
}
