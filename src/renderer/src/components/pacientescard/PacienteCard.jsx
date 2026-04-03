import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, FileText, Mail, MapPin, Phone, SquarePen, Trash } from 'lucide-react'
import ImagesApp from '../../assets/ImagesApp'

const PacienteCard = ({ patient }) => {
  const navigate = useNavigate()
  const patientId = patient?.id || patient?.ciPaciente
  const fullName = `${patient?.nombre || ''} ${patient?.apellido || ''}`.trim() || 'Paciente sin nombre'
  const imageSrc = patient?.imagen?.startsWith('http') ? patient.imagen : ImagesApp.defaultImage
  const phoneNumber = patient?.telefono || patient?.phonesNumbers?.[0]?.numero || 'Sin teléfono'
  const email = patient?.email || 'Sin email registrado'
  const address = patient?.direccion || 'Dirección no registrada'
  const birthDate = patient?.fechaNacimiento || 'Sin fecha'

  const handleOpenDetails = () => {
    if (!patientId) {
      return
    }

    navigate(`/patient/${patientId}`, {
      state: { patient }
    })
  }

  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4 pb-1">
          <div className="flex min-w-0 items-center gap-4">
            <img
              src={imageSrc}
              alt={fullName}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = ImagesApp.defaultImage
              }}
              className="h-14 w-14 rounded-2xl object-cover ring-2 ring-[#00b09b]/10"
            />
            <div className="min-w-0">
              <h5 className="truncate text-base font-semibold text-slate-800 dark:text-slate-100">{fullName}</h5>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                {birthDate} · CI: {patient?.ciPaciente || patient?.id || 'N/D'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenDetails}
              title="Ver detalles del paciente"
              className="cursor-pointer rounded-xl border border-slate-200 p-2 text-slate-500 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-sky-800 dark:hover:bg-sky-950/40 dark:hover:text-sky-400"
            >
              <Eye size={16} />
            </button>
            <button
              type="button"
              title="Editar paciente"
              className="cursor-pointer rounded-xl border border-slate-200 p-2 text-slate-500 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:text-slate-400 dark:hover:border-[#00b09b]/40 dark:hover:bg-[#00b09b]/15 dark:hover:text-[#4dd0c1]"
            >
              <SquarePen size={16} />
            </button>
            <button
              type="button"
              title="Eliminar paciente"
              className="cursor-pointer rounded-xl border border-slate-200 p-2 text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-rose-800 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="grid gap-3 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-[#0f766e]" />
              <p>{phoneNumber}</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-[#0f766e]" />
              <p>{email}</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-[#0f766e]" />
              <p>{address}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm md:grid-cols-2 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              Última visita
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-100">{patient?.ultimaVisita || 'Sin registros recientes'}</p>
            <button
              type="button"
              className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-[#00b09b]/40 dark:hover:bg-[#00b09b]/15 dark:hover:text-[#4dd0c1]"
            >
              <FileText size={16} />
              Historia
            </button>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              Próxima cita
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-100">{patient?.proximaCita || 'Sin cita programada'}</p>
            <button
              type="button"
              className="mt-3 inline-flex cursor-pointer items-center rounded-xl bg-[#00b09b] px-3 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,176,155,0.22)] transition-transform hover:-translate-y-0.5 dark:bg-[#0f766e] dark:shadow-[0_10px_20px_rgba(15,118,110,0.25)]"
            >
              Agendar
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PacienteCard
