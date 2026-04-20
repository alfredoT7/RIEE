import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaFileMedicalAlt, FaSave, FaStethoscope } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { registerPatientClinicalInfo } from '../../api/Api'

const CONSULTATION_REASONS = [
  'Dolor dental',
  'Control general',
  'Limpieza dental',
  'Caries',
  'Inflamacion de encias',
  'Sensibilidad dental',
  'Ortodoncia',
  'Revisión post tratamiento',
  'Urgencia odontológica'
]

const ALLERGY_OPTIONS = [
  'Penicilina',
  'Amoxicilina',
  'Anestesia local',
  'Ibuprofeno',
  'Diclofenaco',
  'Paracetamol',
  'Aspirina',
  'Sulfas',
  'Clindamicina',
  'Látex',
  'Yodo',
  'Polvo',
  'Mariscos',
  'Frutos secos',
  'Picaduras de insectos',
  'Ninguna conocida'
]

const NewPatientClinicalInfo = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const patientId = location.state?.patientId
  const patientName = location.state?.patientName || 'Paciente registrado'
  const returnToPatientDetails = Boolean(location.state?.returnToPatientDetails)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    motivoConsulta: CONSULTATION_REASONS[0],
    alergias: [],
    observaciones: ''
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!patientId) {
      navigate('/patient', { replace: true })
    }
  }, [navigate, patientId])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAllergyToggle = (allergy) => {
    setForm((prev) => {
      const exists = prev.alergias.includes(allergy)

      return {
        ...prev,
        alergias: exists ? prev.alergias.filter((item) => item !== allergy) : [...prev.alergias, allergy]
      }
    })
  }

  const handleContinue = async () => {
    if (!patientId) {
      toast.error('No se encontró el paciente', {
        description: 'Primero debes registrar al paciente antes de guardar la información clínica.',
        duration: 4000
      })
      return
    }

    const payload = {
      motivoConsulta: form.motivoConsulta,
      alergias: form.alergias.join(', '),
      observaciones: form.observaciones.trim() || 'Sin observaciones'
    }

    setIsSubmitting(true)

    try {
      const response = await registerPatientClinicalInfo(patientId, payload)

      console.log('Respuesta del servidor al guardar clinical-info:', response?.data)

      toast.success('Información clínica guardada correctamente', {
        description: `Se registró la información clínica inicial de ${patientName}.`,
        duration: 3500
      })

      navigate(returnToPatientDetails ? `/patient/${patientId}` : '/patient', { replace: true })
    } catch (error) {
      console.error('Error al guardar clinical-info:', error)

      const backendMessage =
        error.response?.data?.message || error.response?.data?.error || 'No se pudo guardar la información clínica.'

      toast.error('Error al guardar información clínica', {
        description: backendMessage,
        duration: 4500
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="grid w-full place-items-center px-4 pb-8 pt-5 sm:px-6">
      <div className="flex w-full max-w-[980px] flex-col gap-7">
        <div className="w-full overflow-hidden rounded-[30px] border border-[#00b09b]/20 bg-gradient-to-r from-[#0f766e] via-[#11b6a1] to-[#19d3bc] px-6 py-7 text-white shadow-[0_24px_60px_rgba(15,118,110,0.22)] sm:px-8">
          <div className="flex flex-col gap-3 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                <FaFileMedicalAlt size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Resumen Clínico Inicial</h1>
                <p className="mt-1 text-sm text-white/90 sm:text-base">
                  Completa el motivo de consulta y las notas iniciales de {patientName}.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00b09b]/10 text-[#0f766e]">
              <FaStethoscope />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Datos clínicos</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Este formulario es estático por ahora.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-2">
              <label htmlFor="motivoConsulta" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                MOTIVO DE LA CONSULTA
              </label>
              <select
                id="motivoConsulta"
                name="motivoConsulta"
                value={form.motivoConsulta}
                onChange={handleChange}
                className="h-14 cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-700 outline-none transition-colors focus:border-[#00b09b] focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
              >
                {CONSULTATION_REASONS.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                ALERGIAS
              </label>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap gap-3 pb-3">
                  {ALLERGY_OPTIONS.map((allergy) => {
                    const isSelected = form.alergias.includes(allergy)

                    return (
                      <button
                        key={allergy}
                        type="button"
                        onClick={() => handleAllergyToggle(allergy)}
                        className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                          isSelected
                            ? 'border-[#00b09b] bg-[#00b09b] text-white'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-[#00b09b]/40 hover:text-[#0f766e] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
                        }`}
                      >
                        {allergy}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                  {form.alergias.length > 0 ? form.alergias.join(', ') : 'Selecciona una o varias alergias.'}
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="observaciones" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                OBSERVACIONES
              </label>
              <textarea
                id="observaciones"
                name="observaciones"
                rows="5"
                value={form.observaciones}
                onChange={handleChange}
                placeholder="Añade observaciones iniciales, comportamiento clínico, notas adicionales o hallazgos relevantes..."
                className="min-h-[150px] resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#00b09b] focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() =>
              navigate(
                returnToPatientDetails ? `/patient/${patientId}` : '/new-patient/questionnaire',
                returnToPatientDetails ? undefined : { state: location.state }
              )
            }
            disabled={isSubmitting}
            className="inline-flex h-12 min-w-[170px] cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <FaArrowLeft />
            {returnToPatientDetails ? 'Volver a la ficha' : 'Volver'}
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={isSubmitting}
            className="inline-flex h-12 min-w-[220px] cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#00b09b] px-6 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(0,176,155,0.22)] transition-colors hover:bg-[#0f766e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSave />
            {isSubmitting ? 'Guardando...' : 'Guardar y finalizar'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default NewPatientClinicalInfo
