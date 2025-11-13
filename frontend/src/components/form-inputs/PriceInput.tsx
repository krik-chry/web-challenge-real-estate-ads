import type { UseFormRegister, FieldError } from 'react-hook-form'
import type { FormValues } from '../../schemas/adFormSchema'
import { handleNumericInput } from '../../utils/inputValidation'

interface PriceInputProps {
  register: UseFormRegister<FormValues>
  transactionType: string
  priceError?: FieldError
}

export default function PriceInput({ register, transactionType, priceError }: PriceInputProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      <div className="form-control">
        <label className="label mb-1">
          <span className="label-text font-semibold">
            {transactionType === 'RENT' ? 'Μηνιαίο μίσθωμα σε € *' : 'Τιμή σε € *'}
          </span>
        </label>
        <input
          {...register('price', {
            setValueAs: (v) => (v === '' ? null : Number(v)),
          })}
          type="number"
          onWheel={(e) => e.currentTarget.blur()}
          inputMode="numeric"
          onKeyDown={handleNumericInput}
          placeholder={
            transactionType === 'RENT'
              ? 'Συμπλήρωσε το μηνιαίο μίσθωμα'
              : 'Συμπλήρωσε την τιμή πώλησης'
          }
          className="input input-bordered w-full"
        />
        {priceError && (
          <span className="label-text-alt text-error">{priceError.message as string}</span>
        )}
      </div>
    </div>
  )
}
