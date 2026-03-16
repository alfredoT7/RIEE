import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  FaHome,
  FaUsers,
  FaBookMedical,
  FaCalendarAlt,
  FaToolbox,
  FaMoneyCheckAlt,
  FaUserMd
} from 'react-icons/fa'
import { useSidebar } from '../../context/SidebarContext'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const [selected, setSelected] = useState('Inicio')
  const { isCollapsed, updateCurrentPage } = useSidebar()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const doctorFirstName = user?.nombres?.trim()?.split(' ')[0] || user?.username || 'Doctora'
  const doctorName = `Dra. ${doctorFirstName}`

  const routeToPageName = useMemo(
    () => ({
      '/': 'Inicio',
      '/patient': 'Pacientes',
      '/new-patient': 'Nuevo Paciente',
      '/treatment': 'Tratamiento',
      '/new-treatment': 'Nuevo Tratamiento',
      '/appointments': 'Citas',
      '/nueva-cita': 'Nueva Cita',
      '/inventario': 'Inventario',
      '/inventario/nuevo-producto': 'Nuevo Producto',
      '/cuentas': 'Cuentas',
      '/perfil': 'Perfil'
    }),
    []
  )

  useEffect(() => {
    const currentPageName = routeToPageName[location.pathname] || 'Inicio'
    setSelected(currentPageName)
    updateCurrentPage(currentPageName)
  }, [location.pathname, routeToPageName, updateCurrentPage])

  const handleSelection = (section) => {
    setSelected(section)
    updateCurrentPage(section)

    if (section === 'Inicio') navigate('/')
    if (section === 'Pacientes') navigate('/patient')
    if (section === 'Tratamiento') navigate('/treatment')
    if (section === 'Citas') navigate('/appointments')
    if (section === 'Inventario') navigate('/inventario')
    if (section === 'Cuentas') navigate('/cuentas')
  }

  const menuItems = useMemo(
    () => [
      { key: 'Inicio', icon: FaHome, label: 'Inicio' },
      { key: 'Pacientes', icon: FaUsers, label: 'Pacientes' },
      { key: 'Tratamiento', icon: FaBookMedical, label: 'Tratamiento' },
      { key: 'Citas', icon: FaCalendarAlt, label: 'Citas' },
      { key: 'Inventario', icon: FaToolbox, label: 'Inventario' },
      { key: 'Cuentas', icon: FaMoneyCheckAlt, label: 'Cuentas' },
      { key: 'Perfil', icon: FaUserMd, label: 'Perfil' }
    ],
    []
  )

  return (
    <nav
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200/80 bg-[linear-gradient(180deg,#f9fffd_0%,#f2f7f7_45%,#eef4f7_100%)] px-4 py-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-all duration-300 dark:border-slate-800 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_45%,#111827_100%)] dark:shadow-none ${
        isCollapsed ? 'w-[80px]' : 'w-[240px]'
      }`}
    >
      <div
        className={`mb-6 flex items-center rounded-[24px] border border-white/70 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-none ${
          isCollapsed ? 'justify-center' : 'gap-3'
        }`}
        title={isCollapsed ? doctorName : ''}
      >
        {user?.imagenUrl ? (
          <img
            className="h-12 w-12 rounded-2xl object-cover ring-2 ring-[#00b09b]/10"
            src={user.imagenUrl}
            alt={doctorName}
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00b09b]/12 text-lg text-[#0f766e]">
            <FaUserMd />
          </div>
        )}
        {!isCollapsed && (
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Especialista
            </p>
            <h4 className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{doctorName}</h4>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          const isActive = selected === item.key

          return (
            <button
              key={item.key}
              type="button"
              className={`flex items-center rounded-2xl px-3 py-3 text-left transition-all duration-200 ${
                isCollapsed ? 'justify-center' : 'gap-3'
              } ${
                isActive
                  ? 'bg-[#00b09b] text-white shadow-[0_12px_24px_rgba(0,176,155,0.25)]'
                  : 'text-slate-600 hover:bg-white/90 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-900'
              }`}
              onClick={() => handleSelection(item.key)}
              title={isCollapsed ? item.label : ''}
            >
              <IconComponent className={`text-base ${isActive ? 'text-white' : 'text-[#0f766e]'}`} />
              {!isCollapsed && (
                <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default Sidebar
