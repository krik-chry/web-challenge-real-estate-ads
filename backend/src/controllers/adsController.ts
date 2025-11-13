import { Request, Response } from 'express'
import { ZodError } from 'zod'
import db from '../db/database'
import { insertAd } from '../db/createAd'
import { adFormSchema } from '../../../shared/adSchema'

export async function createAd(req: Request, res: Response) {
  try {
    const parsedBody = {
      ...req.body,
      price: req.body.price ? Number(req.body.price) : undefined,
      totalSize: req.body.totalSize ? Number(req.body.totalSize) : undefined,
    }

    const validatedData = adFormSchema.parse(parsedBody)

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null

    const inserted = insertAd(validatedData, imageUrl)

    return res.status(201).json({
      success: true,
      message: 'Η αγγελία δημοσιεύτηκε επιτυχώς!',
      data: inserted,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Μη έγκυρα δεδομένα',
        details: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      })
    }

    res.status(500).json({
      success: false,
      error: 'Σφάλμα κατά τη δημιουργία της αγγελίας',
    })
  }
}

export function listAds(req: Request, res: Response) {
  try {
    const ads = db.prepare('SELECT * FROM ads ORDER BY id DESC').all()
    res.json(ads)
  } catch (err) {
    res.status(500).json({ error: 'Αποτυχία φόρτωσης αγγελιών.' })
  }
}
