import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Activity,
  Calendar,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  ScanLine,
  TrendingUp,
  UserRound,
  Users
} from 'lucide-react'
import TopInfoHome from '../../components/topInfoHome/TopInfoHome'
import CardPaciente from '../../components/cardPaciente/CardPaciente'
import ImagesApp from '../../assets/ImagesApp'
import VideosApp from '../../assets/VideosApp'
import { getAllPatients } from '../../api/Api'
import LoadingState from '../../components/loading/LoadingState'

const baseMetricCards = [
  { title: 'Calendario', quantity: '10', porcentaje: '20%', icon: Calendar },
  { title: 'Reloj', quantity: '5', porcentaje: '10%', icon: Clock },
  { title: 'Tendencias', quantity: '15', porcentaje: '30%', icon: TrendingUp },
  { title: 'Usuarios', quantity: '50', porcentaje: '40%', icon: Users }
]

const boliviaTimeFormatter = new Intl.DateTimeFormat('es-BO', {
  timeZone: 'America/La_Paz',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
})

const newsItems = [
  {
    title: 'Nuevo equipo de radiografía',
    description:
      'Se incorporó un sistema digital de última generación para agilizar diagnósticos, reducir tiempos de espera y mejorar la precisión de cada evaluación.',
    icon: ScanLine,
    iconLabel: 'Radiografía digital',
    iconSub: 'Sistema activo en consulta general.',
    checks: [
      'Diagnóstico inicial más rápido por paciente.',
      'Menor repetición de toma por mejor calidad de imagen.'
    ]
  },
  {
    title: 'Ampliación de horario de atención',
    description:
      'A partir de mayo, el consultorio extiende su horario de atención para cubrir mayor demanda y reducir las listas de espera de pacientes.',
    icon: Clock,
    iconLabel: 'Nuevo horario',
    iconSub: 'Lunes a viernes hasta las 20:00.',
    checks: [
      'Mayor disponibilidad de turnos por la tarde.',
      'Reducción del tiempo de espera promedio en un 35%.'
    ]
  },
  {
    title: 'Actualización del sistema de historial',
    description:
      'El módulo de historial clínico fue renovado para permitir búsquedas más rápidas y un acceso seguro desde cualquier sesión autorizada.',
    icon: Activity,
    iconLabel: 'Historial clínico',
    iconSub: 'Módulo disponible para todos los médicos.',
    checks: [
      'Búsqueda por CI, nombre o fecha en tiempo real.',
      'Registro de cambios con trazabilidad completa.'
    ]
  }
]

const treatmentItems = [
  {
    nombre: 'María Fernández',
    ci: '6845123 LP',
    tratamiento: 'Tratamiento de conductos',
    sesion: 'Sesión 3 de 5',
    proximaCita: '30/04/2026 - 09:30',
    estadoClinico: 'Evolución favorable',
    progreso: 60,
    responsable: 'Dra. Valeria Rojas',
    observacion: 'Sin dolor post sesión, continuar protocolo.'
  },
  {
    nombre: 'Carlos Mendoza',
    ci: '5123874 CB',
    tratamiento: 'Ortodoncia correctiva',
    sesion: 'Sesión 7 de 12',
    proximaCita: '02/05/2026 - 11:00',
    estadoClinico: 'Progreso estable',
    progreso: 58,
    responsable: 'Dr. Andrés Quiroga',
    observacion: 'Ajuste de brackets realizado sin complicaciones.'
  },
  {
    nombre: 'Luisa Vargas',
    ci: '7234561 OR',
    tratamiento: 'Blanqueamiento dental',
    sesion: 'Sesión 2 de 3',
    proximaCita: '05/05/2026 - 14:30',
    estadoClinico: 'Respuesta positiva',
    progreso: 66,
    responsable: 'Dra. Valeria Rojas',
    observacion: 'Sensibilidad leve esperada, aplicar gel protector.'
  }
]

const patientHeaderCells = [
  { label: 'CI', className: '' },
  { label: 'Foto', className: 'text-center' },
  { label: 'Nombre', className: '' },
  { label: 'Tratamiento', className: '' },
  { label: 'Fecha Nac.', className: '' },
  { label: 'Teléfono', className: '' },
  { label: '', className: '' }
]

