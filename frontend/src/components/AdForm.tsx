import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'motion/react'

import { adFormSchema, type FormValues } from '../schemas/adFormSchema'
import { api } from '../services/api'
import { useLocationSelection } from '../hooks/useLocationSelection'
import { showToast } from '../utils/toast'

import AdFormSections from './AdFormSections'
import AdSuccessPreview from './AdSuccessPreview'

export default function AdForm() {
  const queryClient = useQueryClient()
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null)

  const {
    clearErrors,
    handleSubmit,
    register,
    setError,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(adFormSchema),
    defaultValues: {
      floor: null,
      bedrooms: null,
      bathrooms: null,
      wc: null,
      condition: null,
      apartmentType: null,
      energyClass: null,
    },
  })

  const { areaInput, setAreaInput, isLocationSelected, onSelectArea, onClearLocation } =
    useLocationSelection(setValue)

  const selectedPropertyType = watch('propertyType')
  const selectedApartmentType = watch('apartmentType')
  const selectedTransactionType = watch('transactionType')
  const energyClass = watch('energyClass')
  const floor = watch('floor')
  const bedrooms = watch('bedrooms')
  const bathrooms = watch('bathrooms')
  const wcValue = watch('wc')
  const condition = watch('condition')

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await api.post('/api/ads', data)

      if (response.status === 201 && response.data.success) {
        showToast(response.data.message || 'Η αγγελία δημοσιεύτηκε επιτυχώς!', 'success')
        setSubmittedData(data)
        reset()
        onClearLocation()
        queryClient.invalidateQueries({
          queryKey: ['ads'],
        })
      }
    } catch (error) {
      const err = error as {
        response?: {
          data?: {
            success?: boolean
            error?: string
            details?: Array<{ field: string; message: string }>
          }
          status?: number
        }
        request?: unknown
        message?: string
      }

      if (err.response) {
        const { status, data } = err.response

        if (status === 400 && data?.success === false) {
          showToast(data.error || 'Μη έγκυρα δεδομένα', 'error')

          if (data.details && Array.isArray(data.details)) {
            data.details.forEach((detail) => {
              const fieldPath = detail.field as keyof FormValues
              if (fieldPath) {
                setError(fieldPath, { type: 'server', message: detail.message })
              }
            })
          }
        } else if (status === 500 && data?.success === false) {
          showToast(data.error || 'Σφάλμα κατά τη δημιουργία της αγγελίας', 'error')
        }
      }
    }
  }

  if (submittedData) {
    return <AdSuccessPreview data={submittedData} />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <AdFormSections
        register={register}
        setValue={setValue}
        clearErrors={clearErrors}
        errors={errors}
        selectedPropertyType={selectedPropertyType}
        selectedApartmentType={selectedApartmentType}
        selectedTransactionType={selectedTransactionType}
        energyClass={energyClass}
        floor={floor}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        wcValue={wcValue}
        condition={condition}
        areaInput={areaInput}
        setAreaInput={setAreaInput}
        isLocationSelected={isLocationSelected}
        onSelectArea={onSelectArea}
        onClearLocation={onClearLocation}
      />

      <AnimatePresence mode="popLayout">
        {selectedPropertyType && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.6, layout: { duration: 0.3 } }}
            className="w-full flex justify-end mt-4 px-4 mb-8"
          >
            <button type="submit" disabled={isSubmitting} className={`btn btn-primary btn-wide`}>
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Αποθήκευση...
                </>
              ) : (
                <>Αποθήκευση & συνέχεια</>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
