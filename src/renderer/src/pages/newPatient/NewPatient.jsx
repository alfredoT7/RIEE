import React from 'react'
import { Formik, Form } from 'formik'
import {
  FaAddressCard,
  FaArrowLeft,
  FaBriefcase,
  FaCalendar,
  FaCamera,
  FaEnvelope,
  FaHeart,
  FaIdCard,
  FaInfoCircle,
  FaMapMarker,
  FaPhone,
  FaPhoneAlt,
  FaSave,
  FaTrash,
  FaUser,
  FaUserFriends,
  FaUserPlus
} from 'react-icons/fa'
import { registerPatient } from '../../api/Api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { initialValues, validationSchema, CIVIL_STATUS_OPTIONS } from './formConfig'
import { buildPatientFormData } from './patientFormUtils'
import { usePatientImage } from './usePatientImage'
import { sectionClass } from './formStyles'
import FieldBlock, { SectionTitle } from './components/FieldBlock'
import PatientPhotoSection from './components/PatientPhotoSection'

const FIELD_KEYWORDS = {
  ci: ['ci', 'carnet', 'identidad', 'ciPaciente'],
  email: ['email', 'correo'],
  phone: ['telefono principal', 'telefono', 'phone'],
  secondPhone: ['telefono secundario', 'secondPhone'],
  birthDate: ['fecha de nacimiento', 'birthDate'],
  civilStatus: ['estado civil', 'civilStatus'],
  occupation: ['ocupacion', 'ocupación'],
  referencePerson: ['persona de referencia', 'referencePerson'],
  referencePhone: ['telefono de referencia', 'referencePhone'],
  address: ['direccion', 'dirección', 'address'],
  name: ['nombre', 'nombres'],
  lastname: ['apellido', 'apellidos']
}

const extractBackendMessage = (error) => {
  const data = error.response?.data

  if (typeof data?.message === 'string') {
    return data.message
  }

  if (typeof data?.error === 'string') {
    return data.error
  }

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.join(' | ')
  }

  return ''
}

const applyBackendFieldErrors = (error, setFieldError, fallbackMessage) => {
  const data = error.response?.data

  if (data && typeof data === 'object') {
    const fieldErrors = data.fieldErrors || data.errorsByField || data.validationErrors

    if (fieldErrors && typeof fieldErrors === 'object' && !Array.isArray(fieldErrors)) {
      let applied = false
      Object.entries(fieldErrors).forEach(([field, message]) => {
        if (typeof message === 'string') {
          setFieldError(field, message)
          applied = true
        }
      })

      if (applied) {
        return true
      }
    }
  }

  const normalizedMessage = fallbackMessage.toLowerCase()
  let hasMatch = false

  Object.entries(FIELD_KEYWORDS).forEach(([field, keywords]) => {
    if (keywords.some((keyword) => normalizedMessage.includes(keyword.toLowerCase()))) {
      setFieldError(field, fallbackMessage)
      hasMatch = true
    }
  })

  return hasMatch
}

