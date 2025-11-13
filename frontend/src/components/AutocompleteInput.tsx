import { useEffect, useRef, useState } from 'react'
import { LuSearch, LuX } from 'react-icons/lu'
import { useAutocomplete } from '../hooks/useAutocomplete'
import type { AutocompleteResult } from '../types'

type Props = {
  value: string
  onChange: (v: string) => void
  onSelect: (item: AutocompleteResult) => void
  onClear: () => void
  placeholder?: string
  isSelected?: boolean
}

export default function AutocompleteInput({
  value,
  onChange,
  onSelect,
  onClear,
  placeholder,
  isSelected,
}: Props) {
  const { data, isLoading, isError, error } = useAutocomplete(isSelected ? '' : value)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isSelected) {
      setOpen(false)
    } else if (value.length >= 3 && !isLoading && (data || isError)) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [value, data, isSelected, isLoading, isError])

  useEffect(() => {
    function clickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', clickOutside)
    return () => document.removeEventListener('click', clickOutside)
  }, [])

  function handleSelect(item: AutocompleteResult) {
    onSelect(item)
    setOpen(false)
  }

  return (
    <div className="dropdown dropdown-open w-full" ref={containerRef}>
      <div className="form-control w-full">
        <label className="input w-full input-bordered flex items-center gap-2">
          <LuSearch className="w-4 h-4 opacity-70" />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || 'Αναζήτηση τοποθεσίας'}
            className="grow"
            type="text"
            readOnly={isSelected}
          />
          {isLoading && <span className="loading loading-spinner loading-xs" />}
          {(isSelected || data?.length === 0 || value.length > 0) && (
            <button
              type="button"
              onClick={onClear}
              className="btn btn-ghost btn-xs btn-circle"
              aria-label="Clear selection"
            >
              <LuX className="w-4 h-4" />
            </button>
          )}
        </label>
      </div>

      {open && (
        <ul className="dropdown-content z-1 translate-y-1 menu border border-base-content/20 flex-nowrap p-2 shadow bg-base-100 rounded-t-sm rounded-b-xl w-full max-h-48 overflow-y-scroll">
          {!isError && data?.length === 0 && (
            <li className="menu-title text-base-content/70 p-1 pointer-events-none">
              <span>Δεν βρέθηκαν αποτελέσματα</span>
            </li>
          )}
          {isError && error && (
            <li className="menu-title p-1 text-error/70 pointer-events-none">
              <span>{error.message}</span>
            </li>
          )}

          {!isError &&
            data?.map((item) => (
              <li key={item.placeId}>
                <button
                  onClick={() => handleSelect(item)}
                  className="flex flex-col items-start p-3 hover:bg-base-200 focus:bg-base-200 rounded-btn"
                >
                  <div className="font-medium text-base-content">
                    {item.mainText},{' '}
                    {item.secondaryText && (
                      <span className="text-sm text-base-content/70">{item.secondaryText}</span>
                    )}
                  </div>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
