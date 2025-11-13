import NodeCache from 'node-cache'

export const acCache = new NodeCache({ stdTTL: 300, checkperiod: 60 })
export const inflight = new Map<string, Promise<any>>()
