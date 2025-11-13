import express from 'express'
import { getAutocomplete } from '../controllers/autocompleteController'

const router = express.Router()

router.get('/', getAutocomplete)

export default router
