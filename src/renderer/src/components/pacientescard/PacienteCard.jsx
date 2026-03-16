import React from 'react'
import { FileText, Mail, MapPin, Phone, SquarePen, Trash } from 'lucide-react'
import ImagesApp from '../../assets/ImagesApp'

const PacienteCard = () => {
  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <img
            src={ImagesApp.defaultImage}
            alt="Paciente"
            className="h-14 w-14 rounded-2xl object-cover ring-2 ring-[#00b09b]/10"
          />
          <div className="min-w-0">
            <h5 className="truncate text-base font-semibold text-slate-800">Alfredo Torrico</h5>
            <p className="mt-1 text-sm text-slate-500">32 años · CI: 12312312</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Editar paciente"
            className="rounded-xl border border-slate-200 p-2 text-slate-500 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e]"
          >
            <SquarePen size={16} />
          </button>
          <button
            type="button"
            title="Eliminar paciente"
            className="rounded-xl border border-slate-200 p-2 text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-500">
        <div className="flex items-center gap-3">
          <Phone size={16} className="text-[#0f766e]" />
          <p>+591 76424923</p>
        </div>
        <div className="flex items-center gap-3">
          <Mail size={16} className="text-[#0f766e]" />
          <p>alfredo@gmail.com</p>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-[#0f766e]" />
          <p>La Paz, Bolivia</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Última visita
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">12/12/2024</p>
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e]"
          >
            <FileText size={16} />
            Historia
          </button>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Próxima cita
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">15/12/2024</p>
          <button
            type="button"
            className="mt-3 inline-flex items-center rounded-xl bg-[#00b09b] px-3 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,176,155,0.22)] transition-transform hover:-translate-y-0.5"
          >
            Agendar
          </button>
        </div>
      </div>
    </article>
  )
}

export default PacienteCard
