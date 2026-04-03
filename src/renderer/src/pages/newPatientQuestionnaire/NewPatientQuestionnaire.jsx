import React, { useMemo, useState } from 'react'
import { FaArrowLeft, FaCheckCircle, FaClipboardList, FaHospitalUser, FaSave } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const QUESTION_SECTIONS = [
  {
    title: 'Salud general',
    questions: [
      '¿Esta bajo tratamiento medico actualmente?',
      '¿Toma medicamentos de forma regular?',
      '¿Ha tenido cirugias importantes?'
    ]
  },
  {
    title: 'Enfermedades importantes',
    questions: ['¿Es hipertenso?', '¿Es diabetico?', '¿Tiene problemas cardiacos?']
  },
  {
    title: 'Sangre y alergias',
    questions: ['¿Tiene problemas de coagulacion o sangra facilmente?', '¿Es alergico a medicamentos o anestesia?']
  },
  {
    title: 'Enfermedades relevantes',
    questions: ['¿Ha tenido hepatitis u otra enfermedad infecciosa importante?', '¿Padece asma o problemas respiratorios?']
  },
  {
    title: 'Habitos',
    questions: ['¿Fuma?', '¿Consume alcohol frecuentemente?']
  },
  {
    title: 'Salud bucal',
    questions: [
      '¿Le sangran las encias?',
      '¿Tiene dolor o sensibilidad dental?',
      '¿Ha tenido problemas con tratamientos dentales anteriores?'
    ]
  },
  {
    title: 'Para pacientes mujeres',
    questions: ['¿Esta embarazada o en lactancia?']
  }
]

const createInitialAnswers = () => {
  const entries = []

  QUESTION_SECTIONS.forEach((section) => {
    section.questions.forEach((question) => {
      entries.push([question, false])
    })
  })

  return Object.fromEntries(entries)
}

const AnswerSwitch = ({ checked, onChange, id }) => (
  <button
    id={id}
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`group relative inline-flex h-9 w-[74px] items-center rounded-full border px-1.5 transition-all ${
      checked
        ? 'border-[#0f766e] bg-[#00b09b]/20 shadow-[0_10px_24px_rgba(0,176,155,0.18)]'
        : 'border-slate-300 bg-slate-200/70 dark:border-slate-700 dark:bg-slate-800'
    }`}
  >
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
        checked
          ? 'translate-x-[36px] bg-[#0f766e] text-white'
          : 'translate-x-0 bg-white text-slate-500 dark:bg-slate-900 dark:text-slate-300'
      }`}
    >
      {checked ? 'SI' : 'NO'}
    </span>
  </button>
)

const NewPatientQuestionnaire = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [answers, setAnswers] = useState(() => createInitialAnswers())

  const patientName = location.state?.patientName || 'Paciente registrado'

  const yesCount = useMemo(() => Object.values(answers).filter(Boolean).length, [answers])

  const handleToggle = (question) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: !prev[question]
    }))
  }

  const handleContinue = () => {
    toast.success('Cuestionario guardado localmente', {
      description: 'Por ahora esta vista es estatica. Luego conectamos el backend.',
      duration: 3500
    })

    navigate('/patient')
  }

  return (
    <section className="grid w-full place-items-center px-4 pb-8 pt-5 sm:px-6">
      <div className="flex w-full max-w-[980px] flex-col gap-7">
        <div className="w-full overflow-hidden rounded-[30px] border border-[#00b09b]/20 bg-gradient-to-r from-[#0f766e] via-[#11b6a1] to-[#19d3bc] px-6 py-7 text-white shadow-[0_24px_60px_rgba(15,118,110,0.22)] sm:px-8">
          <div className="flex flex-col gap-3 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                <FaClipboardList size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Cuestionario de Antecedentes Medicos</h1>
                <p className="mt-1 text-sm text-white/90 sm:text-base">Complete la evaluacion inicial de {patientName}.</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/14 px-4 py-2 text-sm font-medium text-white">
                <FaHospitalUser />
                Preguntas con respuesta SI: {yesCount}
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/14 px-4 py-2 text-sm font-medium text-white">
                <FaCheckCircle />
                Registro inicial completado
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {QUESTION_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-colors dark:border-slate-800 dark:bg-slate-950"
            >
              <h3 className="mb-5 border-b border-slate-200 pb-4 text-lg font-semibold text-slate-800 dark:border-slate-800 dark:text-slate-100">
                {section.title}
              </h3>

              <div className="space-y-4">
                {section.questions.map((question) => {
                  const id = `question-${question}`
                  const checked = answers[question]

                  return (
                    <div
                      key={question}
                      className="flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <label htmlFor={id} className="flex-1 text-sm font-medium leading-snug text-slate-700 dark:text-slate-200">
                        {question}
                      </label>
                      <div className="flex-shrink-0">
                        <AnswerSwitch checked={checked} onChange={() => handleToggle(question)} id={id} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/patient')}
            className="inline-flex h-12 min-w-[170px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <FaArrowLeft />
            Omitir por ahora
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex h-12 min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-[#00b09b] px-6 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(0,176,155,0.22)] transition-colors hover:bg-[#0f766e]"
          >
            <FaSave />
            Guardar y finalizar
          </button>
        </div>
      </div>
    </section>
  )
}

export default NewPatientQuestionnaire
