import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  ArrowLeft,
  CalendarDays,
  CalendarPlus,
  Clock3,
  FileText,
  Hourglass,
  MessageSquare,
  Sparkles,
  Stethoscope,
  UserRound,
  X
} from 'lucide-react'
import PatientSearch from '../../components/patientSearch/PatientSearch'
import { getAllPatients, registerAppointment } from '../../api/Api'

const fieldClassName =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#00b09b] focus:bg-white focus:ring-4 focus:ring-[#00b09b]/15 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#00b09b] dark:focus:bg-slate-900'

const inputWithIconClassName =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#00b09b] focus:bg-white focus:ring-4 focus:ring-[#00b09b]/15 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#00b09b] dark:focus:bg-slate-900'

const estadoColors = {
  Programada: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Confirmada: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'En espera': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
}

const RequiredDot = () => (
  <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden />
)

const FieldLabel = ({ icon: Icon, children, required }) => (
  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
    {Icon && <Icon size={14} className="text-[#0f766e] dark:text-[#34d399]" />}
    {children}
    {required && <RequiredDot />}
  </label>
)

const NewAppointment = () => {
  const navigate = useNavigate()
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    motivo: '',
    duracion: '30',
    estado: 'Programada',
    observaciones: ''
  })

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatients()
        setPatients(Array.isArray(response.data?.data) ? response.data.data : [])
      } catch (error) {
        console.error('Error fetching patients:', error)
        setPatients([])
      }
    }

    fetchPatients()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedPatient) {
      toast.error('Selecciona un paciente antes de continuar')
      return
    }

    try {
      await registerAppointment({
        fechaCita: formData.fecha,
        horaCita: formData.hora,
        motivoCita: formData.motivo,
        estadoCita: formData.estado,
        observacionesCita: formData.observaciones,
        duracionEstimada: parseInt(formData.duracion, 10),
        patientId: selectedPatient,
        appointmentStatusId: 1
      })

      toast.success('Cita creada exitosamente')
      navigate('/appointments')
    } catch (error) {
      console.error('Error creating appointment:', error)
      toast.error('No se pudo crear la cita')
    }
  }

  const formattedDate = formData.fecha
    ? new Date(formData.fecha + 'T00:00:00').toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : null

  return (
    <div className="flex w-full justify-center px-4 pb-8 pt-3">
      <section className="flex w-full max-w-3xl flex-col gap-6">
      {/* ── Header card ── */}
      <div className="relative overflow-hidden rounded-[24px] border border-white/70 bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(0,176,155,0.4), transparent 70%)' }}
        />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => navigate('/appointments')}
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition-all hover:-translate-y-0.5 hover:border-[#00b09b]/40 hover:text-[#0f766e] hover:shadow-[0_6px_18px_rgba(0,176,155,0.15)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              title="Volver"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f766e] dark:bg-white/10 dark:text-[#8cecdf]">
                <Sparkles size={12} />
                Programar
              </div>
              <h1 className="mt-3 text-2xl font-semibold text-slate-800 dark:text-slate-100">
                Nueva cita
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Programa una cita y relacionala con un paciente registrado.
              </p>
            </div>
          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-2xl bg-gradient-to-br from-[#00b09b] to-[#00c9a7] text-white shadow-[0_10px_28px_rgba(0,176,155,0.30)] lg:self-auto">
            <CalendarPlus size={24} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* ── Patient section ── */}
        <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00b09b]/10 text-[#0f766e] dark:bg-[#00b09b]/20 dark:text-[#34d399]">
              <UserRound size={18} />
            </span>
            <div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                Informacion del paciente
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Busca por nombre, CI o telefono
              </p>
            </div>
          </div>

          <PatientSearch
            patients={patients}
            onPatientSelect={setSelectedPatient}
            placeholder="Buscar paciente por nombre, CI o telefono"
          />

          {selectedPatient && (
            <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Paciente seleccionado
              </div>
            </div>
          )}
        </div>

        {/* ── Appointment details ── */}
        <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00b09b]/10 text-[#0f766e] dark:bg-[#00b09b]/20 dark:text-[#34d399]">
              <CalendarDays size={18} />
            </span>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                Detalles de la cita
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Define motivo, fecha, hora y duracion
              </p>
            </div>
            {formData.estado && (
              <span
                className={`hidden rounded-full px-3 py-1 text-[11px] font-bold sm:inline-flex ${estadoColors[formData.estado]}`}
              >
                {formData.estado}
              </span>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <FieldLabel icon={Stethoscope} required>
                Motivo
              </FieldLabel>
              <div className="relative">
                <Stethoscope
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />
                <input
                  name="motivo"
                  value={formData.motivo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, motivo: e.target.value }))}
                  placeholder="Consulta general, limpieza dental..."
                  required
                  className={inputWithIconClassName}
                />
              </div>
            </div>

            <div>
              <FieldLabel icon={Sparkles}>Estado</FieldLabel>
              <select
                name="estado"
                value={formData.estado}
                onChange={(e) => setFormData((prev) => ({ ...prev, estado: e.target.value }))}
                className={fieldClassName}
              >
                <option value="Programada">Programada</option>
                <option value="Confirmada">Confirmada</option>
                <option value="En espera">En espera</option>
              </select>
            </div>

            <div>
              <FieldLabel icon={Hourglass}>Duracion estimada</FieldLabel>
              <select
                name="duracion"
                value={formData.duracion}
                onChange={(e) => setFormData((prev) => ({ ...prev, duracion: e.target.value }))}
                className={fieldClassName}
              >
                <option value="30">30 minutos</option>
                <option value="60">60 minutos</option>
                <option value="90">90 minutos</option>
                <option value="120">120 minutos</option>
              </select>
            </div>

            <div>
              <FieldLabel icon={CalendarDays} required>
                Fecha
              </FieldLabel>
              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fecha: e.target.value }))}
                  required
                  className={inputWithIconClassName}
                />
              </div>
              {formattedDate && (
                <p className="mt-1.5 pl-1 text-xs capitalize text-[#0f766e] dark:text-[#34d399]">
                  {formattedDate}
                </p>
              )}
            </div>

            <div>
              <FieldLabel icon={Clock3} required>
                Hora
              </FieldLabel>
              <div className="relative">
                <Clock3
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />
                <select
                  name="hora"
                  value={formData.hora}
                  onChange={(e) => setFormData((prev) => ({ ...prev, hora: e.target.value }))}
                  required
                  className={inputWithIconClassName}
                >
                  <option value="">Seleccionar hora</option>
                  {[
                    '08:00',
                    '08:30',
                    '09:00',
                    '09:30',
                    '10:00',
                    '10:30',
                    '11:00',
                    '11:30',
                    '14:00',
                    '14:30',
                    '15:00',
                    '15:30',
                    '16:00',
                    '16:30',
                    '17:00'
                  ].map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <FieldLabel icon={MessageSquare}>Observaciones</FieldLabel>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, observaciones: e.target.value }))
              }
              rows="4"
              placeholder="Indicaciones o contexto adicional..."
              className={`${fieldClassName} resize-none leading-6`}
            />
            <p className="mt-1.5 flex items-center gap-1.5 pl-1 text-[11px] text-slate-400 dark:text-slate-500">
              <FileText size={11} />
              Opcional · usa este espacio para notas internas
            </p>
          </div>
        </div>

        {/* ── Action bar ── */}
        <div className="sticky bottom-2 z-10 rounded-[24px] border border-slate-200/80 bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.10)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-500" />
              Los campos marcados son obligatorios
            </p>
            <div className="flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/appointments')}
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <X size={15} />
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-r from-[#00b09b] to-[#00c9a7] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(0,176,155,0.32)]"
              >
                <CalendarPlus size={15} />
                Guardar cita
              </button>
            </div>
          </div>
        </div>
      </form>
      </section>
    </div>
  )
}

export default NewAppointment
