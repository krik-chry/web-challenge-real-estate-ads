import { Router } from 'express'
import { createAd, listAds } from '../controllers/adsController'
import { upload } from '../utils/upload'

const router = Router()

router.post('/', upload.single('image'), createAd)
router.get('/', listAds)

export default router
