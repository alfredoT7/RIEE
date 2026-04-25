import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  Bell,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  Info,
  Share2,
  Stethoscope,
  WalletCards
} from 'lucide-react'
import {
  clinicalAlerts,
  clinicalDocs,
  clinicalSummary,
  fadeInProps,
  nextStepData,
  overallProgress,
  paymentData,
  planBadgeIcon,
  planBadgeLabel,
  planTimeline,
  toothData,
  treatmentPlanItems,
  treatmentPlanMetrics,
  treatmentPlanStages
} from '../constants/patientDetails.constants'

const riskColors = {
  Bajo: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Medio: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Alto: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
}

const priorityColors = {
  Urgente: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  Electivo: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
}

const alertLevelStyles = {
  warning:
    'border-amber-200 bg-amber-50/80 text-amber-700 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-300',
  error:
    'border-rose-200 bg-rose-50/80 text-rose-700 dark:border-rose-800/40 dark:bg-rose-950/30 dark:text-rose-300',
  info: 'border-sky-200 bg-sky-50/80 text-sky-700 dark:border-sky-800/40 dark:bg-sky-950/30 dark:text-sky-300'
}

const alertIcons = { warning: AlertTriangle, error: AlertTriangle, info: Info }

const paymentStatusColors = {
  Pagado: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Pendiente: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  Parcial: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
}

const docStatusColors = {
  Pendiente: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
  'Por subir': 'bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300',
  'No adjuntado': 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
}

