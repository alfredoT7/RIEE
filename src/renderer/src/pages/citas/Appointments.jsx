import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, Clock3, Activity, Users, TrendingUp, TrendingDown, Plus, ChevronRight } from 'lucide-react'

const summaryCards = [
  {
    title: 'Total citas',
    value: '24',
    change: '+3 vs semana anterior',
    trend: 'up',
    icon: CalendarDays,
    accent: 'from-sky-500 to-cyan-400',
    glow: 'rgba(14,165,233,0.18)',
    bg: 'from-sky-50 to-cyan-50',
    darkBg: 'dark:from-sky-950/40 dark:to-cyan-950/30'
  },
  {
    title: 'Nuevos pacientes',
    value: '8',
    change: '+2 vs semana anterior',
    trend: 'up',
    icon: Users,
    accent: 'from-emerald-500 to-teal-400',
    glow: 'rgba(16,185,129,0.18)',
    bg: 'from-emerald-50 to-teal-50',
    darkBg: 'dark:from-emerald-950/40 dark:to-teal-950/30'
  },
  {
    title: 'Horas programadas',
    value: '32h',
    change: '+5h vs semana anterior',
    trend: 'up',
    icon: Clock3,
    accent: 'from-violet-500 to-purple-400',
    glow: 'rgba(139,92,246,0.18)',
    bg: 'from-violet-50 to-purple-50',
    darkBg: 'dark:from-violet-950/40 dark:to-purple-950/30'
  },
  {
    title: 'Tratamientos',
    value: '18',
    change: '-2 vs semana anterior',
    trend: 'down',
    icon: Activity,
    accent: 'from-blue-500 to-indigo-400',
    glow: 'rgba(99,102,241,0.18)',
    bg: 'from-blue-50 to-indigo-50',
    darkBg: 'dark:from-blue-950/40 dark:to-indigo-950/30'
  }
]

const treatmentColors = {
  'Consulta inicial': 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300',
  'Limpieza dental': 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
  Ortodoncia: 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
  Consulta: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  'Extraccion dental': 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
  Extraccion: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
  'Revision de ortodoncia': 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
  Endodoncia: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  'Implante dental': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  Blanqueamiento: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300',
  'Cirugia oral': 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
  Emergencia: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
  Odontopediatria: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300',
  'Corona dental': 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
  'Puente dental': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300'
}

const getTreatmentColor = (treatment) =>
  treatmentColors[treatment] || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'

