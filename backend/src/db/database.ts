import Database from 'better-sqlite3'
import path from 'path'
import { mockAds } from './mockData'

const dbPath = path.resolve(__dirname, '../../ads.db')
const db = new Database(dbPath)

// Create table matching your schema
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    propertyType TEXT NOT NULL,
    apartmentType TEXT,
    transactionType TEXT NOT NULL,
    price REAL NOT NULL,
    totalSize REAL NOT NULL,
    energyClass TEXT,
    floor TEXT,
    bedrooms TEXT,
    bathrooms TEXT,
    wc TEXT,
    condition TEXT,
    placeId TEXT NOT NULL,
    mainText TEXT NOT NULL,
    secondaryText TEXT,
    description TEXT,
    createdAt TEXT DEFAULT (datetime('now'))
  )
`
).run()

// Check if table is empty and add mock data
const count = db.prepare('SELECT COUNT(*) as count FROM ads').get() as { count: number }

if (count.count === 0) {
  console.log('Inserting mock data...')

  const insert = db.prepare(`
    INSERT INTO ads (
      propertyType, apartmentType, transactionType, price, totalSize,
      energyClass, floor, bedrooms, bathrooms, wc, condition,
      placeId, mainText, secondaryText, description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  mockAds.forEach((ad) => {
    insert.run(...ad)
  })

  console.log('Mock data inserted successfully!')
}

export default db
