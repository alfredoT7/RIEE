import React from 'react'

const columns = [
  { label: 'CI', className: '' },
  { label: 'Foto', className: 'text-center' },
  { label: 'Nombre', className: '' },
  { label: 'Dirección', className: '' },
  { label: 'Fecha nac.', className: '' },
  { label: 'Teléfono', className: '' },
  { label: '', className: '' }
]

const PacienteHeader = () => {
  return (
    <div className="hidden grid-cols-[80px_36px_minmax(170px,1fr)_minmax(180px,1fr)_120px_130px_36px] items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-slate-500 md:grid dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      {columns.map((column) => (
        <div key={column.label} className={column.className}>
          {column.label}
        </div>
      ))}
    </div>
  )
}

export default PacienteHeader
