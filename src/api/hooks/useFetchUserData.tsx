import { useQuery, type QueryClient } from '@tanstack/react-query'
import { API, endpoints } from '@/api/endpoints'
import type { UserDetails } from '@/api/types/api.UserDetails'

export const fetchUsersDetails = async (): Promise<UserDetails> => {
  try {
    const url = new URL(`${API}${endpoints.user.userDetails}`)

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

export const prefetchUsersDetails = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({ queryKey: ['usersDetails'], queryFn: () => fetchUsersDetails() })
}

export const useFetchUsersDetails = () => {
  const { data, isError, error, refetch } = useQuery<UserDetails, Error>({
    queryKey: ['usersDetails'],
    queryFn: () => fetchUsersDetails(),
    refetchOnWindowFocus: false,
    staleTime: 1_200_000,
  })
  return {
    data,
    isError,
    error,
    refetch,
  }
}
