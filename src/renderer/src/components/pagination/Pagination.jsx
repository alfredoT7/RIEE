import React from 'react'

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex flex-col gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Página <span className="font-semibold text-slate-700">{currentPage}</span> de{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-100">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-[#00b09b]/10"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1
          const isActive = currentPage === page

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`h-10 min-w-10 cursor-pointer rounded-xl px-3 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#00b09b] text-white shadow-[0_10px_20px_rgba(0,176,155,0.22)]'
                  : 'border border-slate-200 text-slate-600 hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-800 dark:text-slate-300 dark:hover:bg-[#00b09b]/10'
              }`}
            >
              {page}
            </button>
          )
        })}

        <button
          type="button"
          className="cursor-pointer rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-[#00b09b]/10"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default Pagination
