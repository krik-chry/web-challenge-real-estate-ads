import axios from 'axios'

export async function fetchAutocompleteFromRemote(baseUrl: string, input: string) {
  try {
    const res = await axios.get(baseUrl, { params: { input }, timeout: 5000 })
    return res.data
  } catch (err) {
    throw err
  }
}
