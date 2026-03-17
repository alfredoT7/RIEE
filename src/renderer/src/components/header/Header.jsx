import React, { useState, useEffect, useRef } from 'react'
import { FaBars, FaSignOutAlt, FaSlidersH, FaUserMd } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useSidebar } from '../../context/SidebarContext'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../themeToggle/ThemeToggle'

const Header = () => {
  const { toggleSidebar, currentPage } = useSidebar()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)
  const fullName = [user?.nombres, user?.apellidos].filter(Boolean).join(' ').trim() || user?.username || 'Doctora'

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Sesión cerrada exitosamente')
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/88 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            RIEE / {currentPage}
          </span>
          <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{currentPage}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm sm:flex dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
          {user?.imagenUrl ? (
            <img
              src={user.imagenUrl}
              alt={fullName}
              className="h-11 w-11 rounded-2xl object-cover ring-2 ring-[#00b09b]/10"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00b09b]/12 text-[#0f766e]">
              <FaUserMd />
            </div>
          )}
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">{fullName}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Panel principal</p>
          </div>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-none"
            onClick={() => setShowMenu((value) => !value)}
          >
            <FaSlidersH />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-[calc(100%+12px)] min-w-[190px] rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-slate-300 dark:hover:bg-rose-500/10"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
