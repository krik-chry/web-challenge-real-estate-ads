import type { UseFormRegister, FieldError, UseFormSetValue } from 'react-hook-form'
import type { FormValues } from '../../schemas/adFormSchema'
import {
  ENERGY_CLASSES,
  FLOOR_OPTIONS,
  CONDITION_OPTIONS,
  ROOM_NUMBER_OPTIONS,
  DETACHED_HOUSE_FLOOR_OPTIONS,
  PLOT_CONDITION_OPTIONS,
} from '../../constants/formOptions'
import { handleNumericInput } from '../../utils/inputValidation'
import FormSectionTitle from '../FormSectionTitle'
import FormDropdown from './FormDropdown'

interface PropertyDetailsInputsProps {
  register: UseFormRegister<FormValues>
  setValue: UseFormSetValue<FormValues>
  selectedPropertyType: string
  energyClass?: string | null
  floor?: string | null
  bedrooms?: string | null
  bathrooms?: string | null
  wc?: string | null
  condition?: string | null
  totalSizeError?: FieldError
}

export default function PropertyDetailsInputs({
  register,
  setValue,
  selectedPropertyType,
  energyClass,
  floor,
  bedrooms,
  bathrooms,
  wc,
  condition,
  totalSizeError,
}: PropertyDetailsInputsProps) {
  const isPlot = selectedPropertyType === 'PLOT'
  return (
    <div className="card-body">
      <FormSectionTitle
        title="Βασικά χαρακτηριστικά"
        subtitle="Συμπλήρωσε τα στοιχεία του ακινήτου"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Total Size */}
        <div className="form-control">
          <label className="label mb-1">
            <span className="label-text font-semibold">Τετραγωνικά μέτρα *</span>
          </label>
          <input
            {...register('totalSize', {
              setValueAs: (v) => (v === '' ? null : Number(v)),
            })}
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            inputMode="numeric"
            placeholder="Συμπλήρωσε την επιφάνεια σε τ.μ."
            onKeyDown={handleNumericInput}
            className="input input-bordered w-full"
          />
          {totalSizeError && (
            <span className="label-text-alt text-error">{totalSizeError.message as string}</span>
          )}
        </div>

        {/* Condition */}
        <FormDropdown
          label={isPlot ? 'Σχέδιο πόλης' : 'Κατάσταση ακινήτου'}
          placeholder={isPlot ? 'Επίλεξε σχέδιο πόλης' : 'Επίλεξε κατάσταση'}
          value={condition}
          options={isPlot ? PLOT_CONDITION_OPTIONS : CONDITION_OPTIONS}
          fieldName="condition"
          setValue={setValue}
          register={register}
        />

        {!isPlot && (
          <>
            {/* Energy Class */}
            <FormDropdown
              label="Ενεργειακή κλάση"
              placeholder="Επίλεξε ενεργειακή κλάση"
              value={energyClass}
              options={ENERGY_CLASSES}
              fieldName="energyClass"
              setValue={setValue}
              register={register}
            />

            {/* Floor */}
            <FormDropdown
              label={selectedPropertyType === 'APARTMENT' ? 'Όροφος' : 'Όροφοι'}
              placeholder={
                selectedPropertyType === 'APARTMENT'
                  ? 'Επίλεξε όροφο'
                  : 'Επίλεξε συνολικούς ορόφους'
              }
              value={floor}
              options={
                selectedPropertyType === 'APARTMENT' ? FLOOR_OPTIONS : DETACHED_HOUSE_FLOOR_OPTIONS
              }
              fieldName="floor"
              setValue={setValue}
              register={register}
            />

            {/* Bedrooms */}
            <FormDropdown
              label="Υπνοδωμάτια"
              placeholder="Επίλεξε αριθμό υπνοδωματίων"
              value={bedrooms}
              options={ROOM_NUMBER_OPTIONS}
              fieldName="bedrooms"
              setValue={setValue}
              register={register}
            />

            {/* Bathrooms */}
            <FormDropdown
              label="Μπάνια"
              placeholder="Επίλεξε αριθμό μπάνιων"
              value={bathrooms}
              options={ROOM_NUMBER_OPTIONS}
              fieldName="bathrooms"
              setValue={setValue}
              register={register}
            />

            {/* WC */}
            <FormDropdown
              label="WC"
              placeholder="Επίλεξε αριθμό WC"
              value={wc}
              options={ROOM_NUMBER_OPTIONS}
              fieldName="wc"
              setValue={setValue}
              register={register}
            />
          </>
        )}
      </div>
    </div>
  )
}
