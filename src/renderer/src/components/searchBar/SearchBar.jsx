import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaSearch } from 'react-icons/fa'

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate()

  const handleSearchChange = (e) => {
    onSearch(e.target.value)
  }

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
      <div className="relative w-full md:max-w-xl">
        <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Busca un paciente por nombre o CI"
          onChange={handleSearchChange}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#00b09b]/40 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </div>

      <button
        type="button"
        onClick={() => navigate('/new-patient')}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00b09b] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-transform hover:-translate-y-0.5"
      >
        <span>Agregar nuevo paciente</span>
        <FaPlus className="text-xs" />
      </button>
    </div>
  )
}

export default SearchBar
