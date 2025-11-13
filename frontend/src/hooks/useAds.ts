import { useSuspenseQuery } from '@tanstack/react-query'
import { api } from '../services/api'

async function fetchAds() {
  const res = await api.get('/api/ads')
  return res.data
}

export function useAdsSuspense() {
  return useSuspenseQuery({
    queryKey: ['ads'],
    queryFn: async () => {
      // Mock some delay to show loader
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return fetchAds()
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  })
}
