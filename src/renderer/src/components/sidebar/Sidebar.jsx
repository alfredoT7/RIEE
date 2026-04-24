import { useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  FaHome,
  FaUsers,
  FaBookMedical,
  FaCalendarAlt,
  FaToolbox,
  FaMoneyCheckAlt
} from 'react-icons/fa'
import { ChevronsUpDown, LogOut, User2 } from 'lucide-react'
import { toast } from 'sonner'
import { useSidebar } from '../../context/SidebarContext'
import { useAuth } from '../../context/AuthContext'
import ImagesApp from '../../assets/ImagesApp'
import {
  Sidebar as AppSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '../ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '../ui/dropdown-menu'

const Sidebar = () => {
  const { isCollapsed, updateCurrentPage } = useSidebar()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const fullName =
    [user?.nombres, user?.apellidos].filter(Boolean).join(' ').trim() || user?.username || 'Doctora'

  const menuItems = useMemo(
    () => ({
      Inicio: { icon: FaHome, label: 'Inicio', path: '/', matcher: (pathname) => pathname === '/' },
      Pacientes: {
        icon: FaUsers,
        label: 'Pacientes',
        path: '/patient',
        matcher: (pathname) =>
          pathname.startsWith('/patient') || pathname.startsWith('/new-patient')
      },
      Tratamiento: {
        icon: FaBookMedical,
        label: 'Tratamiento',
        path: '/treatment',
        matcher: (pathname) =>
          pathname.startsWith('/treatment') || pathname.startsWith('/new-treatment')
      },
      Citas: {
        icon: FaCalendarAlt,
        label: 'Citas',
        path: '/appointments',
        matcher: (pathname) =>
          pathname.startsWith('/appointments') || pathname.startsWith('/nueva-cita')
      },
      Inventario: {
        icon: FaToolbox,
        label: 'Inventario',
        path: '/inventario',
        matcher: (pathname) => pathname.startsWith('/inventario')
      },
      Cuentas: {
        icon: FaMoneyCheckAlt,
        label: 'Cuentas',
        path: '/cuentas',
        matcher: (pathname) => pathname.startsWith('/cuentas')
      }
    }),
    []
  )

  const activeKey = useMemo(() => {
    return (
      Object.keys(menuItems).find((key) => menuItems[key].matcher(location.pathname)) || 'Inicio'
    )
  }, [location.pathname, menuItems])

  useEffect(() => {
    updateCurrentPage(activeKey)
  }, [activeKey, updateCurrentPage])

  const handleSelection = (sectionKey) => {
    const section = menuItems[sectionKey]
    if (!section?.path) return
    updateCurrentPage(sectionKey)
    navigate(section.path)
  }

  const handleLogout = () => {
    logout()
    toast.success('Sesión cerrada exitosamente')
    navigate('/login')
  }

  return (
    <AppSidebar collapsible="icon">
      <SidebarHeader
        className={`mb-4 flex items-center justify-center rounded-xl border border-[#00b09b]/20 bg-white p-3 shadow-sm dark:border-[#00b09b]/25 dark:bg-slate-900 ${
          isCollapsed ? 'min-h-[76px]' : 'min-h-[84px]'
        }`}
      >
        <img
          src={isCollapsed ? ImagesApp.rieeCompactLogo : ImagesApp.rieeLogo}
          alt="RIEE"
          className={isCollapsed ? 'h-10 w-10 object-contain' : 'h-12 w-full object-contain'}
        />
      </SidebarHeader>

      <SidebarContent className="pt-1">
        <SidebarGroup>
          {!isCollapsed && (
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1e776d]/70 dark:text-[#5ce1d4]/70">
              Navegación
            </p>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1.5">
              {Object.keys(menuItems).map((key) => {
                const item = menuItems[key]
                const IconComponent = item.icon
                const isActive = activeKey === key
                return (
                  <SidebarMenuItem key={key}>
                    <SidebarMenuButton
                      isActive={isActive}
                      title={item.label}
                      onClick={() => handleSelection(key)}
                    >
                      <IconComponent
                        className={`text-[15px] ${isActive ? 'text-white' : 'text-[#1e776d]'}`}
                      />
                      {!isCollapsed && (
                        <span
                          className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}
                        >
                          {item.label}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-11 border border-[#00b09b]/20 bg-white dark:border-[#00b09b]/25 dark:bg-slate-900">
                  {user?.imagenUrl ? (
                    <img
                      src={user.imagenUrl}
                      alt={fullName}
                      className="h-7 w-7 rounded-md object-cover"
                    />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#00b09b]/15 text-[#1e776d] dark:bg-[#00b09b]/20 dark:text-[#5ce1d4]">
                      <User2 className="h-4 w-4" />
                    </span>
                  )}
                  {!isCollapsed && (
                    <>
                      <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                        {fullName}
                      </span>
                      <ChevronsUpDown className="ml-auto h-4 w-4 text-[#1e776d]/70 dark:text-[#5ce1d4]/80" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side={isCollapsed ? 'right' : 'top'}
                align={isCollapsed ? 'start' : 'end'}
              >
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  <User2 className="h-4 w-4" />
                  <span>{fullName}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={handleLogout}
                  className="text-rose-600 dark:text-rose-400"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </AppSidebar>
  )
}

export default Sidebar