const NewPatient = () => {
  const navigate = useNavigate()
  const {
    fileInputRef,
    selectedFile,
    previewUrl,
    handleFileChange,
    handleFileButtonClick,
    clearImageSelection
  } = usePatientImage()

  const handleSubmit = async (values, { setSubmitting, setTouched, setFieldError, setStatus }) => {
    setStatus(null)

    try {
      const patientData = buildPatientFormData(values, selectedFile)

      const response = await registerPatient(patientData)
      console.log('Respuesta del servidor al crear paciente:', response?.data)
      const patientId = response?.data?.data?.id || response?.data?.id || response?.data?.patientId

      toast.success('¡Paciente registrado exitosamente!', {
        description: `${values.name} ${values.lastname} ha sido agregado al sistema`,
        duration: 4000
      })

      clearImageSelection()
      navigate('/new-patient/questionnaire', {
        state: {
          patientId,
          patientName: `${values.name} ${values.lastname}`.trim()
        }
      })
    } catch (error) {
      console.error('Error submitting form:', error)
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
    <section className="grid w-full place-items-center px-4 pb-8 pt-5 sm:px-6">
      <div className="flex w-full max-w-[880px] flex-col gap-7">
        <div className="w-full overflow-hidden rounded-[30px] border border-[#00b09b]/20 bg-gradient-to-r from-[#0f766e] via-[#11b6a1] to-[#19d3bc] px-6 py-7 text-white shadow-[0_24px_60px_rgba(15,118,110,0.22)] sm:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/18 ring-1 ring-white/20">
              <FaUserPlus size={28} />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">Registro de Nuevo Paciente</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/90 sm:text-base">
              Complete toda la información del paciente para crear su perfil médico.
            </p>
          </div>
        </div>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, errors, touched, status }) => (
            <Form className="flex w-full flex-col gap-7">
              {status?.type === 'error' && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
                  {status.message}
                </div>
              )}

              <PatientPhotoSection
                fileInputRef={fileInputRef}
                isSubmitting={isSubmitting}
                onFileChange={handleFileChange}
                onFileButtonClick={handleFileButtonClick}
                onRemoveImage={clearImageSelection}
                previewUrl={previewUrl}
              />

              <div className={sectionClass}>
                <SectionTitle icon={FaAddressCard}>Información Personal</SectionTitle>
                <div className="grid gap-x-5 gap-y-7 md:grid-cols-2">
                  <FieldBlock name="name" label="Nombres *" icon={FaUser} error={errors.name} touched={touched.name} placeholder="Ingrese los nombres" />
                  <FieldBlock
                    name="lastname"
                    label="Apellidos *"
                    icon={FaUser}
                    error={errors.lastname}
                    touched={touched.lastname}
                    placeholder="Ingrese los apellidos"
                  />
                  <FieldBlock name="ci" label="Carnet de Identidad *" icon={FaIdCard} error={errors.ci} touched={touched.ci} placeholder="Ej: 1234567 LP" />
                  <FieldBlock
                    name="birthDate"
                    label="Fecha de Nacimiento *"
                    icon={FaCalendar}
                    type="date"
                    error={errors.birthDate}
                    touched={touched.birthDate}
                  />
                  <div className="md:col-span-2">
                    <FieldBlock
                      name="address"
                      label="Dirección"
                      icon={FaMapMarker}
                      error={errors.address}
                      touched={touched.address}
                      placeholder="Ingrese la dirección completa"
                    />
                  </div>
                </div>
              </div>

              <div className={sectionClass}>
                <SectionTitle icon={FaPhoneAlt}>Información de Contacto</SectionTitle>
                <div className="grid gap-x-5 gap-y-7 md:grid-cols-2">
                  <FieldBlock
                    name="phone"
                    label="Teléfono Principal *"
                    icon={FaPhone}
                    type="tel"
                    error={errors.phone}
                    touched={touched.phone}
                    placeholder="70123456"
                  />
                  <FieldBlock
                    name="secondPhone"
                    label="Teléfono Secundario"
                    icon={FaPhone}
                    type="tel"
                    error={errors.secondPhone}
                    touched={touched.secondPhone}
                    placeholder="22334455 (Opcional)"
                  />
                  <div className="md:col-span-2">
                    <FieldBlock
                      name="email"
                      label="Correo Electrónico *"
                      icon={FaEnvelope}
                      type="email"
                      error={errors.email}
                      touched={touched.email}
                      placeholder="ejemplo@correo.com"
                    />
                  </div>
                </div>
              </div>

              <div className={sectionClass}>
                <SectionTitle icon={FaInfoCircle}>Información Adicional</SectionTitle>
                <div className="grid gap-x-5 gap-y-7 md:grid-cols-2">
                  <FieldBlock
                    name="civilStatus"
                    label="Estado Civil *"
                    icon={FaHeart}
                    as="select"
                    error={errors.civilStatus}
                    touched={touched.civilStatus}
                  >
                    <option value="">Seleccione estado civil</option>
                    {CIVIL_STATUS_OPTIONS.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </FieldBlock>
                  <FieldBlock
                    name="occupation"
                    label="Ocupación *"
                    icon={FaBriefcase}
                    error={errors.occupation}
                    touched={touched.occupation}
                    placeholder="Ej: Ingeniero, Estudiante, etc."
                  />
                </div>
              </div>

              <div className={sectionClass}>
                <SectionTitle icon={FaUserFriends}>Persona de Referencia</SectionTitle>
                <div className="grid gap-x-5 gap-y-7 md:grid-cols-2">
                  <FieldBlock
                    name="referencePerson"
                    label="Nombre Completo *"
                    icon={FaUserFriends}
                    error={errors.referencePerson}
                    touched={touched.referencePerson}
                    placeholder="Nombre de la persona de contacto"
                  />
                  <FieldBlock
                    name="referencePhone"
                    label="Teléfono de Referencia *"
                    icon={FaPhone}
                    type="tel"
                    error={errors.referencePhone}
                    touched={touched.referencePhone}
                    placeholder="Teléfono de contacto"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/patient')}
                  disabled={isSubmitting}
                  className="inline-flex h-12 min-w-[170px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  <FaArrowLeft />
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-[#00b09b] px-6 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(0,176,155,0.22)] transition-colors hover:bg-[#0f766e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaSave />
                  {isSubmitting ? 'Guardando...' : 'Registrar Paciente'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default NewPatient
