import type { UseFormRegister } from 'react-hook-form'
import type { FormValues } from '../../schemas/adFormSchema'
import FormSectionTitle from '../FormSectionTitle'

interface DescriptionInputProps {
  register: UseFormRegister<FormValues>
}

export default function DescriptionInput({ register }: DescriptionInputProps) {
  return (
    <div className="card-body">
      <FormSectionTitle title="Περιγραφή ακινήτου" subtitle="Τι κάνει το ακίνητο σου ξεχωριστό;" />

      <div className="form-control">
        <label className="label mb-1">
          <span className="label-text font-semibold">Περιγραφή</span>
        </label>
        <textarea {...register('description')} className="textarea textarea-bordered w-full h-32" />
      </div>
    </div>
  )
}
