import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'

type ToastType = 'success' | 'error'

export const showToast = (message: string, type: ToastType) => {
  const toast = document.createElement('div')
  toast.className = 'toast toast-bottom toast-end'

  const Icon = type === 'success' ? IoCheckmarkCircleOutline : IoCloseCircleOutline

  const root = createRoot(toast)
  root.render(
    createElement(
      'div',
      { className: `alert ${type === 'success' ? 'alert-success' : 'alert-error'}` },
      createElement(Icon, { className: 'shrink-0 w-6 h-6' }),
      createElement('span', null, message)
    )
  )

  document.body.appendChild(toast)
  setTimeout(() => {
    root.unmount()
    toast.remove()
  }, 5000)
}
