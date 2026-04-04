import React from 'react'
import { FaChevronLeft, FaChevronRight, FaPlus, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useTreatment } from './useTreatment'
import LoadingState from '../../components/loading/LoadingState'

const featuredData = [
  {
    id: 1,
    name: 'Ortodoncia Brackets',
    description: 'Tratamiento para corregir la alineacion dental.',
    price: 'Bs. 3500',
    duration: '18 meses',
    popularity: 95
  },
  {
    id: 2,
    name: 'Implante Dental',
    description: 'Implante de titanio para piezas perdidas.',
    price: 'Bs. 3000',
    duration: '3-6 meses',
    popularity: 85
  },
  {
    id: 3,
    name: 'Blanqueamiento LED',
    description: 'Sesion avanzada de blanqueamiento dental.',
    price: 'Bs. 800',
    duration: '2 sesiones',
    popularity: 78
  }
]

const Treatment = () => {
  const navigate = useNavigate()
  const {
    loading,
    error,
    searchTerm,
    currentPage,
    currentTreatments,
    totalPages,
    startIndex,
    endIndex,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleSearchChange,
    refreshTreatments,
    stats
  } = useTreatment()

  return (
    <section className="px-2 pb-6 pt-3">
      <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Tratamientos</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Gestiona tratamientos y procedimientos dentales.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/new-treatment')}
            className="inline-flex w-fit items-center gap-2 rounded-2xl bg-[#00b09b] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)]"
          >
            <FaPlus />
            Nuevo tratamiento
          </button>
        </div>

        <div className="mt-6 relative w-full lg:max-w-xl">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por nombre, descripcion o procedimiento..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
        <div className="hidden grid-cols-[1.4fr_2fr_140px_150px_1.2fr] gap-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 md:grid dark:bg-slate-900 dark:text-slate-400">
          <span>Tratamiento</span>
          <span>Descripcion</span>
          <span>Semanas</span>
          <span>Costo base</span>
          <span>Notas</span>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {loading && (
            <div className="p-5">
              <LoadingState
                title="Cargando tratamientos"
                description="Estamos consultando los procedimientos registrados."
                rows={5}
                className="border-none p-0 shadow-none"
              />
            </div>
          )}

          {error && !loading && (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-rose-500">{error}</p>
              <button
                type="button"
                onClick={refreshTreatments}
                className="mt-4 rounded-2xl bg-[#00b09b] px-4 py-2 text-sm font-semibold text-white"
              >
                Reintentar
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            currentTreatments.map((treatment, index) => (
              <div
                key={treatment.id || index}
                className="grid gap-3 px-5 py-4 md:grid-cols-[1.4fr_2fr_140px_150px_1.2fr]"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {treatment.nombreTratamiento}
                  </p>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {treatment.descripcion || 'Sin descripcion'}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {treatment.semanasEstimadas} semana{treatment.semanasEstimadas === 1 ? '' : 's'}
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Bs. {treatment.costoBaseTratamiento?.toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {treatment.notasAdicionales || 'Sin notas adicionales'}
                </p>
              </div>
            ))}

          {!loading && !error && currentTreatments.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
              {searchTerm
                ? 'No se encontraron tratamientos para esa busqueda.'
                : 'No hay tratamientos registrados.'}
            </div>
          )}
        </div>
      </div>

      {!loading && !error && stats.showPagination && (
        <div className="mt-4 flex flex-col gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mostrando {startIndex + 1}-{Math.min(endIndex, stats.filtered)} de {stats.filtered} tratamientos
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={handlePreviousPage} disabled={!stats.hasPreviousPage} className="rounded-xl border border-slate-200 px-3 py-2 text-slate-600 disabled:opacity-40 dark:border-slate-800 dark:text-slate-300">
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold ${
                  currentPage === page
                    ? 'bg-[#00b09b] text-white'
                    : 'border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300'
                }`}
              >
                {page}
              </button>
            ))}
            <button type="button" onClick={handleNextPage} disabled={!stats.hasNextPage} className="rounded-xl border border-slate-200 px-3 py-2 text-slate-600 disabled:opacity-40 dark:border-slate-800 dark:text-slate-300">
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        {featuredData.map((treatment) => (
          <article key={treatment.id} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{treatment.name}</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{treatment.description}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-semibold text-emerald-600">{treatment.price}</span>
              <span className="text-slate-500 dark:text-slate-400">{treatment.duration}</span>
            </div>
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                <span>Popularidad</span>
                <span>{treatment.popularity}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded-full bg-gradient-to-r from-[#00b09b] to-[#5ce1d4]" style={{ width: `${treatment.popularity}%` }} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Treatment
