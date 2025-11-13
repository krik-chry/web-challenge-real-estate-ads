/**
 * Prevents non-numeric characters from being entered in an input field
 * @param e - Keyboard event from the input
 */
export const handleNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight']

  if (allowedKeys.includes(e.key) || /[0-9]/.test(e.key)) {
    return
  }

  e.preventDefault()
}
