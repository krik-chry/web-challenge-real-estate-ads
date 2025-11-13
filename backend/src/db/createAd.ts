import db from './database'
import { AdFormData } from '../../../shared/adSchema'

export function insertAd(data: AdFormData, imageUrl: string | null = null) {
  const stmt = db.prepare(`
    INSERT INTO ads (
      propertyType, apartmentType, transactionType, price,
      totalSize, energyClass, floor, bedrooms, bathrooms, wc,
      condition, placeId, mainText, secondaryText, description, imageUrl
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const result = stmt.run(
    data.propertyType,
    data.apartmentType ?? null,
    data.transactionType,
    data.price,
    data.totalSize,
    data.energyClass ?? null,
    data.floor ?? null,
    data.bedrooms ?? null,
    data.bathrooms ?? null,
    data.wc ?? null,
    data.condition ?? null,
    data.placeId,
    data.mainText,
    data.secondaryText ?? null,
    data.description ?? null,
    imageUrl
  )
  return db.prepare('SELECT * FROM ads WHERE id = ?').get(result.lastInsertRowid)
}
