import { motion } from 'framer-motion'
import { Stethoscope, WalletCards } from 'lucide-react'
import {
  fadeInProps,
  planBadgeIcon,
  planBadgeLabel,
  treatmentPlanItems,
  treatmentPlanMetrics,
  treatmentPlanStages
} from '../constants/patientDetails.constants'

const PatientTreatmentTab = () => {
  const PlanBadgeIcon = planBadgeIcon

  return (
    <motion.div key="tratamientos-tab" {...fadeInProps} className="grid gap-6">
      <section className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Planes de tratamiento</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Vista general del plan activo, procedimientos propuestos y próximos pasos clínicos.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#00b09b]/10 px-4 py-2 text-sm font-semibold text-[#0f766e]">
              <PlanBadgeIcon size={16} />
              {planBadgeLabel}
            </div>
          </div>
        </div>
        <div className="grid gap-6 p-6">
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
                  Secuencia pensada para estabilizar encías, resolver sensibilidad localizada y restaurar piezas con compromiso funcional leve.
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
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Etapa</p>
                <h4 className="mt-3 text-base font-semibold text-slate-800 dark:text-slate-100">{stage.label}</h4>
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
              </article>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
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
                <span className="rounded-full bg-[#00b09b]/10 px-3 py-1 text-xs font-semibold text-[#0f766e]">
                  3 acciones
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {treatmentPlanItems.map((item, index) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-white bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#00b09b]/10 text-[#0f766e]">
                            {index + 1}
                          </span>
                          Prioridad {item.priority}
                        </div>
                        <h5 className="mt-2 text-base font-semibold text-slate-800 dark:text-slate-100">{item.title}</h5>
                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.detail}</p>
                      </div>
                      <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {item.time}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00b09b]/10 text-[#0f766e]">
                    <WalletCards size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Presupuesto estimado
                    </p>
                    <h4 className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100">Bs. 780</h4>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Saneamiento inicial</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Bs. 180</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Restauración resina</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Bs. 350</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Controles y ajustes</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Bs. 250</span>
                  </div>
                </div>
              </article>

              <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Próximo paso sugerido</p>
                <h4 className="mt-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Agendar sesión de saneamiento
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Recomendado dentro de los próximos 7 días para mantener la continuidad del plan.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center rounded-2xl bg-[#00b09b] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,176,155,0.22)] transition-transform hover:-translate-y-0.5"
                  >
                    Agendar sesión
                  </button>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  >
                    Compartir plan
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default PatientTreatmentTab
