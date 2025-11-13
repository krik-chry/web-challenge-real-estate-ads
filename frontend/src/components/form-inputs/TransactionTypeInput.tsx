import type { UseFormRegister, FieldError } from 'react-hook-form'
import { FaCircleCheck } from 'react-icons/fa6'
import type { FormValues } from '../../schemas/adFormSchema'
import { TRANSACTION_TYPES } from '../../constants/formOptions'
import FormSectionTitle from '../FormSectionTitle'

interface TransactionTypeInputProps {
  register: UseFormRegister<FormValues>
  selectedValue: string
  error?: FieldError
}

export default function TransactionTypeInput({
  register,
  selectedValue,
  error,
}: TransactionTypeInputProps) {
  return (
    <>
      <FormSectionTitle title="Είδος συναλλαγής" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TRANSACTION_TYPES.map((type) => (
          <label
            key={type.value}
            className={`
              relative flex items-center justify-center p-6 
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
              {...register('transactionType')}
              value={type.value}
              className="absolute opacity-0"
            />
            <span className="font-medium text-center">{type.label}</span>
            {selectedValue === type.value && (
              <div className="absolute top-2 right-2">
                <FaCircleCheck className="w-5 h-5 text-primary" />
              </div>
            )}
          </label>
        ))}
      </div>
      {error && <div className="text-error text-sm">{error.message as string}</div>}
    </>
  )
}
