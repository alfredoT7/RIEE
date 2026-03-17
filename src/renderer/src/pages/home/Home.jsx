import { Link } from 'react-router-dom'
import { Calendar, Clock, TrendingUp, Users } from 'lucide-react'
import TopInfoHome from '../../components/topInfoHome/TopInfoHome'
import CardPaciente from '../../components/cardPaciente/CardPaciente'
import ImagesApp from '../../assets/ImagesApp'

const metricCards = [
  { title: 'Calendario', quantity: '10', porcentaje: '20%', icon: Calendar },
  { title: 'Reloj', quantity: '5', porcentaje: '10%', icon: Clock },
  { title: 'Tendencias', quantity: '15', porcentaje: '30%', icon: TrendingUp },
  { title: 'Usuarios', quantity: '50', porcentaje: '40%', icon: Users }
]

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
  { label: 'CI', className: 'basis-[80px] shrink-0' },
  { label: 'Foto', className: 'basis-[30px] shrink-0 text-center' },
  { label: 'Nombre', className: 'ml-2.5 flex-1' },
  { label: 'Tratamiento', className: 'flex-1 pr-2.5' },
  { label: 'Fecha Nac.', className: 'basis-[90px] shrink-0 pr-2.5' },
  { label: 'Teléfono', className: 'basis-[90px] shrink-0' }
]

const recentPatients = [
  {
    ci: '12345600',
    nombre: 'Juan Perez',
    direccion: 'Ortodoncia',
    fechaNacimiento: '12/12/2021',
    numeroTelefonico: 70774739
  },
  {
    ci: '1231',
    nombre: 'Juan Perez',
    direccion: 'Ortodoncia',
    fechaNacimiento: '12/12/2021',
    numeroTelefonico: 70774739
  },
  {
    ci: '12345600',
    nombre: 'Juan Perez',
    direccion: 'Ortodoncia',
    fechaNacimiento: '12/12/2021',
    numeroTelefonico: 70774739
  },
  {
    ci: '12345600',
    nombre: 'Juan Perez',
    direccion: 'Ortodoncia',
    fechaNacimiento: '12/12/2021',
    numeroTelefonico: 70774739
  },
  {
    ci: '12345600',
    nombre: 'Juan Perez',
    direccion: 'Ortodoncia',
    fechaNacimiento: '12/12/2021',
    numeroTelefonico: 70774739
  }
]

const Home = () => {
  return (
    <section className="grid gap-y-6 px-2 pb-6 pt-4 lg:gap-y-7">
      <div className="flex justify-center rounded-[28px] border border-white/60 bg-gradient-to-r from-[#f9fffd] via-white to-[#eef8f6] px-4 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none">
        <img
          src={ImagesApp.rieeLogo}
          alt="RIEE"
          className="h-20 w-full max-w-[340px] object-contain sm:h-24 sm:max-w-[420px]"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:gap-5">
        {metricCards.map((card) => (
          <TopInfoHome key={card.title} {...card} />
        ))}
      </div>

      <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none sm:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
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
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-[1.15rem] font-semibold text-slate-800 dark:text-slate-100">Pacientes recientes</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Últimos registros atendidos y seguimiento activo del día.
            </p>
          </div>
          <Link
            to="/patient"
            className="inline-flex w-fit items-center rounded-full border border-[#00b09b]/20 bg-[#00b09b]/8 px-4 py-2 text-sm font-medium text-[#0f766e] transition-colors hover:bg-[#00b09b]/14"
          >
            Ver más pacientes
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-2 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mb-2 hidden items-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-slate-500 md:flex dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            {patientHeaderCells.map((cell) => (
              <div key={cell.label} className={cell.className}>
                {cell.label}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {recentPatients.map((patient, index) => (
              <CardPaciente
                key={`${patient.ci}-${index}`}
                ci={patient.ci}
                nombre={patient.nombre}
                direccion={patient.direccion}
                fechaNacimiento={patient.fechaNacimiento}
                numeroTelefonico={patient.numeroTelefonico}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
