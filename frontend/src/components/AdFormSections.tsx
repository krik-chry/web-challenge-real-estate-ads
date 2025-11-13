import { motion, AnimatePresence } from 'motion/react'
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormClearErrors,
} from 'react-hook-form'
import type { FormValues } from '../schemas/adFormSchema'
import type { AutocompleteResult } from '../types'

import PropertyTypeInput from './form-inputs/PropertyTypeInput'
import ApartmentTypeInput from './form-inputs/ApartmentTypeInput'
import TransactionTypeInput from './form-inputs/TransactionTypeInput'
import PriceInput from './form-inputs/PriceInput'
import PropertyDetailsInputs from './form-inputs/PropertyDetailsInputs'
import LocationInput from './form-inputs/LocationInput'
import DescriptionInput from './form-inputs/DescriptionInput'

type Props = {
  register: UseFormRegister<FormValues>
  setValue: UseFormSetValue<FormValues>
  clearErrors: UseFormClearErrors<FormValues>
  errors: FieldErrors<FormValues>
  selectedPropertyType: string
  selectedApartmentType?: string | null
  selectedTransactionType: string
  energyClass?: string | null
  floor?: string | null
  bedrooms?: string | null
  bathrooms?: string | null
  wcValue?: string | null
  condition?: string | null
  areaInput: string
  setAreaInput: (value: string) => void
  isLocationSelected: boolean
  onSelectArea: (item: AutocompleteResult) => void
  onClearLocation: () => void
}

export default function AdFormSections({
  register,
  setValue,
  clearErrors,
  errors,
  selectedPropertyType,
  selectedApartmentType,
  selectedTransactionType,
  energyClass,
  floor,
  bedrooms,
  bathrooms,
  wcValue,
  condition,
  areaInput,
  setAreaInput,
  isLocationSelected,
  onSelectArea,
  onClearLocation,
}: Props) {
  return (
    <>
      {/* Property Type Section */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, layout: { duration: 0.3 } }}
        className="card bg-base-100 rounded-none sm:rounded-2xl border border-base-300"
      >
        <PropertyTypeInput
          register={register}
          selectedValue={selectedPropertyType}
          error={errors.propertyType}
        />
      </motion.div>

      {/* Apartment Subcategory Selection - Only shown when APARTMENT is selected */}
      <AnimatePresence mode="popLayout">
        {selectedPropertyType === 'APARTMENT' && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, layout: { duration: 0.3 } }}
            className="card bg-base-100 rounded-none sm:rounded-xl border border-base-300"
          >
            <ApartmentTypeInput
              register={register}
              selectedValue={selectedApartmentType}
              error={errors.apartmentType}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show rest of form only when property type is selected */}
      <AnimatePresence mode="popLayout">
        {selectedPropertyType && (
          <div className="space-y-3">
            {/* Transaction Type and Price Section */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1, layout: { duration: 0.3 } }}
              className="card bg-base-100 rounded-none sm:rounded-xl border border-base-300"
            >
              <div className="card-body">
                <TransactionTypeInput
                  register={register}
                  selectedValue={selectedTransactionType}
                  error={errors.transactionType}
                />

                <PriceInput
                  register={register}
                  transactionType={selectedTransactionType}
                  priceError={errors.price}
                />
              </div>
            </motion.div>

            {/* Property Details Section */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.2, layout: { duration: 0.3 } }}
              className="card bg-base-100 rounded-none sm:rounded-xl border border-base-300"
            >
              <PropertyDetailsInputs
                selectedPropertyType={selectedPropertyType}
                register={register}
                setValue={setValue}
                energyClass={energyClass}
                floor={floor}
                bedrooms={bedrooms}
                bathrooms={bathrooms}
                wc={wcValue}
                condition={condition}
                totalSizeError={errors.totalSize}
              />
            </motion.div>

            {/* Location Section */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.3, layout: { duration: 0.3 } }}
              className="card bg-base-100 rounded-none sm:rounded-xl border border-base-300"
            >
              <LocationInput
                setValue={setValue}
                clearErrors={clearErrors}
                areaInput={areaInput}
                setAreaInput={setAreaInput}
                onSelectArea={onSelectArea}
                isSelected={isLocationSelected}
                onClear={onClearLocation}
                error={errors.placeId}
              />
            </motion.div>

            {/* Description Section */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.4, layout: { duration: 0.3 } }}
              className="card bg-base-100 rounded-none sm:rounded-xl border border-base-300"
            >
              <DescriptionInput register={register} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
