import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  CreditCard,
  FileText,
  HeartPulse,
  Info,
  Layers3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShieldPlus,
  Sparkles,
  Stethoscope,
  UserRound,
  WalletCards,
  X,
  XCircle
} from 'lucide-react'
import { getCompletePatient } from '../../api/Api'
import ImagesApp from '../../assets/ImagesApp'
import LoadingState from '../../components/loading/LoadingState'

const sideMenuItems = [
  { label: 'Ficha', icon: ClipboardList, key: 'ficha' },
  { label: 'Planes de tratamiento', icon: HeartPulse, key: 'tratamientos' },
  { label: 'Documentos', icon: FileText, key: 'documentos' },
  { label: 'Presupuestos', icon: CreditCard, key: 'presupuestos' },
  { label: 'Tratamientos realizados', icon: Stethoscope, key: 'tratamientos-realizados' },
  { label: 'Odontograma', icon: ShieldPlus, key: 'odontograma' },
  { label: 'Recetas brindadas', icon: FileText, key: 'recetas-brindadas' }
]

const normalizeCompletePatientData = (payload) => {
  const basePatient = payload?.patient || {}
  const clinicalInfo = payload?.clinicalInfo || {}
  const questionnaire = payload?.questionnaire || {}

  return {
    ...basePatient,
    clinicalInfo,
    questionnaire,
    missingClinicalInfo: Boolean(payload?.missingClinicalInfo),
    missingQuestionnaire: Boolean(payload?.missingQuestionnaire),
    missingSections: Array.isArray(payload?.missingSections) ? payload.missingSections : [],
    motivoConsulta: clinicalInfo.motivoConsulta || basePatient.motivoConsulta || '',
    alergias: clinicalInfo.alergias || basePatient.alergias || '',
    observaciones: clinicalInfo.observaciones || basePatient.observaciones || basePatient.notas || '',
    ...questionnaire
  }
}

const formatDate = (value) => {
  if (!value) {
    return 'No registrado'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('es-BO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const calculateAge = (value) => {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  const monthDifference = today.getMonth() - date.getMonth()

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < date.getDate())) {
    age -= 1
  }

  return age
}

const buildInfoColumns = (patient) => {
  const phoneNumber = patient?.telefono || patient?.phonesNumbers?.[0]?.numero || 'No registrado'
  const emergencyContact =
    patient?.personaDeReferencia ||
    patient?.contactoEmergencia ||
    patient?.emergencyContact ||
    patient?.responsable ||
    'No registrado'

  return [
    [
      {
        label: 'Nombre',
        value: `${patient?.nombre || ''} ${patient?.apellido || ''}`.trim() || 'Paciente sin nombre'
      },
      { label: 'Dirección', value: patient?.direccion || 'No registrada' },
      { label: 'Email', value: patient?.email || 'No registrado', accent: true },
      { label: 'Contacto de referencia', value: emergencyContact },
      { label: 'Fecha de nacimiento', value: formatDate(patient?.fechaNacimiento) },
      { label: 'Estado civil', value: patient?.estadoCivil?.status || patient?.estadoCivil || 'No registrado' }
    ],
    [
      { label: 'Sexo', value: patient?.sexo || patient?.genero || 'No registrado' },
      { label: 'Teléfono', value: phoneNumber, accent: true },
      { label: 'Ocupación', value: patient?.ocupacion || 'No registrada' },
      {
        label: 'Número de documento',
        value: patient?.ciPaciente || patient?.cedula || patient?.id || 'No registrado'
      },
      {
        label: 'Número referencia',
        value: patient?.numeroPersonaRef || patient?.numeroReferencia || 'No registrado'
      }
    ]
  ]
}

const buildClinicalItems = (patient) => [
  {
    label: 'Motivo de la consulta',
    value: patient?.motivoConsulta || patient?.motivo || 'Pendiente de registrar'
  },
  {
    label: 'Alergias',
    value: patient?.alergias || 'No reportadas'
  },
  {
    label: 'Observaciones',
    value: patient?.observaciones || patient?.notas || 'Sin observaciones adicionales'
  }
]

