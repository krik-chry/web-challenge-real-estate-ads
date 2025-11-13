import { useState } from 'react'
import { LuUpload, LuImage, LuTrash2 } from 'react-icons/lu'

interface ImageUploadProps {
  onChange: (file: File | null) => void
  error?: string
}

const MAX_SIZE_MB = 40

export default function ImageUpload({ onChange, error }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        onChange(null)
        return
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`Το αρχείο είναι πολύ μεγάλο. Μέγιστο μέγεθος: ${MAX_SIZE_MB}MB`)
        onChange(null)
        return
      }

      setFileName(file.name)
      onChange(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    setFileName('')
    onChange(null)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-base-content">Φωτογραφία ακινήτου</label>

      {!preview ? (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-base-300 rounded-lg cursor-pointer hover:bg-base-200 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <LuUpload className="w-6 h-6 mb-3 text-base-content/50" />
            <p className="mb-2 text-sm text-base-content/70">
              <span className="font-semibold">Κάντε κλικ για ανέβασμα</span> ή σύρετε εδώ
            </p>
            <p className="text-xs text-base-content/50">
              PNG, JPG, GIF, WEBP (max. {MAX_SIZE_MB}MB)
            </p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-base-300">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 btn btn-circle btn-error"
          >
            <LuTrash2 className="w-5 h-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 flex items-center gap-2">
            <LuImage className="w-5 h-5" />
            <span className="text-xs truncate">{fileName}</span>
          </div>
        </div>
      )}

      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  )
}