const appointmentsData = {
  Dia: {
    '2025-08-01': [
      { time: '09:00', patient: 'Andrea Moreno', treatment: 'Consulta inicial', duration: 30 },
      { time: '10:30', patient: 'Diego Herrera', treatment: 'Limpieza dental', duration: 60 },
      { time: '14:00', patient: 'Patricia Luna', treatment: 'Ortodoncia', duration: 45 },
      { time: '15:30', patient: 'Ricardo Vega', treatment: 'Consulta', duration: 30 }
    ],
    '2025-08-22': [
      { time: '08:00', patient: 'Juan Perez', treatment: 'Consulta inicial', duration: 30 },
      { time: '09:00', patient: 'Maria Garcia', treatment: 'Limpieza dental', duration: 60 },
      { time: '11:00', patient: 'Carlos Rodriguez', treatment: 'Extraccion dental', duration: 30 },
      { time: '13:00', patient: 'Ana Martinez', treatment: 'Revision de ortodoncia', duration: 90 },
      { time: '15:30', patient: 'Laura Sanchez', treatment: 'Endodoncia', duration: 120 },
      { time: '17:00', patient: 'Roberto Gomez', treatment: 'Consulta', duration: 30 }
    ]
  },
  Semana: {
    Lunes: [
      { time: '09:00', patient: 'Pedro Lopez', treatment: 'Implante dental', duration: 120 },
      { time: '14:00', patient: 'Sofia Vega', treatment: 'Blanqueamiento', duration: 60 }
    ],
    Martes: [
      { time: '08:30', patient: 'Miguel Torres', treatment: 'Cirugia oral', duration: 90 },
      { time: '11:00', patient: 'Elena Ruiz', treatment: 'Emergencia', duration: 30 }
    ],
    Miercoles: [
      { time: '10:00', patient: 'Carmen Herrera', treatment: 'Odontopediatria', duration: 45 },
      { time: '13:30', patient: 'Fernando Silva', treatment: 'Corona dental', duration: 90 }
    ],
    Jueves: [
      { time: '08:00', patient: 'Luisa Morales', treatment: 'Puente dental', duration: 120 },
      { time: '16:00', patient: 'Antonio Jimenez', treatment: 'Limpieza dental', duration: 60 }
    ],
    Viernes: [
      { time: '09:30', patient: 'Isabella Cruz', treatment: 'Consulta inicial', duration: 30 },
      { time: '11:00', patient: 'Rodrigo Mendoza', treatment: 'Extraccion', duration: 45 },
      { time: '14:30', patient: 'Natalia Guerrero', treatment: 'Ortodoncia', duration: 60 }
    ]
  },
  Mes: [
    { date: '1', count: 8 },
    { date: '2', count: 6 },
    { date: '3', count: 0 },
    { date: '4', count: 0 },
    { date: '5', count: 12 },
    { date: '6', count: 9 },
    { date: '7', count: 7 },
    { date: '8', count: 11 },
    { date: '9', count: 5 },
    { date: '10', count: 0 },
    { date: '11', count: 0 },
    { date: '12', count: 8 },
    { date: '13', count: 10 },
    { date: '14', count: 6 },
    { date: '15', count: 9 },
    { date: '16', count: 7 },
    { date: '17', count: 0 },
    { date: '18', count: 0 },
    { date: '19', count: 12 },
    { date: '20', count: 8 },
    { date: '21', count: 11 },
    { date: '22', count: 14 },
    { date: '23', count: 6 },
    { date: '24', count: 0 },
    { date: '25', count: 0 },
    { date: '26', count: 9 },
    { date: '27', count: 8 },
    { date: '28', count: 7 },
    { date: '29', count: 10 },
    { date: '30', count: 5 },
    { date: '31', count: 8 }
  ]
}

const viewOptions = ['Dia', 'Semana', 'Mes']

const getCountIntensity = (count) => {
  if (count === 0) return null
  if (count <= 6) return 'low'
  if (count <= 10) return 'mid'
  return 'high'
}

