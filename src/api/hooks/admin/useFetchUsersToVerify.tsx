import { useQuery, type QueryClient } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { UsersToVerifyResponse } from '@/api/types/api.UsersToVerify'

export const fetchUsersToVerify = async (): Promise<UsersToVerifyResponse> => {
  try {
    const url = new URL(`${API}${endpoints.user.usersToVerify}`)

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

export const prefetchUsersToVerify = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({ queryKey: ['usersToVerify'], queryFn: () => fetchUsersToVerify() })
}

export const useFetchUsersToVerify = () => {
  const { data, isError, error, refetch, isPending } = useQuery<UsersToVerifyResponse, Error>({
    queryKey: ['usersToVerify'],
    queryFn: () => fetchUsersToVerify(),
    refetchOnWindowFocus: false,
  })
  return {
    data,
    isError,
    error,
    refetch,
    isPending,
  }
}
