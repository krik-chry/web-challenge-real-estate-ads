import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import type { AutocompleteResult } from '../types'

async function fetchAutocomplete(input: string) {
  try {
    const res = await api.get<AutocompleteResult[]>('/api/autocomplete', {
      params: { input },
    })
    return res.data
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'Κάτι πήγε στραβά. Δοκιμάστε ξανά.')
  }
}

export function useAutocomplete(input: string) {
  const [debounced, setDebounced] = useState(input)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(input.trim()), 300)
    return () => clearTimeout(timer)
  }, [input])

  const enabled = debounced.length >= 3

  return useQuery({
    queryKey: ['autocomplete', debounced],
    queryFn: () => fetchAutocomplete(debounced),
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  })
}
