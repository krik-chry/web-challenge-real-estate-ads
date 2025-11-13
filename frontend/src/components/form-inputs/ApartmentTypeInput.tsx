import type { UseFormRegister, FieldError } from 'react-hook-form'
import { FaCircleCheck } from 'react-icons/fa6'
import type { FormValues } from '../../schemas/adFormSchema'
import { APARTMENT_TYPES } from '../../constants/formOptions'
import FormSectionTitle from '../FormSectionTitle'

interface ApartmentTypeInputProps {
  register: UseFormRegister<FormValues>
  selectedValue?: string | null
  error?: FieldError
}

export default function ApartmentTypeInput({
  register,
  selectedValue,
  error,
}: ApartmentTypeInputProps) {
  return (
    <div className="card-body">
      <FormSectionTitle title="Τύπος Διαμερίσματος" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {APARTMENT_TYPES.map((type) => (
          <label
            key={type.value}
            className={`
              relative flex flex-col items-center justify-center p-4 
              border-2 rounded-lg cursor-pointer transition-all
              ${
                selectedValue === type.value
                  ? 'border-primary bg-primary/10'
                  : 'border-base-300 hover:border-primary/50 hover:bg-base-100'
              }
            `}
          >
            <input
              type="radio"
              {...register('apartmentType')}
              value={type.value || ''}
              className="absolute opacity-0"
            />
            <span className="text-sm font-medium text-center">{type.label}</span>
            {selectedValue === type.value && (
              <div className="absolute top-2 right-2">
                <FaCircleCheck className="w-5 h-5 text-primary" />
              </div>
            )}
          </label>
        ))}
      </div>
      {error && <div className="text-error text-sm">{error.message as string}</div>}
    </div>
  )
}
