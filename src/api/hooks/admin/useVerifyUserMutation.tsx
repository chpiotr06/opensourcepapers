import { useMutation } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'

export const fetchVerifyUserMutation = async (id: string) => {
  try {
    const url = new URL(`${API}${endpoints.user.verifyUser(id)}`)

    const response = await fetch(url.toString(), {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}, Status text: ${response.statusText}`)
    }
  } catch (error) {
    throw error
  }
}

export const useVerifyUserMutation = (onError: () => void, onSuccess: () => void) => {
  const { data, mutate, isError, isSuccess, isPending } = useMutation<void, Error, string, unknown>({
    mutationFn: (userData) => fetchVerifyUserMutation(userData),
    onError,
    onSuccess,
  })
  return { data, mutate, isError, isSuccess, isPending }
}
