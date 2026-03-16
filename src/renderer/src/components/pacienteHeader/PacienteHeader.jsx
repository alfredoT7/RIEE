import React from 'react'

const columns = [
  { label: 'CI', className: 'basis-[80px] shrink-0' },
  { label: 'Foto', className: 'basis-[30px] shrink-0 text-center' },
  { label: 'Nombre', className: 'ml-2.5 flex-1' },
  { label: 'Dirección', className: 'flex-1 pr-2.5' },
  { label: 'Fecha nac.', className: 'basis-[90px] shrink-0 pr-2.5' },
  { label: 'Teléfono', className: 'basis-[90px] shrink-0' }
]

const PacienteHeader = () => {
  return (
    <div className="mb-2 hidden items-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-slate-500 md:flex dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      {columns.map((column) => (
        <div key={column.label} className={column.className}>
          {column.label}
        </div>
      ))}
    </div>
  )
}

export default PacienteHeader
