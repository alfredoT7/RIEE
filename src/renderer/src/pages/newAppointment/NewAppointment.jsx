import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientSearch from '../../components/patientSearch/PatientSearch';
import { getAllPatients, registerAppointment } from '../../api/Api';

const NewAppointment = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    motivo: '',
    duracion: '30',
    estado: 'Programada',
    observaciones: ''
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatients();
        setPatients(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setPatients([]);
      }
    };
    fetchPatients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPatient) {
      alert('Por favor selecciona un paciente');
      return;
    }

    try {
      const appointmentData = {
        fechaCita: formData.fecha,
        horaCita: formData.hora,
        motivoCita: formData.motivo,
        estadoCita: formData.estado,
        observacionesCita: formData.observaciones,
        duracionEstimada: parseInt(formData.duracion),
        patientId: selectedPatient.id || selectedPatient.ciPaciente,
        appointmentStatusId: 1
      };

      await registerAppointment(appointmentData);
      alert('Cita creada exitosamente');
      navigate('/appointments');
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Error al crear la cita');
    }
  };

  const handleCancel = () => {
    navigate('/appointments');
  };

  return (
    <div className="new-appointment-container">
      <div className="new-appointment-header">
        <h1>Nueva Cita</h1>
        <p>Programa una nueva cita para un paciente</p>
      </div>

      <div className="new-appointment-content">
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-section">
            <h3>Información del Paciente</h3>
            <div className="form-group">
              <PatientSearch 
                patients={patients}
                onPatientSelect={handlePatientSelect}
                placeholder="Buscar paciente por nombre, cédula o teléfono"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Detalles de la Cita</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Motivo de la cita *</label>
                <input
                  type="text"
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleInputChange}
                  placeholder="Ej: Consulta general, Limpieza dental"
                  required
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                >
                  <option value="Programada">Programada</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="En espera">En espera</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Fecha *</label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Hora *</label>
                <select
                  name="hora"
                  value={formData.hora}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar hora</option>
                  <option value="08:00">08:00 AM</option>
                  <option value="08:30">08:30 AM</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="09:30">09:30 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="10:30">10:30 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="14:30">02:30 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="15:30">03:30 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="16:30">04:30 PM</option>
                  <option value="17:00">05:00 PM</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Duración estimada (minutos)</label>
              <select
                name="duracion"
                value={formData.duracion}
                onChange={handleInputChange}
              >
                <option value="30">30 minutos</option>
                <option value="60">60 minutos</option>
                <option value="90">90 minutos</option>
                <option value="120">120 minutos</option>
              </select>
            </div>

            <div className="form-group">
              <label>Observaciones</label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleInputChange}
                placeholder="Observaciones adicionales sobre la cita..."
                rows="4"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Guardar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppointment;
