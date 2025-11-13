import { LuMoon, LuSun } from 'react-icons/lu'
import { useTheme } from '../contexts/ThemeContext'

export default function ToggleTheme() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <label className="flex items-center cursor-pointer gap-2">
      <LuSun size={18} />
      <input
        type="checkbox"
        className="toggle theme-controller"
        value="dark"
        checked={isDark}
        onChange={toggleTheme}
      />
      <LuMoon size={18} />
    </label>
  )
}
