import * as z from 'zod'

const requiredErrorMessage = 'Το πεδίο είναι υποχρεωτικό'
const nonNegativeErrorMessage = 'Η τιμή δεν μπορεί να είναι αρνητική'
const integerErrorMessage = 'Μόνο ακέραιες τιμές επιτρέπονται'
const positiveErrorMessage = 'Μόνο θετικές τιμές επιτρέπονται'

const optionalString = () => z.string().optional().nullable()

export const adFormSchema = z.object({
  propertyType: z.string().min(1, 'Επιλέξτε τύπο ακινήτου'),
  apartmentType: optionalString(),
  transactionType: z.string('Επιλέξτε είδος συναλλαγής'),
  price: z
    .number(requiredErrorMessage)
    .int(integerErrorMessage)
    .nonnegative(nonNegativeErrorMessage),
  totalSize: z.number(requiredErrorMessage).int(integerErrorMessage).positive(positiveErrorMessage),
  energyClass: optionalString(),
  floor: optionalString(),
  bedrooms: optionalString(),
  bathrooms: optionalString(),
  wc: optionalString(),
  condition: optionalString(),
  placeId: z.string(requiredErrorMessage),
  mainText: z.string(requiredErrorMessage),
  secondaryText: optionalString(),
  description: optionalString(),
})

export type AdFormData = z.infer<typeof adFormSchema>

export type AdWithMetadata = AdFormData & {
  id: number
  createdAt: string
  imageUrl?: string | null
}
