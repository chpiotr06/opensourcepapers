import { useMutation } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { ScientificUserData } from '@/api/types/api.ScientificRegister'

export const fetchScientificRegisterMutation = async (data: ScientificUserData) => {
  try {
    const url = new URL(`${API}${endpoints.user.scientificRegister}`)

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

export const useScientificRegisterMutation = (onError: () => void, onSuccess: () => void) => {
  const { data, mutate, isError, isSuccess, isPending } = useMutation<void, Error, ScientificUserData, unknown>({
    mutationFn: (userData) => fetchScientificRegisterMutation(userData),
    onError,
    onSuccess,
  })
  return { data, mutate, isError, isSuccess, isPending }
}
