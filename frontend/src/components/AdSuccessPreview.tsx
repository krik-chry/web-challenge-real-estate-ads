import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  LuBath,
  LuBedDouble,
  LuCheck,
  LuHouse,
  LuPencilRuler,
  LuPlug,
  LuToilet,
} from 'react-icons/lu'
import { TbStairs, TbRuler } from 'react-icons/tb'
import {
  PROPERTY_TYPES,
  APARTMENT_TYPES,
  TRANSACTION_TYPES,
  FLOOR_OPTIONS,
  DETACHED_HOUSE_FLOOR_OPTIONS,
  ENERGY_CLASSES,
  CONDITION_OPTIONS,
  PLOT_CONDITION_OPTIONS,
  ROOM_NUMBER_OPTIONS,
} from '../constants/formOptions'
import type { AdWithMetadata } from '../../../shared/adSchema'

interface AdSuccessPreviewProps {
  data: AdWithMetadata
}

export default function AdSuccessPreview({ data }: AdSuccessPreviewProps) {
  const isPlot = data.propertyType === 'PLOT'
  const isDetachedHouse = data.propertyType === 'DETACHED_HOUSE'
  const isApartment = data.propertyType === 'APARTMENT'

  const propertyTypeLabel =
    PROPERTY_TYPES.find((type) => type.value === data.propertyType)?.label || data.propertyType

  const apartmentTypeLabel = data.apartmentType
    ? APARTMENT_TYPES.find((type) => type.value === data.apartmentType)?.label
    : null

  const transactionTypeLabel =
    TRANSACTION_TYPES.find((type) => type.value === data.transactionType)?.label ||
    data.transactionType

  const floorLabel = data.floor
    ? isApartment
      ? FLOOR_OPTIONS.find((option) => option.value === data.floor)?.label
      : isDetachedHouse
      ? DETACHED_HOUSE_FLOOR_OPTIONS.find((option) => option.value === data.floor)?.label
      : null
    : null

  const bedroomsLabel = data.bedrooms
    ? ROOM_NUMBER_OPTIONS.find((opt) => opt.value === data.bedrooms)?.label
    : null

  const bathroomsLabel = data.bathrooms
    ? ROOM_NUMBER_OPTIONS.find((opt) => opt.value === data.bathrooms)?.label
    : null

  const wcLabel = data.wc ? ROOM_NUMBER_OPTIONS.find((opt) => opt.value === data.wc)?.label : null

  const energyClassLabel = data.energyClass
    ? ENERGY_CLASSES.find((option) => option.value === data.energyClass)?.label
    : null

  const conditionLabel = data.condition
    ? isPlot
      ? PLOT_CONDITION_OPTIONS.find((option) => option.value === data.condition)?.label
      : CONDITION_OPTIONS.find((option) => option.value === data.condition)?.label
    : null

  const imageUrl = data.imageUrl
    ? data.imageUrl.startsWith('http')
      ? data.imageUrl
      : `http://localhost:4000${data.imageUrl}`
    : null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 px-4 md:px-2"
    >
      <div className="card bg-base-100 border border-success">
        <div className="card-body p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-success/20 p-1 sm:p-3">
              <LuCheck className="w-6 h-6 text-success" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">Επιτυχής Δημοσίευση!</h2>
              <p className="text-sm text-base-content/70">
                Η αγγελία σας δημιουργήθηκε με επιτυχία
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 dark:border border-base-300 shadow-xl dark:shadow-none overflow-hidden">
        <figure className="relative h-56 bg-linear-to-br from-primary/20 to-primary/5">
          {imageUrl ? (
            <img src={imageUrl} alt={propertyTypeLabel} className="w-full h-full object-cover" />
          ) : (
            <img
              src={isPlot ? '/land-placeholder.svg' : '/house-placeholder.svg'}
              alt="No image available"
              className="w-full h-full object-contain"
            />
          )}
          <div className="absolute top-3 left-3">
            <div className="badge rounded-full font-bold badge-primary">{transactionTypeLabel}</div>
          </div>
        </figure>
        <div className="card-body gap-4 p-4">
          <div className="flex flex-col sm:flex-row flex-wrap justify-between sm:items-start gap-4">
            <div className="flex-1">
              <h3 className="card-title">
                {propertyTypeLabel} {data.totalSize} τ.μ.
              </h3>
              {data.placeId && (
                <p className="sm:text-nowrap text-base-content/70">
                  {data.mainText}
                  {data.secondaryText && <span>, {data.secondaryText}</span>}
                </p>
              )}
            </div>
            <div className="w-fit text-xl rounded-lg font-bold">
              €{typeof data.price === 'number' ? data.price.toLocaleString('el-GR') : data.price}
              {data.transactionType === 'RENT' ? ' / μήνα' : ''}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm pt-4 border-t border-base-300">
            {isApartment && (
              <div className="flex items-center gap-2">
                <LuHouse className="w-5 h-5 text-base-content/70" />
                <div>
                  <p className="text-xs text-base-content/70">Τύπος</p>
                  <p className="font-medium">{apartmentTypeLabel || '-'}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <TbRuler className="w-5 h-5 text-base-content/70" />
              <div>
                <p className="text-xs text-base-content/70">Εμβαδόν</p>
                <p className="font-medium">
                  {typeof data.totalSize === 'number'
                    ? `${data.totalSize.toLocaleString('el-GR')} τ.μ.`
                    : `${data.totalSize} τ.μ.`}
                </p>
              </div>
            </div>

            {!isPlot && (
              <div className="flex items-center gap-2">
                <TbStairs className="w-5 h-5 text-base-content/70" />
                <div>
                  <p className="text-xs text-base-content/70">
                    {isDetachedHouse ? 'Αριθμός ορόφων' : 'Όροφος'}
                  </p>
                  <p className="font-medium">{floorLabel || '-'}</p>
                </div>
              </div>
            )}

            {!isPlot && (
              <div className="flex items-center gap-2">
                <LuBedDouble className="w-5 h-5 text-base-content/70" />
                <div>
                  <p className="text-xs text-base-content/70">Υπνοδωμάτια</p>
                  <p className="font-medium">{bedroomsLabel || '-'}</p>
                </div>
              </div>
            )}

            {!isPlot && (
              <div className="flex items-center gap-2">
                <LuBath className="w-5 h-5 text-base-content/70" />
                <div>
                  <p className="text-xs text-base-content/70">Μπάνια</p>
                  <p className="font-medium">{bathroomsLabel || '-'}</p>
                </div>
              </div>
            )}

            {!isPlot && (
              <div className="flex items-center gap-2">
                <LuToilet className="w-5 h-5 text-base-content/70" />
                <div>
                  <p className="text-xs text-base-content/70">WC</p>
                  <p className="font-medium">{wcLabel || '-'}</p>
                </div>
              </div>
            )}

            {!isPlot && (
              <div className="flex items-center gap-2">
                <LuPlug className="w-5 h-5 text-base-content/70" />
                <div>
                  <p className="text-xs text-base-content/70">Ενεργειακή κλάση</p>
                  <p className="font-medium">{energyClassLabel || '-'}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <LuPencilRuler className="w-5 h-5 text-base-content/70" />
              <div>
                <p className="text-xs text-base-content/70">
                  {isPlot ? 'Σχέδιο πόλης' : 'Κατάσταση'}
                </p>
                <p className="font-medium">{conditionLabel || '-'}</p>
              </div>
            </div>
          </div>

          {data.description && (
            <div className="pt-4 border-t border-base-300">
              <p className="text-xs text-base-content/70">Περιγραφή</p>
              <p className="mt-2">{data.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <Link to="/" className="btn btn-outline btn-wide hover:border-neutral-300">
          Αρχική σελίδα
        </Link>
        <Link to="/ads" className="btn btn-primary btn-wide">
          Προβολή όλων των αγγελιών
        </Link>
      </div>
    </motion.div>
  )
}
