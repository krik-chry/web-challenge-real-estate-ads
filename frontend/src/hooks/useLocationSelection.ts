import { useState } from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import type { AutocompleteResult } from '../types'
import type { FormValues } from '../schemas/adFormSchema'

export const useLocationSelection = (setValue: UseFormSetValue<FormValues>) => {
  const [areaInput, setAreaInput] = useState('')
  const [isLocationSelected, setIsLocationSelected] = useState(false)

  const onSelectArea = (item: AutocompleteResult) => {
    setValue('placeId', item.placeId)
    setValue('mainText', item.mainText)
    setValue('secondaryText', item.secondaryText ?? '')
    setAreaInput(`${item.mainText}${item.secondaryText ? ` — ${item.secondaryText}` : ''}`)
    setIsLocationSelected(true)
  }

  const onClearLocation = () => {
    setValue('placeId', '')
    setValue('mainText', '')
    setValue('secondaryText', '')
    setAreaInput('')
    setIsLocationSelected(false)
  }

  return { areaInput, setAreaInput, isLocationSelected, onSelectArea, onClearLocation }
}
