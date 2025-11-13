import { motion } from 'motion/react'
import { LuBath, LuBedDouble, LuPencilRuler, LuToilet } from 'react-icons/lu'
import { TbStairs } from 'react-icons/tb'
import type { AdWithMetadata } from '../../../shared/adSchema'
import {
  PROPERTY_TYPES,
  FLOOR_OPTIONS,
  TRANSACTION_TYPES,
  PLOT_CONDITION_OPTIONS,
} from '../constants/formOptions'

interface AdCardProps {
  ad: AdWithMetadata
}

export default function AdCard({ ad }: AdCardProps) {
  const isPlot = ad.propertyType === 'PLOT'
  const isApartment = ad.propertyType === 'APARTMENT'
  const propertyTypeLabel =
    PROPERTY_TYPES.find((type) => type.value === ad.propertyType)?.label || ad.propertyType
  const transactionTypeLabel =
    TRANSACTION_TYPES.find((type) => type.value === ad.transactionType)?.label || ad.transactionType
  const floorOption = ad.floor ? FLOOR_OPTIONS.find((option) => option.value === ad.floor) : null
  const floorLabel = floorOption
    ? 'labelShort' in floorOption
      ? floorOption.labelShort
      : floorOption.label
    : null
  const plotConditionLabel =
    ad.condition && isPlot
      ? PLOT_CONDITION_OPTIONS.find((option) => option.value === ad.condition)?.label ||
        ad.condition
      : null

  const imageUrl = ad.imageUrl
    ? ad.imageUrl.startsWith('http')
      ? ad.imageUrl
      : `http://localhost:4000${ad.imageUrl}`
    : null

  return (
    <motion.div
      key={`ad-${ad.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-100 border border-base-300 hover:shadow-md dark:hover:shadow-none hover:dark:border-gray-700 cursor-pointer transition-all overflow-hidden"
    >
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

      <div className="card-body text-base-content/70 gap-4 p-4">
        <div>
          <h3 className="card-title text-base-content">
            {propertyTypeLabel} {ad.totalSize} τ.μ.
          </h3>
          <p className="text-sm">
            {ad.mainText}, {ad.secondaryText}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          {ad.floor && isApartment && (
            <span className="flex items-center gap-1">
              <TbStairs className="w-5 h-5" />
              <span className="font-bold">{floorLabel}</span>
            </span>
          )}
          {ad.bedrooms && (
            <span className="flex items-center gap-1">
              <LuBedDouble className="w-5 h-5" />
              <span className="font-bold">
                {ad.bedrooms}
                <span className="font-normal ml-px">υ/δ</span>
              </span>
            </span>
          )}
          {ad.bathrooms && (
            <span className="flex items-center gap-1">
              <LuBath className="w-5 h-5" />
              <span className="font-bold">
                {ad.bathrooms}
                <span className="font-normal ml-px">μπ</span>
              </span>
            </span>
          )}
          {ad.wc && (
            <span className="flex items-center gap-1">
              <LuToilet className="w-5 h-5" />
              <span className="font-bold">
                {ad.wc}
                <span className="font-normal ml-px">wc</span>
              </span>
            </span>
          )}

          {plotConditionLabel && (
            <span className="flex items-center gap-1">
              <LuPencilRuler className="w-5 h-5" />
              {plotConditionLabel}
            </span>
          )}
        </div>

        <div className="text-xl font-bold text-base-content self-end mt-auto">
          €{ad.price.toLocaleString('el-GR')}
          {ad.transactionType === 'RENT' && <span className="text-sm">/μήνα</span>}
        </div>
      </div>
    </motion.div>
  )
}
