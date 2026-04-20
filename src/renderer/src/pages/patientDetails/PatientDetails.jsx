import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import LoadingState from '../../components/loading/LoadingState'
import PatientHeader from './components/PatientHeader'
import PatientSidebar from './components/PatientSidebar'
import PatientFichaTab from './components/PatientFichaTab'
import PatientTreatmentTab from './components/PatientTreatmentTab'
import PlaceholderTab from './components/PlaceholderTab'
import QuestionnaireModal from './components/QuestionnaireModal'
import usePatientDetails from './hooks/usePatientDetails'
import { sideMenuItems } from './constants/patientDetails.constants'
import { buildQuestionnaireItems, calculateAge } from './utils/patientDetails.utils'

const PatientDetails = () => {
  const navigate = useNavigate()
  const { patientId } = useParams()
  const { patient, isLoading } = usePatientDetails(patientId)
  const [activeTab, setActiveTab] = useState(sideMenuItems[0].key)
  const [isQuestionnaireModalOpen, setIsQuestionnaireModalOpen] = useState(false)

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
  const questionnaireItems = useMemo(() => buildQuestionnaireItems(patient), [patient])
  const questionnairePreviewItems = questionnaireItems.slice(0, 2)
  const profileSummary = [
    age ? `${age} años` : null,
    patient?.sexo || patient?.genero || null,
    patient?.ciPaciente ? `CI ${patient.ciPaciente}` : null
  ]
    .filter(Boolean)
    .join(' · ')

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'ficha':
        return (
          <PatientFichaTab
            patient={patient}
            questionnairePreviewItems={questionnairePreviewItems}
            onEditPatient={handleEditPatient}
            onRegisterClinicalInfo={handleRegisterClinicalInfo}
            onRegisterQuestionnaire={handleRegisterQuestionnaire}
            onOpenQuestionnaireModal={() => setIsQuestionnaireModalOpen(true)}
          />
        )
      case 'tratamientos':
        return <PatientTreatmentTab />
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
        return (
          <PatientFichaTab
            patient={patient}
            questionnairePreviewItems={questionnairePreviewItems}
            onEditPatient={handleEditPatient}
            onRegisterClinicalInfo={handleRegisterClinicalInfo}
            onRegisterQuestionnaire={handleRegisterQuestionnaire}
            onOpenQuestionnaireModal={() => setIsQuestionnaireModalOpen(true)}
          />
        )
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
      <PatientHeader onBack={() => navigate('/patient')} />

      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <PatientSidebar
          patient={patient}
          fullName={fullName}
          profileSummary={profileSummary}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="min-w-0">{renderActiveContent()}</div>
      </div>

      {isQuestionnaireModalOpen && !patient?.missingQuestionnaire && (
        <QuestionnaireModal items={questionnaireItems} onClose={() => setIsQuestionnaireModalOpen(false)} />
      )}
    </section>
  )
}

export default PatientDetails
