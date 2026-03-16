import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, Clock3, Activity, Users } from 'lucide-react'

const summaryCards = [
  {
    title: 'Total citas',
    value: '24',
    change: '+3 vs semana anterior',
    icon: CalendarDays,
    accent: 'from-sky-500 to-cyan-400'
  },
  {
    title: 'Nuevos pacientes',
    value: '8',
    change: '+2 vs semana anterior',
    icon: Users,
    accent: 'from-emerald-500 to-teal-400'
  },
  {
    title: 'Horas programadas',
    value: '32h',
    change: '+5h vs semana anterior',
    icon: Clock3,
    accent: 'from-amber-500 to-orange-400'
  },
  {
    title: 'Tratamientos',
    value: '18',
    change: '-2 vs semana anterior',
    icon: Activity,
    accent: 'from-fuchsia-500 to-pink-400'
  }
]

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

const Appointments = () => {
  const navigate = useNavigate()
  const [currentView, setCurrentView] = useState('Dia')
  const [selectedDay, setSelectedDay] = useState(22)

  const selectedDateKey = `2025-08-${selectedDay.toString().padStart(2, '0')}`

  const currentDayAppointments = useMemo(
    () => appointmentsData.Dia[selectedDateKey] || [],
    [selectedDateKey]
  )

  const currentWeekAppointments = useMemo(
    () => Object.entries(appointmentsData.Semana),
    []
  )

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

    if (currentView === 'Semana') {
      return 'Semana del 19 al 25 de agosto de 2025'
    }

    return 'Agosto 2025'
  }

  return (
    <section className="px-2 pb-6 pt-3">
      <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
        <div className="mb-5">
          <h2 className="text-[1.2rem] font-semibold text-slate-800">Resumen de citas</h2>
          <p className="mt-1 text-sm text-slate-500">
            Vista general de citas, ocupacion y movimiento semanal.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon

            return (
              <div
                key={card.title}
                className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">{card.title}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-800">{card.value}</h3>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
                <p
                  className={`mt-4 text-sm font-medium ${
                    card.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {card.change}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-[1.2rem] font-semibold text-slate-800">Agenda</h2>
            <p className="mt-1 text-sm text-slate-500">Gestion de agenda y citas programadas.</p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/nueva-cita')}
            className="inline-flex w-fit items-center rounded-2xl bg-[#00b09b] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-transform hover:-translate-y-0.5"
          >
            + Nueva cita
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-[22px] border border-slate-200 bg-slate-50/80 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Vista actual
            </p>
            <h3 className="mt-1 text-lg font-semibold capitalize text-slate-800">
              {formatCurrentDate()}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {viewOptions.map((view) => {
              const isActive = currentView === view

              return (
                <button
                  key={view}
                  type="button"
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#00b09b] text-white shadow-[0_10px_20px_rgba(0,176,155,0.2)]'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-[#00b09b]/30 hover:text-[#0f766e]'
                  }`}
                  onClick={() => setCurrentView(view)}
                >
                  {view}
                </button>
              )
            })}
          </div>
        </div>

        {currentView === 'Dia' && (
          <div className="mt-6 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="rounded-[22px] border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Dias con mas actividad
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-4">
                {appointmentsData.Mes.map((day) => {
                  const isSelected = Number(day.date) === selectedDay

                  return (
                    <button
                      key={day.date}
                      type="button"
                      onClick={() => setSelectedDay(Number(day.date))}
                      className={`rounded-2xl border px-3 py-3 text-center transition-colors ${
                        isSelected
                          ? 'border-[#00b09b] bg-[#00b09b] text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-[#00b09b]/30 hover:bg-white'
                      }`}
                    >
                      <span className="block text-sm font-semibold">{day.date}</span>
                      <span className={`mt-1 block text-[11px] ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                        {day.count} citas
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-slate-800">Agenda del dia</h4>
                  <p className="text-sm text-slate-500">
                    {currentDayAppointments.length} cita{currentDayAppointments.length === 1 ? '' : 's'} registradas.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {currentDayAppointments.map((appointment) => (
                  <article
                    key={`${appointment.time}-${appointment.patient}`}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-2xl bg-[#00b09b]/10 px-3 py-2 text-sm font-semibold text-[#0f766e]">
                        {appointment.time}
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-slate-800">{appointment.patient}</h5>
                        <p className="mt-1 text-sm text-slate-500">{appointment.treatment}</p>
                      </div>
                    </div>
                    <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {appointment.duration} min
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'Semana' && (
          <div className="mt-6 grid gap-4 xl:grid-cols-5">
            {currentWeekAppointments.map(([day, appointments]) => (
              <div
                key={day}
                className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
              >
                <div className="mb-4">
                  <h4 className="text-base font-semibold text-slate-800">{day}</h4>
                  <p className="text-sm text-slate-500">{appointments.length} citas programadas</p>
                </div>

                <div className="space-y-3">
                  {appointments.map((appointment) => (
                    <article key={`${day}-${appointment.time}-${appointment.patient}`} className="rounded-2xl bg-slate-50 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-[#0f766e]">{appointment.time}</span>
                        <span className="text-xs text-slate-400">{appointment.duration} min</span>
                      </div>
                      <h5 className="mt-2 text-sm font-semibold text-slate-800">{appointment.patient}</h5>
                      <p className="mt-1 text-sm text-slate-500">{appointment.treatment}</p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'Mes' && (
          <div className="mt-6 rounded-[22px] border border-slate-200 bg-white p-4">
            <div className="mb-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {appointmentsData.Mes.map((day) => {
                const isSelected = Number(day.date) === selectedDay

                return (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => {
                      setSelectedDay(Number(day.date))
                      setCurrentView('Dia')
                    }}
                    className={`rounded-[20px] border p-4 text-left transition-colors ${
                      isSelected
                        ? 'border-[#00b09b] bg-[#00b09b] text-white'
                        : 'border-slate-200 bg-slate-50 hover:border-[#00b09b]/30 hover:bg-white'
                    }`}
                  >
                    <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                      {day.date}
                    </span>
                    <p className={`mt-3 text-xs ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                      {day.count > 0 ? `${day.count} citas` : 'Sin citas'}
                    </p>
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
