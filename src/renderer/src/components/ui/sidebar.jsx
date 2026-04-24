/* eslint-disable react/prop-types */
import React, { createContext, useContext, useMemo, useState } from 'react'

const SidebarContext = createContext(null)

const sidebarRootClass =
  'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200 bg-[linear-gradient(180deg,#f7fffd_0%,#f2fbf9_45%,#ecf6f5_100%)] px-3 py-3 backdrop-blur-sm transition-all duration-300 dark:border-slate-800 dark:bg-[linear-gradient(180deg,#041312_0%,#0a1b1a_50%,#101827_100%)]'

export const SidebarProvider = ({ children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen)
  const [openMobile, setOpenMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState('Inicio')

  const value = useMemo(
    () => ({
      state: open ? 'expanded' : 'collapsed',
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile: false,
      isCollapsed: !open,
      currentPage,
      toggleSidebar: () => setOpen((prev) => !prev),
      updateCurrentPage: (pageName) => setCurrentPage(pageName)
    }),
    [open, openMobile, currentPage]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export const Sidebar = ({ className = '', collapsible = 'icon', children }) => {
  const { state } = useSidebar()
  const collapsed = collapsible === 'icon' && state === 'collapsed'

  return (
    <aside
      data-state={state}
      data-collapsible={collapsible}
      className={`${sidebarRootClass} ${collapsed ? 'w-[80px]' : 'w-[240px]'} ${className}`}
    >
      {children}
    </aside>
  )
}

export const SidebarHeader = ({ className = '', children }) => (
  <div className={className}>{children}</div>
)

export const SidebarContent = ({ className = '', children }) => (
  <div className={`flex flex-1 flex-col ${className}`}>{children}</div>
)

export const SidebarFooter = ({ className = '', children }) => (
  <div className={className}>{children}</div>
)

export const SidebarGroup = ({ className = '', children }) => (
  <div className={className}>{children}</div>
)

export const SidebarGroupContent = ({ className = '', children }) => (
  <div className={className}>{children}</div>
)

export const SidebarMenu = ({ className = '', children }) => (
  <div className={className}>{children}</div>
)

export const SidebarMenuItem = ({ className = '', children }) => (
  <div className={className}>{children}</div>
)

export const SidebarMenuButton = ({
  className = '',
  isActive = false,
  title,
  onClick,
  children
}) => {
  const { isCollapsed } = useSidebar()

  return (
    <button
      type="button"
      data-active={isActive}
      title={isCollapsed ? title : undefined}
      onClick={onClick}
      className={`flex h-9 w-full cursor-pointer items-center rounded-md px-2.5 text-left transition-colors ${isCollapsed ? 'justify-center' : 'gap-2.5'} ${
        isActive
          ? 'bg-[#00b09b] text-white shadow-[0_8px_18px_rgba(0,176,155,0.32)]'
          : 'text-slate-700 hover:bg-[#00b09b]/12 hover:text-[#1e776d] dark:text-slate-300 dark:hover:bg-[#00b09b]/18 dark:hover:text-slate-100'
      } ${className}`}
    >
      {children}
    </button>
  )
}

export const SidebarTrigger = ({ className = '', children }) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button type="button" onClick={toggleSidebar} className={className}>
      {children}
    </button>
  )
}
