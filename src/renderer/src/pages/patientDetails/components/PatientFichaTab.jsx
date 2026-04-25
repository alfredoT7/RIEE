import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, ChevronRight, ClipboardList, HeartPulse, Stethoscope } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInProps, mockTreatmentPlans } from '../constants/patientDetails.constants'
import { buildClinicalItems, buildInfoColumns } from '../utils/patientDetails.utils'
import QuestionnaireValue from './QuestionnaireValue'

const planStatusStyles = {
  'En curso': 'bg-[#00b09b]/10 text-[#0f766e] dark:bg-[#00b09b]/20 dark:text-[#34d399]',
  Terminado: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Pendiente: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
}

const clinicalTabs = [
  { key: 'clinica', label: 'Info. clínica', icon: Stethoscope },
  { key: 'cuestionario', label: 'Cuestionario médico', icon: ClipboardList }
]

const PatientFichaTab = ({
  patient,
  questionnairePreviewItems,
  onEditPatient,
  onOpenBudgetsTab,
  onOpenTreatmentsTab,
  onOpenCompletedTreatmentsTab,
  onRegisterClinicalInfo,
  onRegisterQuestionnaire,
  onOpenQuestionnaireModal
}) => {
  const [clinicalTab, setClinicalTab] = useState('clinica')

  return (
    <motion.div key="ficha-tab" {...fadeInProps} className="grid gap-6">
      {/* ── Top row ── */}
      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <section className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                Datos personales
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Información principal del paciente y datos administrativos.
              </p>
            </div>
            <button
              type="button"
              onClick={onEditPatient}
              className="cursor-pointer rounded-full bg-[#00b09b]/10 px-3 py-1.5 text-sm font-semibold text-[#0f766e] transition-colors hover:bg-[#00b09b]/15"
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
                        item.accent ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6">
          <section className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                Balance actual
              </h3>
              <button
                type="button"
                onClick={onOpenBudgetsTab}
                className="cursor-pointer text-sm font-medium text-sky-600 transition-colors hover:text-sky-500"
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
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Citas</h3>
              <Link
                to="/appointments"
                className="cursor-pointer text-sm font-medium text-sky-600 transition-colors hover:text-sky-500"
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
                Cuando programes una cita para este paciente aparecerá aquí.
              </p>
              <Link
                to="/nueva-cita"
                className="mt-5 inline-flex cursor-pointer items-center rounded-2xl bg-[#00b09b] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-transform hover:-translate-y-0.5 hover:bg-[#0f766e]"
              >
                Agendar cita
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        {/* Merged clinical card with tabs */}
        <section className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          {/* Tab header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <div className="flex gap-1 rounded-2xl border border-slate-200/80 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
              {clinicalTabs.map((tab) => {
                const Icon = tab.icon
                const active = clinicalTab === tab.key
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setClinicalTab(tab.key)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                      active
                        ? 'bg-white text-slate-800 shadow-sm dark:bg-slate-800 dark:text-slate-100'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
                    }`}
                  >
                    <Icon size={14} />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Action button per tab */}
            {clinicalTab === 'clinica' && patient?.missingClinicalInfo && (
              <button
                type="button"
                onClick={onRegisterClinicalInfo}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#00b09b] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,176,155,0.22)] transition-colors hover:bg-[#0f766e]"
              >
                Registrar
              </button>
            )}
            {clinicalTab === 'cuestionario' && patient?.missingQuestionnaire && (
              <button
                type="button"
                onClick={onRegisterQuestionnaire}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#00b09b] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,176,155,0.22)] transition-colors hover:bg-[#0f766e]"
              >
                Registrar
              </button>
            )}
            {clinicalTab === 'cuestionario' && !patient?.missingQuestionnaire && (
              <button
                type="button"
                onClick={onOpenQuestionnaireModal}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                Ver todo
              </button>
            )}
          </div>

          {/* Tab content — min-h keeps card height stable on switch */}
          <div className="min-h-[280px] overflow-hidden">
            <AnimatePresence mode="wait">
              {clinicalTab === 'clinica' && (
                <motion.div
                  key="clinica"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                >
                  {patient?.missingClinicalInfo ? (
                    <div className="p-6">
                      <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/60">
                        <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
                          Aún no hay información clínica registrada
                        </p>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                          Registra el motivo de consulta, alergias y observaciones iniciales para completar esta sección.
                        </p>
                        <button
                          type="button"
                          onClick={onRegisterClinicalInfo}
                          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#00b09b] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-transform hover:-translate-y-0.5 hover:bg-[#0f766e]"
                        >
                          Registrar info clínica
                        </button>
                      </div>
                    </div>
                  ) : (
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
                  )}
                </motion.div>
              )}

              {clinicalTab === 'cuestionario' && (
                <motion.div
                  key="cuestionario"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                >
                  {patient?.missingQuestionnaire ? (
                    <div className="p-6">
                      <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/60">
                        <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
                          Aún no hay cuestionario médico registrado
                        </p>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                          Registra la evaluación inicial para ver aquí las respuestas médicas del paciente.
                        </p>
                        <button
                          type="button"
                          onClick={onRegisterQuestionnaire}
                          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#00b09b] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-transform hover:-translate-y-0.5 hover:bg-[#0f766e]"
                        >
                          Registrar cuestionario
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4 p-6 md:grid-cols-2">
                      {questionnairePreviewItems.map((item) => (
                        <article
                          key={item.label}
                          className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                            {item.label}
                          </p>
                          <div className="mt-4">
                            <QuestionnaireValue value={item.value} />
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Planes de tratamiento */}
        <div className="grid gap-6">
          <section className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#00b09b]/10 text-[#0f766e] dark:bg-[#00b09b]/20 dark:text-[#34d399]">
                  <HeartPulse size={16} />
                </span>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  Planes de tratamiento
                </h3>
              </div>
              <button
                type="button"
                onClick={onOpenTreatmentsTab}
                className="cursor-pointer text-sm font-medium text-sky-600 transition-colors hover:text-sky-500"
              >
                Ver todos
              </button>
            </div>

            <div className="flex flex-col gap-2 p-4">
              {mockTreatmentPlans.map((plan) => {
                const handleClick =
                  plan.status === 'Terminado' ? onOpenCompletedTreatmentsTab : onOpenTreatmentsTab
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={handleClick}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-left transition-all hover:border-[#00b09b]/25 hover:bg-white hover:shadow-[0_4px_14px_rgba(0,176,155,0.07)] dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-[#00b09b]/30 dark:hover:bg-slate-900"
                  >
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${planStatusStyles[plan.status]}`}
                    >
                      {plan.status}
                    </span>
                    <span className="flex-1 truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                      {plan.name}
                    </span>
                    <ChevronRight
                      size={15}
                      className="shrink-0 text-slate-300 transition-colors group-hover:text-[#00b09b] dark:text-slate-700"
                    />
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  )
}

export default PatientFichaTab