const Appointments = () => {
  const navigate = useNavigate()
  const [currentView, setCurrentView] = useState('Dia')
  const [selectedDay, setSelectedDay] = useState(22)

  const selectedDateKey = `2025-08-${selectedDay.toString().padStart(2, '0')}`

  const currentDayAppointments = useMemo(
    () => appointmentsData.Dia[selectedDateKey] || [],
    [selectedDateKey]
  )

  const currentWeekAppointments = useMemo(() => Object.entries(appointmentsData.Semana), [])

  const formatCurrentDate = () => {
    if (currentView === 'Dia') {
      const date = new Date(2025, 7, selectedDay)
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    if (currentView === 'Semana') return 'Semana del 19 al 25 de agosto de 2025'
    return 'Agosto 2025'
  }

  return (
    <section className="space-y-6 px-2 pb-8 pt-3">
      {/* Summary Cards */}
      <div className="rounded-[24px] border border-white/70 bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none">
        <div className="mb-5">
          <h2 className="text-[1.2rem] font-semibold text-slate-800 dark:text-slate-100">
            Resumen de citas
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Vista general de citas, ocupación y movimiento semanal.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon
            const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown

            return (
              <div
                key={card.title}
                className={`group relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-gradient-to-br ${card.bg} ${card.darkBg} p-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(15,23,42,0.1)] dark:border-slate-800`}
              >
                <div
                  className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20 blur-2xl"
                  style={{ background: `radial-gradient(circle, ${card.glow}, transparent 70%)` }}
                />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      {card.title}
                    </p>
                    <h3 className="mt-2 text-3xl font-bold text-slate-800 dark:text-slate-100">
                      {card.value}
                    </h3>
                  </div>
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
                <div
                  className={`mt-4 flex items-center gap-1.5 text-sm font-semibold ${
                    card.trend === 'up'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  <TrendIcon size={14} />
                  {card.change}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Agenda */}
      <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-[1.2rem] font-semibold text-slate-800 dark:text-slate-100">
              Agenda
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Gestión de agenda y citas programadas.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/nueva-cita')}
            className="inline-flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-[#00b09b] to-[#00c9a7] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,176,155,0.30)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,176,155,0.38)]"
          >
            <Plus size={16} />
            Nueva cita
          </button>
        </div>

        {/* View Controls */}
        <div className="mt-5 flex flex-col gap-4 rounded-[20px] border border-slate-200/80 bg-slate-50/80 p-4 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800 dark:bg-slate-900/60">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
              Vista actual
            </p>
            <h3 className="mt-1 text-base font-semibold capitalize text-slate-800 dark:text-slate-100">
              {formatCurrentDate()}
            </h3>
          </div>

          <div className="flex gap-1.5 rounded-2xl border border-slate-200/80 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
            {viewOptions.map((view) => {
              const isActive = currentView === view
              return (
                <button
                  key={view}
                  type="button"
                  className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00b09b] to-[#00c9a7] text-white shadow-[0_6px_16px_rgba(0,176,155,0.28)]'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                  }`}
                  onClick={() => setCurrentView(view)}
                >
                  {view}
                </button>
              )
            })}
          </div>
        </div>

        {/* Day View */}
        {currentView === 'Dia' && (
          <div className="mt-5 grid gap-4 lg:grid-cols-[200px_minmax(0,1fr)]">
            {/* Day picker */}
            <div className="rounded-[20px] border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Agosto 2025
              </p>
              <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7 lg:grid-cols-4">
                {appointmentsData.Mes.map((day) => {
                  const isSelected = Number(day.date) === selectedDay
                  const intensity = getCountIntensity(day.count)

                  return (
                    <button
                      key={day.date}
                      type="button"
                      onClick={() => setSelectedDay(Number(day.date))}
                      className={`relative rounded-xl px-1.5 py-2.5 text-center transition-all duration-150 ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#00b09b] to-[#00c9a7] text-white shadow-[0_6px_16px_rgba(0,176,155,0.32)]'
                          : 'border border-slate-200/80 bg-slate-50 text-slate-600 hover:border-[#00b09b]/40 hover:bg-white dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-[#00b09b]/40 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="block text-xs font-bold">{day.date}</span>
                      {intensity && !isSelected && (
                        <span
                          className={`mt-1 block h-1 w-full rounded-full ${
                            intensity === 'high'
                              ? 'bg-rose-400'
                              : intensity === 'mid'
                                ? 'bg-amber-400'
                                : 'bg-emerald-400'
                          }`}
                        />
                      )}
                      {isSelected && (
                        <span className="mt-1 block text-[9px] font-semibold text-white/80">
                          {day.count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 dark:border-slate-800">
                {[
                  { color: 'bg-rose-400', label: '+11 citas' },
                  { color: 'bg-amber-400', label: '7–10 citas' },
                  { color: 'bg-emerald-400', label: '1–6 citas' }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${item.color}`} />
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Appointment list */}
            <div className="rounded-[20px] border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                    Agenda del día
                  </h4>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    {currentDayAppointments.length} cita
                    {currentDayAppointments.length === 1 ? '' : 's'} registradas
                  </p>
                </div>
                {currentDayAppointments.length > 0 && (
                  <span className="rounded-full bg-[#00b09b]/10 px-3 py-1 text-xs font-bold text-[#0f766e] dark:bg-[#00b09b]/20 dark:text-[#34d399]">
                    {currentDayAppointments.length} / día
                  </span>
                )}
              </div>

              {currentDayAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                    <CalendarDays size={24} className="text-slate-400 dark:text-slate-500" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                    Sin citas para este día
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {currentDayAppointments.map((appointment) => (
                    <article
                      key={`${appointment.time}-${appointment.patient}`}
                      className="group flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-150 hover:border-[#00b09b]/30 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,176,155,0.08)] md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-[#00b09b]/30 dark:hover:bg-slate-800"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#00b09b]/15 to-[#00c9a7]/10 dark:from-[#00b09b]/20 dark:to-[#00c9a7]/10">
                          <span className="text-base font-bold text-[#0f766e] dark:text-[#34d399]">
                            {appointment.time.split(':')[0]}
                          </span>
                          <span className="text-[10px] font-semibold text-[#0f766e]/70 dark:text-[#34d399]/70">
                            :{appointment.time.split(':')[1]}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                            {appointment.patient}
                          </h5>
                          <span
                            className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${getTreatmentColor(appointment.treatment)}`}
                          >
                            {appointment.treatment}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:flex-col md:items-end">
                        <span className="rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                          {appointment.duration} min
                        </span>
                        <ChevronRight
                          size={16}
                          className="text-slate-300 transition-colors group-hover:text-[#00b09b] dark:text-slate-700"
                        />
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Week View */}
        {currentView === 'Semana' && (
          <div className="mt-5 grid gap-3 xl:grid-cols-5">
            {currentWeekAppointments.map(([day, appointments]) => (
              <div
                key={day}
                className="rounded-[20px] border border-slate-200/80 bg-white p-4 shadow-[0_6px_20px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{day}</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {appointments.length} citas
                    </p>
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#00b09b]/10 text-xs font-bold text-[#0f766e] dark:bg-[#00b09b]/20 dark:text-[#34d399]">
                    {appointments.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {appointments.map((appointment) => (
                    <article
                      key={`${day}-${appointment.time}-${appointment.patient}`}
                      className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-800/60"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[#0f766e] dark:text-[#34d399]">
                          {appointment.time}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                          {appointment.duration}m
                        </span>
                      </div>
                      <h5 className="mt-1.5 text-xs font-semibold text-slate-800 dark:text-slate-100">
                        {appointment.patient}
                      </h5>
                      <span
                        className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${getTreatmentColor(appointment.treatment)}`}
                      >
                        {appointment.treatment}
                      </span>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Month View */}
        {currentView === 'Mes' && (
          <div className="mt-5 rounded-[20px] border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 grid grid-cols-7 gap-2 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {appointmentsData.Mes.map((day) => {
                const isSelected = Number(day.date) === selectedDay
                const intensity = getCountIntensity(day.count)

                return (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => {
                      setSelectedDay(Number(day.date))
                      setCurrentView('Dia')
                    }}
                    className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-[#00b09b] bg-gradient-to-br from-[#00b09b] to-[#00c9a7] text-white shadow-[0_8px_20px_rgba(0,176,155,0.30)]'
                        : 'border-slate-200/80 bg-slate-50/80 hover:border-[#00b09b]/30 hover:bg-white hover:shadow-[0_4px_12px_rgba(0,176,155,0.08)] dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-[#00b09b]/30 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}
                    >
                      {day.date}
                    </span>
                    {day.count > 0 ? (
                      <p
                        className={`mt-2 text-xs font-semibold ${isSelected ? 'text-white/85' : 'text-slate-500 dark:text-slate-400'}`}
                      >
                        {day.count} citas
                      </p>
                    ) : (
                      <p
                        className={`mt-2 text-xs ${isSelected ? 'text-white/60' : 'text-slate-300 dark:text-slate-600'}`}
                      >
                        —
                      </p>
                    )}
                    {intensity && !isSelected && (
                      <span
                        className={`absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full ${
                          intensity === 'high'
                            ? 'bg-rose-400'
                            : intensity === 'mid'
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                        }`}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Appointments
