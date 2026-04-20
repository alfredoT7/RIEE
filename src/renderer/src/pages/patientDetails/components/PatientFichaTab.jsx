import { motion } from 'framer-motion'
import { CalendarDays, ShieldPlus, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInProps } from '../constants/patientDetails.constants'
import { buildClinicalItems, buildInfoColumns } from '../utils/patientDetails.utils'
import QuestionnaireValue from './QuestionnaireValue'

const PatientFichaTab = ({
  patient,
  questionnairePreviewItems,
  onEditPatient,
  onRegisterClinicalInfo,
  onRegisterQuestionnaire,
  onOpenQuestionnaireModal
}) => (
  <motion.div key="ficha-tab" {...fadeInProps} className="grid gap-6">
    <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
      <section className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Datos personales</h3>
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
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.label}</p>
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
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Balance actual</h3>
            <button
              type="button"
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
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
      <div className="grid gap-6">
        <section className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Información clínica</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Motivo de consulta, alergias y observaciones clínicas iniciales.
              </p>
            </div>
            {patient?.missingClinicalInfo && (
              <button
                type="button"
                onClick={onRegisterClinicalInfo}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#00b09b] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,176,155,0.22)] transition-colors hover:bg-[#0f766e]"
              >
                Registrar info clínica
              </button>
            )}
          </div>

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
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.value}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Cuestionario médico</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Vista resumida de la evaluación médica registrada.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {patient?.missingQuestionnaire && (
                <button
                  type="button"
                  onClick={onRegisterQuestionnaire}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#00b09b] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,176,155,0.22)] transition-colors hover:bg-[#0f766e]"
                >
                  Registrar cuestionario
                </button>
              )}
              {!patient?.missingQuestionnaire && (
                <button
                  type="button"
                  onClick={onOpenQuestionnaireModal}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                >
                  Ver todo
                </button>
              )}
            </div>
          </div>

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
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                  <div className="mt-4">
                    <QuestionnaireValue value={item.value} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="grid gap-6">
        <section className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Indicadores</h3>
          </div>

          <div className="grid gap-4 p-6">
            <div className="rounded-[24px] bg-[#00b09b]/8 p-4">
              <div className="flex items-center gap-3">
                <UserRound size={18} className="text-[#0f766e]" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Perfil completo</p>
              </div>
              <p className="mt-2 text-2xl font-semibold text-[#0f766e]">
                {patient?.email && patient?.direccion ? '85%' : '60%'}
              </p>
            </div>
            <div className="rounded-[24px] bg-sky-50 p-4">
              <div className="flex items-center gap-3">
                <ShieldPlus size={18} className="text-sky-600" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Seguimiento clínico</p>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Listo para completar con tratamientos, presupuestos y documentos.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </motion.div>
)

export default PatientFichaTab

