import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import PatientSearch from '../../components/patientSearch/PatientSearch'
import { getAllPatients, registerAppointment } from '../../api/Api'

const fieldClassName =
  'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#00b09b]/40 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500'

const NewAppointment = () => {
  const navigate = useNavigate()
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    motivo: '',
    duracion: '30',
    estado: 'Programada',
    observaciones: ''
  })

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatients()
        setPatients(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.error('Error fetching patients:', error)
        setPatients([])
      }
    }

    fetchPatients()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedPatient) {
      toast.error('Selecciona un paciente antes de continuar')
      return
    }

    try {
      await registerAppointment({
        fechaCita: formData.fecha,
        horaCita: formData.hora,
        motivoCita: formData.motivo,
        estadoCita: formData.estado,
        observacionesCita: formData.observaciones,
        duracionEstimada: parseInt(formData.duracion, 10),
        patientId: selectedPatient,
        appointmentStatusId: 1
      })

      toast.success('Cita creada exitosamente')
      navigate('/appointments')
    } catch (error) {
      console.error('Error creating appointment:', error)
      toast.error('No se pudo crear la cita')
    }
  }

  return (
    <section className="px-2 pb-6 pt-3">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Nueva cita</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Programa una cita y relacionala con un paciente registrado.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h3 className="mb-4 text-base font-semibold text-slate-800 dark:text-slate-100">
              Informacion del paciente
            </h3>
            <PatientSearch
              patients={patients}
              onPatientSelect={setSelectedPatient}
              placeholder="Buscar paciente por nombre, CI o telefono"
            />
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h3 className="mb-4 text-base font-semibold text-slate-800 dark:text-slate-100">
              Detalles de la cita
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Motivo *
                </label>
                <input
                  name="motivo"
                  value={formData.motivo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, motivo: e.target.value }))}
                  placeholder="Consulta general, limpieza dental..."
                  required
                  className={fieldClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Estado
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={(e) => setFormData((prev) => ({ ...prev, estado: e.target.value }))}
                  className={fieldClassName}
                >
                  <option value="Programada">Programada</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="En espera">En espera</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Fecha *
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fecha: e.target.value }))}
                  required
                  className={fieldClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Hora *
                </label>
                <select
                  name="hora"
                  value={formData.hora}
                  onChange={(e) => setFormData((prev) => ({ ...prev, hora: e.target.value }))}
                  required
                  className={fieldClassName}
                >
                  <option value="">Seleccionar hora</option>
                  {[
                    '08:00',
                    '08:30',
                    '09:00',
                    '09:30',
                    '10:00',
                    '10:30',
                    '11:00',
                    '11:30',
                    '14:00',
                    '14:30',
                    '15:00',
                    '15:30',
                    '16:00',
                    '16:30',
                    '17:00'
                  ].map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Duracion estimada
                </label>
                <select
                  name="duracion"
                  value={formData.duracion}
                  onChange={(e) => setFormData((prev) => ({ ...prev, duracion: e.target.value }))}
                  className={fieldClassName}
                >
                  <option value="30">30 minutos</option>
                  <option value="60">60 minutos</option>
                  <option value="90">90 minutos</option>
                  <option value="120">120 minutos</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Observaciones
              </label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, observaciones: e.target.value }))
                }
                rows="4"
                placeholder="Indicaciones o contexto adicional..."
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/appointments')}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-[#00b09b] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-transform hover:-translate-y-0.5"
            >
              Guardar cita
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default NewAppointment
