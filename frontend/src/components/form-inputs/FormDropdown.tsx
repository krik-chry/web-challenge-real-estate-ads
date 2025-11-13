import type { UseFormSetValue, FieldError, UseFormRegister } from 'react-hook-form'
import type { FormValues } from '../../schemas/adFormSchema'
import DropdownChevron from './DropdownChevron'

interface FormDropdownProps {
  label: string
  placeholder: string
  value?: string | null
  options: readonly { value: string; label: string }[]
  fieldName: keyof FormValues
  setValue: UseFormSetValue<FormValues>
  register: UseFormRegister<FormValues>
  required?: boolean
  error?: FieldError
}

export default function FormDropdown({
  label,
  placeholder,
  value,
  options,
  fieldName,
  setValue,
  register,
  required = false,
  error,
}: FormDropdownProps) {
  const displayValue = value ? options.find((opt) => opt.value === value)?.label : placeholder

  return (
    <div className="form-control">
      <label className="label mb-1">
        <span className="label-text font-semibold">
          {label}
          {required && ' *'}
        </span>
      </label>
      <input type="hidden" {...register(fieldName)} />
      <div className="dropdown dropdown-bottom w-full">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost hover:bg-base-100 border-base-content/20 w-full justify-between normal-case font-normal"
        >
          <span className={value ? '' : 'text-base-content/50'}>{displayValue}</span>
          <DropdownChevron />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-1 translate-y-0.5 menu border border-base-content/20 flex-nowrap p-2 shadow bg-base-100 rounded-t-sm rounded-b-xl w-full max-h-40 overflow-y-scroll"
        >
          <li>
            <button
              type="button"
              onClick={() => {
                setValue(fieldName, null as null, { shouldValidate: true })
                ;(document.activeElement as HTMLElement)?.blur()
              }}
              className={!value ? 'active text-base-content/50' : 'text-base-content/50'}
            >
              {placeholder}
            </button>
          </li>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  setValue(fieldName, option.value as string & number, { shouldValidate: true })
                  ;(document.activeElement as HTMLElement)?.blur()
                }}
                className={value === option.value ? 'active' : ''}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {error && <div className="text-error text-sm mt-1">{error.message as string}</div>}
    </div>
  )
}
