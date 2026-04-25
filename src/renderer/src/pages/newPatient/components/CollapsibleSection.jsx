import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const CollapsibleSection = ({ icon: Icon, title, children, isOpen, onToggle, hasError }) => {
  const bgClass = hasError
    ? 'bg-gradient-to-br from-[#fff9f9] via-white to-[#fee2e2] dark:bg-[linear-gradient(135deg,#1a0a0a_0%,#1c1010_55%,#2d0b0b_100%)]'
    : 'bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)]'
  const borderClass = hasError ? 'border-rose-200/70 dark:border-rose-900/40' : 'border-white/60 dark:border-slate-800'

  return (
    <div className={`overflow-hidden rounded-[28px] border shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-colors dark:shadow-none ${bgClass} ${borderClass}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-3 p-7 sm:p-8"
      >
        <div className="flex items-center gap-3 text-xl font-semibold text-slate-800 dark:text-slate-100">
          <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-[#00b09b]/10 text-[#0f766e]">
            <Icon size={18} />
          </span>
          <h3 className="text-left">{title}</h3>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 text-slate-400 dark:text-slate-500"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-200 px-7 pb-7 pt-6 dark:border-slate-800 sm:px-8 sm:pb-8">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CollapsibleSection
