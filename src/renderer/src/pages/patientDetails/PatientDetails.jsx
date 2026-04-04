import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  CreditCard,
  FileText,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  ShieldPlus,
  UserRound
} from 'lucide-react'
import { getAllPatients } from '../../api/Api'
import ImagesApp from '../../assets/ImagesApp'
import LoadingState from '../../components/loading/LoadingState'

const sideMenuItems = [
  { label: 'Ficha', icon: ClipboardList, href: '#datos-personales' },
  { label: 'Planes de tratamiento', icon: HeartPulse, href: '#tratamientos' },
  { label: 'Documentos', icon: FileText, href: '#resumen-paciente' },
  { label: 'Presupuestos', icon: CreditCard, href: '#balance-paciente' },
  { label: 'Tratamientos realizados', icon: HeartPulse, href: '#tratamientos-realizados' },
  { label: 'Odontograma', icon: ClipboardList, href: '#odontograma' },
  { label: 'Recetas brindadas', icon: FileText, href: '#recetas-brindadas' }
]

const formatDate = (value) => {
  if (!value) {
    return 'No registrado'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('es-BO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const calculateAge = (value) => {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  const monthDifference = today.getMonth() - date.getMonth()

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < date.getDate())) {
    age -= 1
  }

  return age
}

const buildInfoColumns = (patient) => {
  const phoneNumber = patient?.telefono || patient?.phonesNumbers?.[0]?.numero || 'No registrado'
  const emergencyContact =
    patient?.contactoEmergencia ||
    patient?.emergencyContact ||
    patient?.responsable ||
    'No registrado'

  return [
    [
      {
        label: 'Nombre',
        value: `${patient?.nombre || ''} ${patient?.apellido || ''}`.trim() || 'Paciente sin nombre'
      },
      { label: 'Direccion', value: patient?.direccion || 'No registrada' },
      { label: 'Email', value: patient?.email || 'No registrado', accent: true },
      { label: 'Contacto de emergencia', value: emergencyContact },
      { label: 'Fecha de nacimiento', value: formatDate(patient?.fechaNacimiento) }
    ],
    [
      { label: 'Sexo', value: patient?.sexo || patient?.genero || 'No registrado' },
      { label: 'Telefono', value: phoneNumber, accent: true },
      { label: 'Ocupacion', value: patient?.ocupacion || 'No registrada' },
      {
        label: 'Numero de documento',
        value: patient?.ciPaciente || patient?.cedula || patient?.id || 'No registrado'
      },
      { label: 'Notas', value: patient?.notas || patient?.observaciones || 'Sin notas clinicas' }
    ]
  ]
}

const buildClinicalItems = (patient) => [
  {
    label: 'Motivo de la consulta',
    value: patient?.motivoConsulta || patient?.motivo || 'Pendiente de registrar'
  },
  {
    label: 'Antecedentes medicos',
    value: patient?.antecedentesMedicos || patient?.historialMedico || 'Sin antecedentes registrados'
  },
  {
    label: 'Alergias',
    value: patient?.alergias || 'No reportadas'
  },
  {
    label: 'Observaciones',
    value: patient?.observaciones || patient?.notas || 'Sin observaciones adicionales'
  }
]

const PatientDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { patientId } = useParams()
  const [patient, setPatient] = useState(location.state?.patient || null)
  const [isLoading, setIsLoading] = useState(!location.state?.patient)

  useEffect(() => {
    if (location.state?.patient) {
      setPatient(location.state.patient)
      setIsLoading(false)
      return
    }

    let isMounted = true

    const fetchPatient = async () => {
      try {
        const response = await getAllPatients()
        const patientList = Array.isArray(response.data?.data) ? response.data.data : []
        const selectedPatient = patientList.find(
          (item) => `${item.id || item.ciPaciente}` === `${patientId}`
        )

        if (!isMounted) {
          return
        }

        setPatient(selectedPatient || null)
      } catch (error) {
        console.error('Error fetching patient details:', error)
        if (isMounted) {
          setPatient(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchPatient()

    return () => {
      isMounted = false
    }
  }, [location.state, patientId])

  const fullName = useMemo(() => {
    if (!patient) {
      return 'Paciente'
    }

    return `${patient.nombre || ''} ${patient.apellido || ''}`.trim() || 'Paciente sin nombre'
  }, [patient])

  const profileImage = patient?.imagen?.startsWith('http') ? patient.imagen : ImagesApp.defaultImage
  const age = calculateAge(patient?.fechaNacimiento)
  const profileSummary = [
    age ? `${age} años` : null,
    patient?.sexo || patient?.genero || null,
    patient?.ciPaciente ? `CI ${patient.ciPaciente}` : null
  ]
    .filter(Boolean)
    .join(' · ')

  if (isLoading) {
    return (
      <section className="grid gap-y-6 px-2 pb-6 pt-4 lg:gap-y-7">
        <LoadingState
          title="Cargando ficha del paciente"
          description="Estamos recuperando la información clínica desde el backend."
          rows={4}
        />
      </section>
    )
  }

  if (!patient) {
    return (
      <section className="grid gap-y-6 px-2 pb-6 pt-4 lg:gap-y-7">
        <div className="rounded-[28px] border border-dashed border-slate-200 bg-white p-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            No pudimos encontrar al paciente
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            La ficha no existe o no pudimos recuperarla desde el backend.
          </p>
          <button
            type="button"
            onClick={() => navigate('/patient')}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#00b09b] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} />
            Volver a pacientes
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="grid gap-y-6 px-2 pb-6 pt-4 lg:gap-y-7">
      <div className="flex flex-col gap-4 rounded-[28px] border border-white/60 bg-gradient-to-r from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <button
            type="button"
            onClick={() => navigate('/patient')}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <ArrowLeft size={16} />
            Volver a pacientes
          </button>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">
            Ficha del paciente
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Vista integral del perfil, seguimiento clinico y actividad reciente.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            Nuevo documento
          </button>
          <button
            type="button"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            Descargar ficha
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <motion.aside
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden rounded-[28px] border border-[#6dd6c8]/35 bg-[linear-gradient(180deg,#18465b_0%,#176173_45%,#198878_78%,#1aa08d_100%)] text-white shadow-[0_24px_60px_rgba(26,160,141,0.28)]"
        >
          <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(125,233,222,0.34),transparent_58%)] px-6 pb-6 pt-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[30px] border border-white/25 bg-white/15 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.16)] ring-4 ring-[#a6f3ea]/15">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[24px] bg-slate-200/95">
                  <img
                    src={profileImage}
                    alt={fullName}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = ImagesApp.defaultImage
                    }}
                    className="block h-full w-full object-contain object-center"
                  />
                </div>
              </div>
              <h2 className="mt-5 text-2xl font-semibold">{fullName}</h2>
              <p className="mt-2 text-sm text-white/75">{profileSummary || 'Perfil general del paciente'}</p>
              <div className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#7de9de]">
                Ficha nro. {patient?.id || patient?.ciPaciente || 'N/D'}
              </div>
            </div>
          </div>

          <nav className="space-y-2 p-4">
            {sideMenuItems.map((item, index) => {
              const Icon = item.icon

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    index === 0
                      ? 'bg-[#00b09b] text-white shadow-[0_8px_20px_rgba(0,176,155,0.32)]'
                      : 'text-white/82 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-[22px] bg-white/6 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                Contacto rapido
              </p>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#7de9de]" />
                  <span>{patient?.telefono || patient?.phonesNumbers?.[0]?.numero || 'No registrado'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#7de9de]" />
                  <span className="truncate">{patient?.email || 'No registrado'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#7de9de]" />
                  <span>{patient?.direccion || 'No registrada'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        <div id="resumen-paciente" className="grid gap-6">
          <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
            <motion.section
              id="datos-personales"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    Datos personales
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Informacion principal del paciente y datos administrativos.
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full bg-[#00b09b]/10 px-3 py-1.5 text-sm font-semibold text-[#0f766e] transition-colors hover:bg-[#00b09b]/15"
                >
                  Editar
                </button>
              </div>

              <div className="grid gap-8 p-6 md:grid-cols-2">
                {buildInfoColumns(patient).map((column, index) => (
                  <div key={index} className="space-y-5">
                    {column.map((item) => (
                      <div key={item.label}>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                          {item.label}
                        </p>
                        <p
                          className={`mt-1 text-sm ${
                            item.accent
                              ? 'text-sky-600 dark:text-sky-400'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.section>

            <div className="grid gap-6">
              <motion.section
                id="balance-paciente"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
              >
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    Balance actual
                  </h3>
                  <button
                    type="button"
                    className="text-sm font-medium text-sky-600 transition-colors hover:text-sky-500"
                  >
                    Visualizar
                  </button>
                </div>

                <div className="grid gap-4 p-6 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-rose-200 bg-rose-50/60 p-5">
                    <p className="text-sm font-semibold text-slate-700">Por pagar</p>
                    <p className="mt-5 inline-flex rounded-full border border-rose-300 bg-white px-4 py-2 text-xl font-semibold text-rose-500">
                      $0.00
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-emerald-200 bg-emerald-50/70 p-5">
                    <p className="text-sm font-semibold text-slate-700">Total pagado</p>
                    <p className="mt-5 inline-flex rounded-full border border-emerald-300 bg-white px-4 py-2 text-xl font-semibold text-emerald-500">
                      $0.00
                    </p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
              >
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Citas</h3>
                  <Link
                    to="/appointments"
                    className="text-sm font-medium text-sky-600 transition-colors hover:text-sky-500"
                  >
                    Ver agenda
                  </Link>
                </div>

                <div className="p-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#00b09b]/10 text-[#0f766e]">
                    <CalendarDays size={28} />
                  </div>
                  <p className="mt-4 text-base font-semibold text-slate-800 dark:text-slate-100">
                    No hay citas registradas
                  </p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Cuando programes una cita para este paciente aparecera aqui.
                  </p>
                  <Link
                    to="/nueva-cita"
                    className="mt-5 inline-flex items-center rounded-2xl bg-[#00b09b] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-transform hover:-translate-y-0.5 hover:bg-[#0f766e]"
                  >
                    Agendar cita
                  </Link>
                </div>
              </motion.section>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    Historia clinica
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Resumen del contexto medico y observaciones registradas.
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full bg-[#00b09b]/10 px-3 py-1.5 text-sm font-semibold text-[#0f766e] transition-colors hover:bg-[#00b09b]/15"
                >
                  Editar
                </button>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-2">
                {buildClinicalItems(patient).map((item) => (
                  <article
                    key={item.label}
                    className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.value}
                    </p>
                  </article>
                ))}
              </div>
            </motion.section>

            <div className="grid gap-6">
              <motion.section
                id="tratamientos"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
              >
                <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    Tratamientos por hacer
                  </h3>
                </div>

                <div className="p-6">
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60">
                    <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
                      Evaluacion y plan de tratamiento inicial
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <CalendarDays size={16} />
                      <span>Pendiente de programacion</span>
                    </div>
                    <button
                      type="button"
                      className="mt-5 inline-flex rounded-xl bg-[#00b09b] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,176,155,0.22)] transition-transform hover:-translate-y-0.5"
                    >
                      Operar
                    </button>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
              >
                <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    Indicadores
                  </h3>
                </div>

                <div className="grid gap-4 p-6">
                  <div className="rounded-[24px] bg-[#00b09b]/8 p-4">
                    <div className="flex items-center gap-3">
                      <UserRound size={18} className="text-[#0f766e]" />
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Perfil completo
                      </p>
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-[#0f766e]">
                      {patient?.email && patient?.direccion ? '85%' : '60%'}
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-sky-50 p-4">
                    <div className="flex items-center gap-3">
                      <ShieldPlus size={18} className="text-sky-600" />
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Seguimiento clinico
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Listo para completar con tratamientos, presupuestos y documentos.
                    </p>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <article
              id="tratamientos-realizados"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Tratamientos realizados
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Sección añadida. Pendiente de desarrollo.
              </p>
            </article>

            <article
              id="odontograma"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Odontograma
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Sección añadida. Pendiente de desarrollo.
              </p>
            </article>

            <article
              id="recetas-brindadas"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Recetas brindadas
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Sección añadida. Pendiente de desarrollo.
              </p>
            </article>
          </motion.section>
        </div>
      </div>
    </section>
  )
}

export default PatientDetails
