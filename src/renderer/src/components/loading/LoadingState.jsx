import React from 'react'
import { motion } from 'framer-motion'

const loadingCards = Array.from({ length: 4 }, (_, index) => index)

const LoadingState = ({
  title = 'Cargando datos',
  description = 'Estamos consultando la información del backend.',
  variant = 'panel',
  rows = 4,
  className = ''
}) => {
  if (variant === 'cards') {
    return (
      <div
        className={`rounded-[24px] border border-[#00b09b]/15 bg-[radial-gradient(circle_at_top_left,_rgba(0,176,155,0.18),_transparent_38%),linear-gradient(135deg,#f8fffd_0%,#effaf7_48%,#ffffff_100%)] p-5 shadow-[0_20px_60px_rgba(0,176,155,0.12)] dark:border-[#0f766e]/40 dark:bg-[radial-gradient(circle_at_top_left,_rgba(17,182,161,0.22),_transparent_30%),linear-gradient(135deg,#082f2d_0%,#0f172a_55%,#0b1220_100%)] dark:shadow-none sm:p-6 ${className}`}
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-[1.15rem] font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
          </div>
          <motion.div
            className="h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,#00b09b_0%,#0f766e_100%)] shadow-[0_12px_28px_rgba(0,176,155,0.28)]"
            animate={{ rotate: 360, scale: [1, 1.08, 1] }}
            transition={{ rotate: { duration: 2.4, repeat: Infinity, ease: 'linear' }, scale: { duration: 1.6, repeat: Infinity } }}
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-2 2xl:gap-5">
          {loadingCards.map((card) => (
            <motion.div
              key={card}
              className="relative overflow-hidden rounded-[26px] border border-white/70 bg-white/80 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70"
              initial={{ opacity: 0.5, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card * 0.08, duration: 0.45 }}
            >
              <motion.div
                className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,176,155,0.14),transparent)]"
                animate={{ x: ['0%', '220%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: card * 0.15 }}
              />
              <div className="relative space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-40 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-24 rounded-full bg-slate-100 dark:bg-slate-900" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-11/12 rounded-full bg-slate-100 dark:bg-slate-900" />
                  <div className="h-3 w-9/12 rounded-full bg-slate-100 dark:bg-slate-900" />
                  <div className="h-3 w-7/12 rounded-full bg-slate-100 dark:bg-slate-900" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`rounded-[24px] border border-[#00b09b]/20 bg-[linear-gradient(135deg,rgba(0,176,155,0.05),rgba(92,225,212,0.08))] p-5 shadow-[0_18px_45px_rgba(0,176,155,0.08)] dark:border-[#0f766e]/30 dark:bg-[linear-gradient(135deg,rgba(8,47,45,0.8),rgba(15,23,42,0.92))] dark:shadow-none ${className}`}
    >
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 dark:bg-slate-900/80">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#00b09b]/25 border-t-[#00b09b]" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: rows }, (_, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/75"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
          >
            <motion.div
              className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,176,155,0.14),transparent)]"
              animate={{ x: ['0%', '220%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 }}
            />
            <div className="relative grid gap-3 md:grid-cols-[1.1fr_1.5fr_120px]">
              <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 rounded-full bg-slate-100 dark:bg-slate-900" />
              <div className="h-4 rounded-full bg-slate-100 dark:bg-slate-900" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LoadingState
