/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

const DropdownMenuContext = createContext(null)

const useDropdownMenu = () => {
  const context = useContext(DropdownMenuContext)
  if (!context) {
    throw new Error('DropdownMenu components must be used within DropdownMenu')
  }
  return context
}

export const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open])

  const value = useMemo(() => ({ open, setOpen, triggerRef }), [open])

  return (
    <DropdownMenuContext.Provider value={value}>
      <div ref={rootRef} className="relative">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

export const DropdownMenuTrigger = ({ asChild = false, children, className = '' }) => {
  const { open, setOpen, triggerRef } = useDropdownMenu()
  const triggerProps = {
    type: 'button',
    'aria-expanded': open,
    onClick: () => setOpen((value) => !value),
    ref: triggerRef,
    className
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...triggerProps,
      className: [children.props.className, className].filter(Boolean).join(' ')
    })
  }

  return <button {...triggerProps}>{children}</button>
}

export const DropdownMenuContent = ({
  children,
  className = '',
  align = 'start',
  side = 'bottom'
}) => {
  const { open, triggerRef } = useDropdownMenu()
  const contentRef = useRef(null)
  const [positionStyle, setPositionStyle] = useState({})

  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const contentRect = contentRef.current.getBoundingClientRect()
    const gap = 8
    const viewportPadding = 12
    let left = triggerRect.left
    let top = triggerRect.bottom + gap

    if (side === 'top') top = triggerRect.top - contentRect.height - gap
    if (side === 'right') left = triggerRect.right + gap
    if (side === 'left') left = triggerRect.left - contentRect.width - gap

    if (side === 'right' || side === 'left') {
      if (align === 'end') top = triggerRect.bottom - contentRect.height
      if (align === 'center')
        top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
    } else {
      if (align === 'end') left = triggerRect.right - contentRect.width
      if (align === 'center')
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
    }

    left = Math.min(
      Math.max(left, viewportPadding),
      window.innerWidth - contentRect.width - viewportPadding
    )
    top = Math.min(
      Math.max(top, viewportPadding),
      window.innerHeight - contentRect.height - viewportPadding
    )

    setPositionStyle({
      position: 'fixed',
      left: `${left}px`,
      top: `${top}px`
    })
  }, [open, align, side, triggerRef])

  if (!open) return null

  return (
    <div
      ref={contentRef}
      role="menu"
      style={positionStyle}
      className={`z-50 min-w-[12rem] rounded-md border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  )
}

export const DropdownMenuLabel = ({ children, className = '' }) => (
  <div
    className={`px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 ${className}`}
  >
    {children}
  </div>
)

export const DropdownMenuSeparator = ({ className = '' }) => (
  <div className={`my-1 h-px bg-slate-200 dark:bg-slate-800 ${className}`} />
)

export const DropdownMenuItem = ({ children, onSelect, className = '', disabled = false }) => {
  const { setOpen } = useDropdownMenu()

  const handleClick = () => {
    if (disabled) return
    onSelect?.()
    setOpen(false)
  }

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={handleClick}
      className={`flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </button>
  )
}
