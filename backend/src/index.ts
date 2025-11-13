import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import autocompleteRoute from './routes/autocomplete'
import adsRoute from './routes/ads'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/autocomplete', autocompleteRoute)
app.use('/api/ads', adsRoute)

app.get('/', (_, res) => res.send('XE API running'))

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
