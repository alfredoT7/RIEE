import { ArrowLeft } from 'lucide-react'

const PatientHeader = ({ onBack }) => (
  <div className="flex flex-col gap-y-20 rounded-[28px] border border-white/60 bg-gradient-to-r from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none sm:flex-row sm:items-center sm:justify-between sm:p-6">
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex cursor-pointer items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
      >
        <ArrowLeft size={16} />
        Volver a pacientes
      </button>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">Ficha del paciente</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Vista integral del perfil, seguimiento clínico y actividad reciente.
      </p>
    </div>

    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
      >
        Nuevo documento
      </button>
      <button
        type="button"
        className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
      >
        Descargar ficha
      </button>
    </div>
  </div>
)

export default PatientHeader
