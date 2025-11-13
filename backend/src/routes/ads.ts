import { Router } from 'express'
import { createAd, listAds } from '../controllers/adsController'

const router = Router()

router.post('/', createAd)
router.get('/', listAds)

export default router
