import React from 'react'

const TopInfoHome = ({ title, quantity, porcentaje, icon }) => {
  const IconComponent = icon

  return (
    <article className="flex h-full flex-col justify-between rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00b09b]/10 text-[#0f766e] dark:bg-[#00b09b]/15 dark:text-[#5ce1d4]">
          <IconComponent strokeWidth={2} className="text-xl" />
        </div>
        <div className="min-w-0 text-right">
          <h5 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h5>
          <h4 className="mt-1 text-2xl font-semibold text-slate-800 dark:text-slate-100">
            {quantity}
          </h4>
        </div>
      </div>
      <div className="mt-5">
        <p className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
          {porcentaje}
        </p>
      </div>
    </article>
  )
}

export default TopInfoHome
