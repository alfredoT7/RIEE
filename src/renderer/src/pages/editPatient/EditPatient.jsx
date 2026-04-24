import React, { useEffect, useMemo, useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { getAllPatients, getCompletePatient, updatePatient } from '../../api/Api'
import LoadingState from '../../components/loading/LoadingState'
import PatientForm from '../newPatient/components/PatientForm'
import { buildPatientFormData, mapPatientToInitialValues, normalizeTextValue } from '../newPatient/patientFormUtils'
import { applyBackendFieldErrors, extractBackendMessage } from '../newPatient/submitHelpers'

const EditPatient = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { patientId } = useParams()
  const [patient, setPatient] = useState(location.state?.patient || null)
  const [isLoading, setIsLoading] = useState(!location.state?.patient)

  useEffect(() => {
    if (location.state?.patient) {
      setPatient(location.state.patient)
      setIsLoading(false)
      return
    }

    let isMounted = true

    const fetchPatient = async () => {
      try {
        const response = await getCompletePatient(patientId)
        const selectedPatient = response.data?.data || null

        if (!isMounted) {
          return
        }

        setPatient(selectedPatient || null)
      } catch (error) {
        try {
          const response = await getAllPatients()
          const patientList = Array.isArray(response.data?.data) ? response.data.data : []
          const selectedPatient = patientList.find((item) => `${item.id || item.ciPaciente}` === `${patientId}`)

          if (!isMounted) {
            return
          }

          setPatient(selectedPatient || null)
        } catch (fallbackError) {
          if (isMounted) {
            setPatient(null)
          }
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
  }, [location.state, patientId])

  useEffect(() => {
    if (!isLoading && !patient) {
      navigate('/patient', { replace: true })
    }
  }, [isLoading, navigate, patient])

  const initialValues = useMemo(() => mapPatientToInitialValues(patient), [patient])
  const previewUrl = patient?.imagen || null
  const cancelState = patient ? { patient } : undefined

  const handleSubmit = async (values, { setSubmitting, setTouched, setFieldError, setStatus }, imageControls) => {
    setStatus(null)

    try {
      const patientData = buildPatientFormData(values, imageControls.selectedFile)
      console.log('[EditPatient] Enviando actualización de paciente', {
        patientId,
        payload: Object.fromEntries(patientData.entries())
      })

      const response = await updatePatient(patientId, patientData)
      console.log('[EditPatient] Respuesta del servidor', {
        status: response?.status,
        data: response?.data
      })

      const updatedPatient = response?.data?.data || {
        ...patient,
        id: patient?.id || patientId,
        nombre: normalizeTextValue(values.name),
        apellido: normalizeTextValue(values.lastname),
        ciPaciente: normalizeTextValue(values.ci),
        fechaNacimiento: values.birthDate,
        direccion: normalizeTextValue(values.address),
        email: normalizeTextValue(values.email),
        ocupacion: normalizeTextValue(values.occupation),
        estadoCivil: values.civilStatus,
        personaDeReferencia: normalizeTextValue(values.referencePerson),
        numeroPersonaRef: normalizeTextValue(values.referencePhone),
        phonesNumbers: [
          { numero: normalizeTextValue(values.phone) },
          ...(normalizeTextValue(values.secondPhone) ? [{ numero: normalizeTextValue(values.secondPhone) }] : [])
        ]
      }

      toast.success('Paciente actualizado correctamente', {
        description: `${values.name} ${values.lastname} fue actualizado.`,
        duration: 4000
      })

      navigate(`/patient/${patientId}`, {
        replace: true,
        state: { patient: updatedPatient }
      })
    } catch (error) {
      console.error('[EditPatient] Error al actualizar paciente', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data
      })

      const backendMessage = extractBackendMessage(error)
      const fallbackError = backendMessage || 'No se pudo actualizar al paciente. Revisa los campos e intenta nuevamente.'

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

      toast.error('Error al actualizar el paciente', {
        description: fallbackError,
        duration: 5000
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <section className="grid gap-y-6 px-2 pb-6 pt-4 lg:gap-y-7">
        <LoadingState
          title="Cargando paciente"
          description="Estamos preparando la información para edición."
          rows={4}
        />
      </section>
    )
  }

  if (!patient) {
    return null
  }

  return (
    <PatientForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      title="Editar Datos del Paciente"
      description="Actualiza los datos personales del paciente y guarda los cambios."
      heroIcon={FaUserEdit}
      cancelPath={`/patient/${patientId}`}
      cancelState={cancelState}
      submitLabel="Guardar Cambios"
      submitLoadingLabel="Actualizando..."
      initialPreviewUrl={previewUrl}
    />
  )
}

export default EditPatient