const ToothBadge = ({ tooth }) => {
  const [open, setOpen] = useState(false)
  const data = toothData[tooth]
  if (!data) return null

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-violet-300 bg-violet-100 px-2.5 py-0.5 text-xs font-bold text-violet-700 transition-colors hover:bg-violet-200 dark:border-violet-700 dark:bg-violet-900/40 dark:text-violet-300 dark:hover:bg-violet-900/60"
      >
        🦷 Pieza {tooth}
      </button>
      {open && (
        <div className="absolute bottom-full left-0 z-20 mb-2 w-52 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_12px_32px_rgba(15,23,42,0.14)] dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-violet-100 text-sm dark:bg-violet-900/40">
              🦷
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Pieza {data.number}
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">{data.name}</p>
          <p className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">{data.zone}</p>
          <div className="mt-2 rounded-xl bg-rose-50 px-2.5 py-1.5 dark:bg-rose-950/30">
            <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
              Estado: {data.status}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

const PatientTreatmentTab = () => {
  const PlanBadgeIcon = planBadgeIcon
  const paid = paymentData.ejecutado
  const total = paymentData.total
  const payPct = Math.round((paid / total) * 100)

  return (
    <motion.div key="tratamientos-tab" {...fadeInProps} className="grid gap-5">
      {/* ── Main card ── */}
      <section className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
        {/* Header */}
        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                Planes de tratamiento
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Vista general del plan activo, procedimientos propuestos y próximos pasos clínicos.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#00b09b]/10 px-4 py-2 text-sm font-semibold text-[#0f766e] dark:bg-[#00b09b]/20 dark:text-[#34d399]">
              <PlanBadgeIcon size={16} />
              {planBadgeLabel}
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-6">
          {/* ── 1. Clinical summary row ── */}
          <div className="flex flex-wrap items-center gap-3 rounded-[20px] border border-slate-100 bg-slate-50/80 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center gap-2.5">
              <Stethoscope size={15} className="text-slate-400 dark:text-slate-500" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Diagnóstico:
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-0.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {clinicalSummary.diagnosisCode} – {clinicalSummary.diagnosisLabel}
              </span>
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Riesgo:
              </span>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-bold ${riskColors[clinicalSummary.riskLevel]}`}
              >
                {clinicalSummary.riskLevel}
              </span>
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Prioridad:
              </span>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-bold ${priorityColors[clinicalSummary.priority]}`}
              >
                {clinicalSummary.priority}
              </span>
            </div>
          </div>

          {/* ── 2. Plan overview banner ── */}
          <div className="rounded-[26px] border border-[#b8ece5] bg-[linear-gradient(135deg,#f1fffc_0%,#ffffff_52%,#edf8f6_100%)] p-6 dark:border-[#164e4a] dark:bg-[linear-gradient(135deg,#0f172a_0%,#0b2f2d_100%)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e] dark:bg-white/10 dark:text-[#8cecdf]">
                  <Stethoscope size={14} />
                  Rehabilitación inicial
                </div>
                <h4 className="mt-4 text-2xl font-semibold text-slate-800 dark:text-slate-100">
                  Plan integral de saneamiento y restauración
                </h4>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Secuencia pensada para estabilizar encías, resolver sensibilidad localizada y
                  restaurar piezas con compromiso funcional leve.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:w-[360px] xl:grid-cols-1">
                {treatmentPlanMetrics.map((metric) => {
                  const Icon = metric.icon
                  return (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00b09b]/12 text-[#0f766e] dark:bg-[#00b09b]/20 dark:text-[#7de9de]">
                          <Icon size={18} />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                            {metric.label}
                          </p>
                          <p className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100">
                            {metric.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── 3. Stages ── */}
          <div className="grid gap-4 lg:grid-cols-4">
            {treatmentPlanStages.map((stage) => (
              <article
                key={stage.label}
                className={`rounded-[24px] border p-5 ${
                  stage.tone === 'done'
                    ? 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                    : stage.tone === 'active'
                      ? 'border-[#9ae6dc] bg-[#ecfffb] dark:border-[#164e4a] dark:bg-[#0d2d2a]'
                      : 'border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/60'
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Etapa
                </p>
                <h4 className="mt-3 text-base font-semibold text-slate-800 dark:text-slate-100">
                  {stage.label}
                </h4>
                <p
                  className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    stage.tone === 'done'
                      ? 'bg-emerald-600 text-white'
                      : stage.tone === 'active'
                        ? 'bg-[#00b09b] text-white'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {stage.status}
                </p>
                {stage.compliance > 0 && (
                  <div className="mt-3">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-700">
                      <div
                        className={`h-full rounded-full transition-all ${
                          stage.tone === 'done' ? 'bg-emerald-500' : 'bg-[#00b09b]'
                        }`}
                        style={{ width: `${stage.compliance}%` }}
                      />
                    </div>
                    <p className="mt-1 text-right text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                      {stage.compliance}%
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* ── 4. Main 2-col grid ── */}
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
            {/* Left col */}
            <div className="flex flex-col gap-5">
              {/* Procedures */}
              <div className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Procedimientos propuestos
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
                      Secuencia clínica sugerida
                    </h4>
                  </div>
                  <span className="rounded-full bg-[#00b09b]/10 px-3 py-1 text-xs font-semibold text-[#0f766e] dark:bg-[#00b09b]/20 dark:text-[#34d399]">
                    {treatmentPlanItems.length} acciones
                  </span>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  {treatmentPlanItems.map((item, index) => (
                    <article
                      key={item.title}
                      className="rounded-2xl border border-white bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#00b09b]/10 text-[#0f766e] dark:bg-[#00b09b]/20 dark:text-[#34d399]">
                              {index + 1}
                            </span>
                            Prioridad {item.priority}
                          </div>
                          <h5 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                            {item.title}
                          </h5>
                          <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                            {item.detail}
                          </p>
                          {item.tooth && (
                            <div className="mt-1">
                              <ToothBadge tooth={item.tooth} />
                            </div>
                          )}
                        </div>
                        <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {item.time}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Clinical indicators */}
              <div className="rounded-[26px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00b09b]/10 text-[#0f766e] dark:bg-[#00b09b]/20 dark:text-[#34d399]">
                    <Activity size={17} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Indicadores clínicos
                    </p>
                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                      Progreso del tratamiento
                    </h4>
                  </div>
                </div>

                {/* Overall progress */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      Progreso general
                    </span>
                    <span className="font-bold text-[#0f766e] dark:text-[#34d399]">
                      {overallProgress}%
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#00b09b] to-[#00c9a7] transition-all"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                </div>

                {/* Per-stage compliance */}
                <div className="mt-4 space-y-2.5">
                  {treatmentPlanStages.map((stage) => (
                    <div key={stage.label} className="flex items-center gap-3">
                      <span className="w-24 shrink-0 text-xs text-slate-500 dark:text-slate-400">
                        {stage.label}
                      </span>
                      <div className="flex-1">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className={`h-full rounded-full ${
                              stage.tone === 'done'
                                ? 'bg-emerald-500'
                                : stage.tone === 'active'
                                  ? 'bg-[#00b09b]'
                                  : 'bg-slate-300 dark:bg-slate-700'
                            }`}
                            style={{ width: `${stage.compliance}%` }}
                          />
                        </div>
                      </div>
                      <span className="w-8 text-right text-xs font-semibold text-slate-400 dark:text-slate-500">
                        {stage.compliance}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Alerts */}
                <div className="mt-5 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Alertas clínicas
                  </p>
                  {clinicalAlerts.map((alert) => {
                    const AlertIcon = alertIcons[alert.level]
                    return (
                      <div
                        key={alert.label}
                        className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm font-medium ${alertLevelStyles[alert.level]}`}
                      >
                        <AlertIcon size={14} />
                        {alert.label}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right col */}
            <div className="flex flex-col gap-5">
              {/* Budget (enhanced) */}
              <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00b09b]/10 text-[#0f766e] dark:bg-[#00b09b]/20 dark:text-[#34d399]">
                    <WalletCards size={20} />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Presupuesto estimado
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        Bs. {total}
                      </h4>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${paymentStatusColors[paymentData.status]}`}
                      >
                        {paymentData.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Budget vs executed */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Ejecutado: Bs. {paid}</span>
                    <span>{payPct}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#00b09b] to-[#00c9a7]"
                      style={{ width: `${payPct}%` }}
                    />
                  </div>
                </div>

                {/* Breakdown */}
                <div className="mt-4 space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Saneamiento inicial</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      Bs. 180
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Restauración resina</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      Bs. 350
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Controles y ajustes</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      Bs. 250
                    </span>
                  </div>
                </div>

                {/* Payment method */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-900">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Método de pago
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    💵 {paymentData.method}
                  </span>
                </div>

                {/* Payment history */}
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Historial de pagos
                  </p>
                  <div className="space-y-1.5">
                    {paymentData.history.map((entry, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400"
                      >
                        <span>{entry.date}</span>
                        <span className="font-semibold">
                          {entry.amount > 0 ? `Bs. ${entry.amount}` : '—'}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-bold ${paymentStatusColors[entry.status]}`}
                        >
                          {entry.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              {/* Next step (enhanced) */}
              <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Próximo paso sugerido
                </p>
                <h4 className="mt-2 text-base font-semibold text-slate-800 dark:text-slate-100">
                  {nextStepData.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {nextStepData.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <CheckCircle2 size={12} />
                    {nextStepData.availability}
                  </span>
                  {nextStepData.reminderActive && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-900/30 dark:text-sky-300">
                      <Bell size={12} />
                      Recordatorio activado
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-r from-[#00b09b] to-[#00c9a7] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,176,155,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(0,176,155,0.30)]"
                  >
                    <CalendarPlus size={15} />
                    Agendar cita
                  </button>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  >
                    <Share2 size={14} />
                    Compartir plan
                  </button>
                </div>
              </article>

              {/* Clinical documentation (visual only) */}
              <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Documentación clínica
                </p>
                <h4 className="mt-1.5 text-base font-semibold text-slate-800 dark:text-slate-100">
                  Archivos del plan
                </h4>
                <div className="mt-4 space-y-3">
                  {clinicalDocs.map((doc) => (
                    <div
                      key={doc.label}
                      className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <span className="text-xl">{doc.icon}</span>
                      <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                        {doc.label}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${docStatusColors[doc.status]}`}
                      >
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>

          {/* ── 5. Timeline ── */}
          <div className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Historial clínico
            </p>
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Trazabilidad del plan
            </h4>

            <div className="mt-5 flex flex-col gap-0">
              {planTimeline.map((event, i) => {
                const EventIcon = event.icon
                const isLast = i === planTimeline.length - 1
                return (
                  <div key={event.title + event.date} className="flex gap-4">
                    {/* Spine */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${event.dot} text-white shadow-sm`}
                      >
                        <EventIcon size={14} />
                      </div>
                      {!isLast && (
                        <div className="mt-1 w-px flex-1 bg-slate-200 dark:bg-slate-800" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-5 ${isLast ? '' : ''}`}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-sm font-semibold ${event.color}`}>
                          {event.title}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {event.date}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {event.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default PatientTreatmentTab
