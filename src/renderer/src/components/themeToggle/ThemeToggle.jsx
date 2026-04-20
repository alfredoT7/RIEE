import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      className={`flex h-11 w-[72px] cursor-pointer items-center rounded-full border px-1.5 transition-colors ${
        isDarkMode
          ? 'border-slate-700 bg-slate-900'
          : 'border-slate-200 bg-slate-100'
      }`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-transform ${
          isDarkMode
            ? 'translate-x-[28px] bg-slate-800 text-amber-300'
            : 'translate-x-0 bg-white text-amber-500'
        }`}
      >
        {isDarkMode ? <FaMoon size={12} /> : <FaSun size={12} />}
      </div>
    </button>
  )
}

export default ThemeToggle
