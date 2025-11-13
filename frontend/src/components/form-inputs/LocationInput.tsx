import type { UseFormSetValue, UseFormClearErrors, FieldError } from 'react-hook-form'
import type { FormValues } from '../../schemas/adFormSchema'
import type { AutocompleteResult } from '../../types'
import AutocompleteInput from '../AutocompleteInput'
import FormSectionTitle from '../FormSectionTitle'

interface LocationInputProps {
  setValue: UseFormSetValue<FormValues>
  clearErrors: UseFormClearErrors<FormValues>
  areaInput: string
  setAreaInput: (value: string) => void
  onSelectArea: (item: AutocompleteResult) => void
  isSelected: boolean
  onClear: () => void
  error?: FieldError
}

export default function LocationInput({
  setValue,
  clearErrors,
  areaInput,
  setAreaInput,
  onSelectArea,
  isSelected,
  onClear,
  error,
}: LocationInputProps) {
  const handleChange = (v: string) => {
    setAreaInput(v)
    setValue('placeId', '')
    if (error) {
      clearErrors('placeId')
    }
  }

  const handleSelect = (item: AutocompleteResult) => {
    onSelectArea(item)
    if (error) {
      clearErrors('placeId')
    }
  }

  return (
    <div className="card-body">
      <FormSectionTitle title="Τοποθεσία" />

      <div className="form-control">
        <label className="label mb-1">
          <span className="label-text font-semibold">Διεύθυνση *</span>
        </label>
        <AutocompleteInput
          value={areaInput}
          onChange={handleChange}
          onSelect={handleSelect}
          isSelected={isSelected}
          onClear={onClear}
        />
        {error && <span className="label-text-alt text-error">Το πεδίο είναι υποχρεωτικό</span>}
      </div>
    </div>
  )
}
