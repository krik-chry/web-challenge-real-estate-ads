import { Request, Response } from 'express'
import { acCache, inflight } from '../cache/autocompleteCache'
import { fetchAutocompleteFromRemote } from '../utils/fetcher'

function normalize(input: string) {
  return input.trim().toLowerCase().replace(/\s+/g, ' ')
}

export async function getAutocomplete(req: Request, res: Response) {
  const inputRaw = String(req.query.input || '')
  const input = normalize(inputRaw)

  if (!input || input.length < 3) {
    return res.status(400).json({ error: 'Απαιτούνται τουλάχιστον 3 χαρακτήρες.' })
  }

  const key = `ac:${input}`

  const cached = acCache.get(key)
  if (cached) return res.json(cached)

  if (inflight.has(key)) {
    const existing = inflight.get(key)!
    const data = await existing
    return res.json(data)
  }

  const url = process.env.XE_AUTOCOMPLETE_URL!
  const promise = fetchAutocompleteFromRemote(url, input)
    .then((data) => {
      acCache.set(key, data)
      inflight.delete(key)
      return data
    })
    .catch((err) => {
      inflight.delete(key)
      throw err
    })

  inflight.set(key, promise)

  try {
    const data = await promise
    res.status(200).json(data)
  } catch (err: any) {
    return res.status(err.status || 502).json({
      error: 'Κάτι πήγε στραβά, δοκιμάστε ξανά.',
      details: err.message,
    })
  }
}