const formatQuestionnaireValue = (value) => {
  if (typeof value === 'boolean') {
    return value ? 'Sí' : 'No'
  }

  if (value === null || value === undefined || value === '') {
    return 'No registrado'
  }

  return value
}

const buildQuestionnaireItems = (patient) => [
  {
    label: 'Bajo tratamiento médico actualmente',
    value: formatQuestionnaireValue(patient?.estaBajoTratamientoMedicoActualmente)
  },
  {
    label: 'Toma medicamentos regularmente',
    value: formatQuestionnaireValue(patient?.tomaMedicamentosRegularmente)
  },
  {
    label: 'Cirugías importantes',
    value: formatQuestionnaireValue(patient?.haTenidoCirugiasImportantes)
  },
  {
    label: 'Hipertenso',
    value: formatQuestionnaireValue(patient?.esHipertenso)
  },
  {
    label: 'Diabético',
    value: formatQuestionnaireValue(patient?.esDiabetico)
  },
  {
    label: 'Problemas cardíacos',
    value: formatQuestionnaireValue(patient?.tieneProblemasCardiacos)
  },
  {
    label: 'Problemas de coagulación o sangrado',
    value: formatQuestionnaireValue(patient?.tieneProblemasCoagulacionOSangraFacilmente)
  },
  {
    label: 'Alergia a medicamentos o anestesia',
    value: formatQuestionnaireValue(patient?.esAlergicoAMedicamentosOAnestesia)
  },
  {
    label: 'Hepatitis o enfermedad infecciosa importante',
    value: formatQuestionnaireValue(patient?.haTenidoHepatitisOEnfermedadInfecciosaImportante)
  },
  {
    label: 'Asma o problemas respiratorios',
    value: formatQuestionnaireValue(patient?.padeceAsmaOProblemasRespiratorios)
  },
  { label: 'Fuma', value: formatQuestionnaireValue(patient?.fuma) },
  {
    label: 'Consume alcohol frecuentemente',
    value: formatQuestionnaireValue(patient?.consumeAlcoholFrecuentemente)
  },
  { label: 'Sangrado de encías', value: formatQuestionnaireValue(patient?.leSangranLasEncias) },
  {
    label: 'Dolor o sensibilidad dental',
    value: formatQuestionnaireValue(patient?.tieneDolorOSensibilidadDental)
  },
  {
    label: 'Problemas con tratamientos dentales anteriores',
    value: formatQuestionnaireValue(patient?.haTenidoProblemasConTratamientosDentalesAnteriores)
  },
  {
    label: 'Embarazada o en lactancia',
    value: formatQuestionnaireValue(patient?.estaEmbarazadaOLactancia)
  }
]

const treatmentPlanStages = [
  { label: 'Diagnóstico', status: 'Completado', tone: 'done' },
  { label: 'Saneamiento', status: 'En curso', tone: 'active' },
  { label: 'Restauración', status: 'Pendiente', tone: 'pending' },
  { label: 'Control final', status: 'Pendiente', tone: 'pending' }
]

const treatmentPlanItems = [
  {
    title: 'Profilaxis y control periodontal',
    detail: 'Limpieza general, remoción de cálculo y control de inflamación gingival.',
    time: '45 min',
    priority: 'Alta'
  },
  {
    title: 'Restauración pieza 2.6',
    detail: 'Resina compuesta por lesión cariosa oclusal con aislamiento relativo.',
    time: '60 min',
    priority: 'Media'
  },
  {
    title: 'Evaluación de sensibilidad y ajuste oclusal',
    detail: 'Revisión funcional posterior al saneamiento y seguimiento de molestias.',
    time: '30 min',
    priority: 'Media'
  }
]

const treatmentPlanMetrics = [
  { label: 'Sesiones estimadas', value: '3', icon: Layers3 },
  { label: 'Tiempo total', value: '2h 15m', icon: Clock3 },
  { label: 'Cobertura clínica', value: '75%', icon: ShieldCheck }
]

const fadeInProps = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 }
}

const QuestionnaireValue = ({ value }) => {
  if (value === 'Sí') {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
        <CheckCircle2 size={16} />
        Sí
      </span>
    )
  }

  if (value === 'No') {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
        <XCircle size={16} />
        No
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
      <Info size={16} />
      {value}
    </span>
  )
}

