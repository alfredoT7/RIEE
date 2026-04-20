import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { registerPatient } from '../../api/Api'
import { initialValues } from './formConfig'
import { buildPatientFormData } from './patientFormUtils'
import { applyBackendFieldErrors, extractBackendMessage } from './submitHelpers'
import PatientForm from './components/PatientForm'

const NewPatient = () => {
  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting, setTouched, setFieldError, setStatus }, imageControls) => {
    setStatus(null)

    try {
      const patientData = buildPatientFormData(values, imageControls.selectedFile)
      const response = await registerPatient(patientData)
      const patientId = response?.data?.data?.id || response?.data?.id || response?.data?.patientId

      toast.success('¡Paciente registrado exitosamente!', {
        description: `${values.name} ${values.lastname} ha sido agregado al sistema`,
        duration: 4000
      })

      imageControls.clearImageSelection()
      navigate('/new-patient/questionnaire', {
        replace: true,
        state: {
          patientId,
          patientName: `${values.name} ${values.lastname}`.trim()
        }
      })
    } catch (error) {
      const backendMessage = extractBackendMessage(error)
      const fallbackError = backendMessage || 'No se pudo registrar al paciente. Revisa los campos e intenta nuevamente.'

      setStatus({
        type: 'error',
        message: fallbackError
      })

      setTouched(
        Object.keys(values).reduce((acc, key) => {
          acc[key] = true
          return acc
        }, {}),
        true
      )

      applyBackendFieldErrors(error, setFieldError, fallbackError)

      toast.error('Error al registrar el paciente', {
        description: fallbackError,
        duration: 5000
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PatientForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      title="Registro de Nuevo Paciente"
      description="Complete toda la información del paciente para crear su perfil médico."
      heroIcon={FaUserPlus}
      cancelPath="/patient"
      submitLabel="Registrar Paciente"
      submitLoadingLabel="Guardando..."
    />
  )
}

export default NewPatient
