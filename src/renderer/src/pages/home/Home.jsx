import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, TrendingUp, Users } from 'lucide-react'
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
    description: 'Se incorporó un sistema digital de última generación para agilizar diagnósticos.'
  },
  {
    title: 'Agenda optimizada',
    description: 'Los recordatorios y confirmaciones mejoran la organización diaria del consultorio.'
  },
  {
    title: 'Atención más cercana',
    description: 'Se actualizaron los flujos de seguimiento para ofrecer una experiencia más clara al paciente.'
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
          nombre: `${patient.nombre || ''} ${patient.apellido || ''}`.trim() || 'Paciente sin nombre',
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
    { title: 'Reloj Bolivia', quantity: boliviaTime, porcentaje: 'UTC-4', icon: Clock, note: 'America/La Paz' },
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

      <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none sm:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-[1.15rem] font-semibold text-slate-800 dark:text-slate-100">Novedades</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Resumen rápido de mejoras y movimientos recientes del consultorio.
            </p>
          </div>
          <div className="rounded-full bg-[#00b09b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
            Hoy
          </div>
        </div>

        <div className="grid gap-4 lg:gap-5 md:grid-cols-3">
          {newsItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#d9ece8] bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
            >
              <div className="mb-4 h-1.5 w-14 rounded-full bg-gradient-to-r from-[#00b09b] to-[#5ce1d4]" />
              <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none sm:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-[1.15rem] font-semibold text-slate-800 dark:text-slate-100">Pacientes recientes</h3>
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
