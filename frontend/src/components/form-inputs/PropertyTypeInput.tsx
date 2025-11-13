import type { UseFormRegister, FieldError } from 'react-hook-form'
import { FaCircleCheck } from 'react-icons/fa6'
import type { FormValues } from '../../schemas/adFormSchema'
import { PROPERTY_TYPES } from '../../constants/formOptions'
import { PropertyTypeIcons } from '../../constants/propertyIcons'
import FormSectionTitle from '../FormSectionTitle'

interface PropertyTypeInputProps {
  register: UseFormRegister<FormValues>
  selectedValue: string
  error?: FieldError
}

export default function PropertyTypeInput({
  register,
  selectedValue,
  error,
}: PropertyTypeInputProps) {
  return (
    <div className="card-body">
      <FormSectionTitle title="Τύπος ακινήτου" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROPERTY_TYPES.map((type) => (
          <label
            key={type.value}
            className={`
              relative flex flex-col gap-2 items-center justify-center p-6 
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
              {...register('propertyType')}
              value={type.value}
              className="absolute opacity-0"
            />
            {PropertyTypeIcons[type.value as keyof typeof PropertyTypeIcons]}
            <span className="font-medium text-center">{type.label}</span>
            {selectedValue === type.value && (
              <div className="absolute top-2 right-2">
                <FaCircleCheck className="w-6 h-6 text-primary" />
              </div>
            )}
          </label>
        ))}
      </div>
      {error && <div className="text-error text-sm">{error.message as string}</div>}
    </div>
  )
}