const formatBirthDate = (value) => {
  if (!value) {
    return 'Sin fecha'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('es-BO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

const Home = () => {
  const [showVideo, setShowVideo] = useState(false)
  const [boliviaTime, setBoliviaTime] = useState(() => boliviaTimeFormatter.format(new Date()))
  const [recentPatients, setRecentPatients] = useState([])
  const [isLoadingPatients, setIsLoadingPatients] = useState(true)
  const [newsIndex, setNewsIndex] = useState(0)
  const [treatmentIndex, setTreatmentIndex] = useState(0)

  const prevNews = () => setNewsIndex((i) => (i - 1 + newsItems.length) % newsItems.length)
  const nextNews = () => setNewsIndex((i) => (i + 1) % newsItems.length)
  const prevTreatment = () =>
    setTreatmentIndex((i) => (i - 1 + treatmentItems.length) % treatmentItems.length)
  const nextTreatment = () => setTreatmentIndex((i) => (i + 1) % treatmentItems.length)

  useEffect(() => {
    const t = window.setInterval(nextNews, 4000)
    return () => window.clearInterval(t)
  }, [])

  useEffect(() => {
    const t = window.setInterval(nextTreatment, 4000)
    return () => window.clearInterval(t)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShowVideo((current) => !current)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const clockTimer = window.setInterval(() => {
      setBoliviaTime(boliviaTimeFormatter.format(new Date()))
    }, 1000)

    return () => window.clearInterval(clockTimer)
  }, [])

  useEffect(() => {
    const fetchRecentPatients = async () => {
      setIsLoadingPatients(true)

      try {
        const response = await getAllPatients()
        const patients = Array.isArray(response.data?.data) ? response.data.data : []
        const normalizedPatients = patients.slice(0, 5).map((patient) => ({
          ci: patient.ciPaciente,
          imagen: patient.imagen,
          nombre:
            `${patient.nombre || ''} ${patient.apellido || ''}`.trim() || 'Paciente sin nombre',
          direccion: patient.ultimaVisita || patient.ocupacion || 'Sin seguimiento registrado',
          fechaNacimiento: formatBirthDate(patient.fechaNacimiento),
          numeroTelefonico: patient.phonesNumbers?.[0]?.numero || 'N/A',
          patient
        }))

        setRecentPatients(normalizedPatients)
      } catch (error) {
        console.error('Error fetching recent patients:', error)
        setRecentPatients([])
      } finally {
        setIsLoadingPatients(false)
      }
    }

    fetchRecentPatients()
  }, [])

  const metricCards = [
    {
      title: 'Reloj Bolivia',
      quantity: boliviaTime,
      porcentaje: 'UTC-4',
      icon: Clock,
      note: 'America/La Paz'
    },
    ...baseMetricCards
  ]

  return (
    <section className="grid gap-y-6 px-2 pb-6 pt-4 lg:gap-y-7">
      <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-gradient-to-r from-[#f9fffd] via-white to-[#eef8f6] shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(92,225,212,0.22),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative flex h-[220px] w-full items-center justify-center sm:h-[260px]">
          <AnimatePresence mode="wait">
            {showVideo ? (
              <motion.div
                key="video"
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.985, filter: 'blur(6px)' }}
                transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <video
                  className="h-full w-full object-cover"
                  src={VideosApp.video1}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#062b2f]/30 via-transparent to-[#062b2f]/20" />
                <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(92,225,212,0.12)_35%,transparent_55%,rgba(92,225,212,0.14)_100%)]" />
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.55)_48%,transparent_62%)]"
                  initial={{ x: '-120%', opacity: 0 }}
                  animate={{ x: '120%', opacity: [0, 1, 0] }}
                  transition={{ duration: 1.1, ease: 'easeInOut' }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="logo"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
                transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={ImagesApp.rieeLogo}
                  alt="RIEE"
                  className="h-28 w-full max-w-[360px] object-contain drop-shadow-[0_12px_35px_rgba(0,0,0,0.14)] sm:h-32 sm:max-w-[460px]"
                />
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(92,225,212,0.16),transparent_48%)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.45] }}
                  transition={{ duration: 1.15, ease: 'easeOut' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-y-0 left-0 w-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.38),transparent)] dark:bg-[linear-gradient(90deg,rgba(15,23,42,0.45),transparent)]" />
          <div className="absolute inset-y-0 right-0 w-20 bg-[linear-gradient(270deg,rgba(255,255,255,0.38),transparent)] dark:bg-[linear-gradient(270deg,rgba(15,23,42,0.45),transparent)]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5 2xl:gap-5">
        {metricCards.map((card) => (
          <TopInfoHome key={card.title} {...card} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none sm:p-6">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-[1.15rem] font-semibold text-slate-800 dark:text-slate-100">
                Novedades
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Resumen rápido de mejoras y movimientos recientes del consultorio.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-[#00b09b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                Hoy
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevNews}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-[#00b09b]/40 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="min-w-[36px] text-center text-xs text-slate-400 dark:text-slate-500">
                  {newsIndex + 1}/{newsItems.length}
                </span>
                <button
                  onClick={nextNews}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-[#00b09b]/40 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {newsItems.map((item, i) =>
              i === newsIndex ? (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-[#d9ece8] bg-white p-5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
                >
                  <div className="mb-4 h-1.5 w-14 rounded-full bg-gradient-to-r from-[#00b09b] to-[#5ce1d4]" />
                  <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-[170px_minmax(0,1fr)]">
                    <div className="rounded-xl border border-[#00b09b]/25 bg-[#00b09b]/8 p-3">
                      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#0f766e]">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {item.iconLabel}
                      </p>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        {item.iconSub}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
                      <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                        {item.checks.map((check, ci) => (
                          <li key={ci} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#0f766e]" />
                            <span>{check}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              ) : null
            )}
          </AnimatePresence>
        </div>

        <aside className="rounded-[24px] border border-white/60 bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none sm:p-6">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h3 className="text-[1.15rem] font-semibold text-slate-800 dark:text-slate-100">
                Estado de tratamientos
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Estado actual por fase clínica.
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={prevTreatment}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-[#00b09b]/40 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="min-w-[36px] text-center text-xs text-slate-400 dark:text-slate-500">
                {treatmentIndex + 1}/{treatmentItems.length}
              </span>
              <button
                onClick={nextTreatment}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-[#00b09b]/40 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {treatmentItems.map((t, i) =>
              i === treatmentIndex ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00b09b]/15 text-[#0f766e]">
                      <UserRound className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {t.nombre}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">CI: {t.ci}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                      <Activity className="h-4 w-4 text-[#0f766e]" />
                      <span>{t.tratamiento}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                      <Calendar className="h-4 w-4 text-[#0f766e]" />
                      <span>{t.sesion}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                      <CalendarClock className="h-4 w-4 text-[#0f766e]" />
                      <span>Próxima cita: {t.proximaCita}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="h-4 w-4 text-[#0f766e]" />
                      <span>Estado clínico: {t.estadoClinico}</span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                        Progreso
                      </span>
                      <span className="font-semibold text-[#0f766e] dark:text-[#5ce1d4]">
                        {t.progreso}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-2 rounded-full bg-[#00b09b]"
                        style={{ width: `${t.progreso}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Responsable: {t.responsable}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Observación: {t.observacion}
                    </p>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </aside>
      </div>

      <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none sm:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-[1.15rem] font-semibold text-slate-800 dark:text-slate-100">
              Pacientes recientes
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Últimos registros atendidos y seguimiento activo del día.
            </p>
          </div>
          <Link
            to="/patient"
            className="inline-flex w-fit cursor-pointer items-center rounded-full border border-[#00b09b]/20 bg-[#00b09b]/8 px-4 py-2 text-sm font-medium text-[#0f766e] transition-colors hover:bg-[#00b09b]/14"
          >
            Ver más pacientes
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-2 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mb-2 hidden grid-cols-[80px_36px_minmax(170px,1fr)_minmax(180px,1fr)_120px_130px_36px] items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-slate-500 md:grid dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            {patientHeaderCells.map((cell) => (
              <div key={cell.label} className={cell.className}>
                {cell.label}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {isLoadingPatients && (
              <LoadingState
                title="Cargando pacientes recientes"
                description="Estamos preparando los últimos registros atendidos."
                rows={3}
                className="border-none p-0 shadow-none"
              />
            )}

            {!isLoadingPatients &&
              recentPatients.map((patient, index) => (
                <CardPaciente
                  key={`${patient.ci}-${index}`}
                  ci={patient.ci}
                  imagen={patient.imagen}
                  nombre={patient.nombre}
                  direccion={patient.direccion}
                  fechaNacimiento={patient.fechaNacimiento}
                  numeroTelefonico={patient.numeroTelefonico}
                  patient={patient.patient}
                />
              ))}

            {!isLoadingPatients && recentPatients.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                No hay pacientes recientes para mostrar.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