const PlaceholderTab = ({ title, description }) => (
  <motion.section
    key={title}
    {...fadeInProps}
    className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
  >
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#00b09b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
        <ClipboardList size={14} />
        Próximamente
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  </motion.section>
)

const PatientDetails = () => {
  const navigate = useNavigate()
  const { patientId } = useParams()
  const [patient, setPatient] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(sideMenuItems[0].key)
  const [isQuestionnaireModalOpen, setIsQuestionnaireModalOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchPatient = async () => {
      try {
        const response = await getCompletePatient(patientId)
        const completeData = normalizeCompletePatientData(response.data?.data)

        if (!isMounted) {
          return
        }

        setPatient(completeData?.id ? completeData : null)
      } catch (error) {
        console.error('Error fetching patient details:', error)
        if (isMounted) {
          setPatient(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchPatient()

    return () => {
      isMounted = false
    }
  }, [patientId])

  useEffect(() => {
    if (!isQuestionnaireModalOpen) {
      return undefined
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsQuestionnaireModalOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isQuestionnaireModalOpen])

  const handleEditPatient = () => {
    const resolvedPatientId = patient?.id || patient?.ciPaciente || patientId

    if (!resolvedPatientId) {
      return
    }

    navigate(`/patient/${resolvedPatientId}/edit`, {
      state: { patient }
    })
  }

  const handleRegisterClinicalInfo = () => {
    navigate('/new-patient/clinical-info', {
      state: {
        patientId: patient?.id || patientId,
        patientName: `${patient?.nombre || ''} ${patient?.apellido || ''}`.trim(),
        returnToPatientDetails: true
      }
    })
  }

  const handleRegisterQuestionnaire = () => {
    navigate('/new-patient/questionnaire', {
      state: {
        patientId: patient?.id || patientId,
        patientName: `${patient?.nombre || ''} ${patient?.apellido || ''}`.trim(),
        returnToPatientDetails: true
      }
    })
  }

  const fullName = useMemo(() => {
    if (!patient) {
      return 'Paciente'
    }

    return `${patient.nombre || ''} ${patient.apellido || ''}`.trim() || 'Paciente sin nombre'
  }, [patient])

  const age = calculateAge(patient?.fechaNacimiento)
  const profileImage = patient?.imagen?.startsWith('http') ? patient.imagen : ImagesApp.defaultImage
  const questionnaireItems = useMemo(() => buildQuestionnaireItems(patient), [patient])
  const questionnairePreviewItems = questionnaireItems.slice(0, 2)
  const profileSummary = [
    age ? `${age} años` : null,
    patient?.sexo || patient?.genero || null,
    patient?.ciPaciente ? `CI ${patient.ciPaciente}` : null
  ]
    .filter(Boolean)
    .join(' · ')

  const renderFichaTab = () => (
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
              onClick={handleEditPatient}
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
                  onClick={handleRegisterClinicalInfo}
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
                    onClick={handleRegisterClinicalInfo}
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
                    onClick={handleRegisterQuestionnaire}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#00b09b] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,176,155,0.22)] transition-colors hover:bg-[#0f766e]"
                  >
                    Registrar cuestionario
                  </button>
                )}
                {!patient?.missingQuestionnaire && (
                  <button
                    type="button"
                    onClick={() => setIsQuestionnaireModalOpen(true)}
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
                    onClick={handleRegisterQuestionnaire}
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

  const renderTreatmentTab = () => (
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
              <Sparkles size={16} />
              Plan activo
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

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'ficha':
        return renderFichaTab()
      case 'tratamientos':
        return renderTreatmentTab()
      case 'documentos':
        return (
          <PlaceholderTab
            title="Documentos del paciente"
            description="Aquí se mostrará el historial documental asociado al paciente, archivos subidos y accesos rápidos."
          />
        )
      case 'presupuestos':
        return (
          <PlaceholderTab
            title="Presupuestos"
            description="Aquí se podrán visualizar presupuestos generados, estados de aprobación y montos asociados."
          />
        )
      case 'tratamientos-realizados':
        return (
          <PlaceholderTab
            title="Tratamientos realizados"
            description="Aquí se listará el historial clínico ejecutado, procedimientos completados y fechas importantes."
          />
        )
      case 'odontograma':
        return (
          <PlaceholderTab
            title="Odontograma"
            description="Aquí se incorporará la vista odontológica detallada con piezas, hallazgos y anotaciones."
          />
        )
      case 'recetas-brindadas':
        return (
          <PlaceholderTab
            title="Recetas brindadas"
            description="Aquí se mostrarán las recetas emitidas, indicaciones médicas y seguimiento farmacológico."
          />
        )
      default:
        return renderFichaTab()
    }
  }

  if (isLoading) {
    return (
      <section className="grid gap-y-6 px-2 pb-6 pt-4 lg:gap-y-7">
        <LoadingState
          title="Cargando ficha del paciente"
          description="Estamos recuperando la información clínica desde el backend."
          rows={4}
        />
      </section>
    )
  }

  if (!patient) {
    return (
      <section className="grid gap-y-6 px-2 pb-6 pt-4 lg:gap-y-7">
        <div className="rounded-[28px] border border-dashed border-slate-200 bg-white p-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">No pudimos encontrar al paciente</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            La ficha no existe o no pudimos recuperarla desde el backend.
          </p>
          <button
            type="button"
            onClick={() => navigate('/patient')}
            className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#00b09b] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} />
            Volver a pacientes
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="grid gap-y-6 px-2 pb-6 pt-4 lg:gap-y-7">
      <div className="flex flex-col gap-4 rounded-[28px] border border-white/60 bg-gradient-to-r from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <button
            type="button"
            onClick={() => navigate('/patient')}
            className="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <ArrowLeft size={16} />
            Volver a pacientes
          </button>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">Ficha del paciente</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Vista integral del perfil, seguimiento clínico y actividad reciente.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-[#00b09b]/30 hover:bg-[#00b09b]/8 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            Nuevo documento
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            Descargar ficha
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <motion.aside
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden rounded-[28px] border border-[#6dd6c8]/35 bg-[linear-gradient(180deg,#18465b_0%,#176173_45%,#198878_78%,#1aa08d_100%)] text-white shadow-[0_24px_60px_rgba(26,160,141,0.28)]"
        >
          <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(125,233,222,0.34),transparent_58%)] px-6 pb-6 pt-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[30px] border border-white/25 bg-white/15 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.16)] ring-4 ring-[#a6f3ea]/15">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[24px] bg-slate-200/95">
                  <img
                    src={profileImage}
                    alt={fullName}
                    onError={(event) => {
                      event.target.onerror = null
                      event.target.src = ImagesApp.defaultImage
                    }}
                    className="block h-full w-full object-contain object-center"
                  />
                </div>
              </div>
              <h2 className="mt-5 text-2xl font-semibold">{fullName}</h2>
              <p className="mt-2 text-sm text-white/75">{profileSummary || 'Perfil general del paciente'}</p>
              <div className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#7de9de]">
                Ficha nro. {patient?.id || patient?.ciPaciente || 'N/D'}
              </div>
            </div>
          </div>

          <nav className="space-y-2 p-4">
            {sideMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.key

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveTab(item.key)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#00b09b] text-white shadow-[0_8px_20px_rgba(0,176,155,0.32)]'
                      : 'text-white/82 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-[22px] bg-white/6 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Contacto rápido</p>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#7de9de]" />
                  <span>{patient?.telefono || patient?.phonesNumbers?.[0]?.numero || 'No registrado'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#7de9de]" />
                  <span className="truncate">{patient?.email || 'No registrado'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#7de9de]" />
                  <span>{patient?.direccion || 'No registrada'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        <div className="min-w-0">{renderActiveContent()}</div>
      </div>

      {isQuestionnaireModalOpen && !patient?.missingQuestionnaire && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
          onClick={() => setIsQuestionnaireModalOpen(false)}
        >
          <div
            className="max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.24)] dark:border-slate-800 dark:bg-slate-950"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Cuestionario médico completo</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Resumen completo de respuestas del paciente.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsQuestionnaireModalOpen(false)}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[calc(88vh-88px)] overflow-y-auto p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {questionnaireItems.map((item) => (
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
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PatientDetails
