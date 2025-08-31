import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Appointments.css';

const Appointments = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNewAppointment = () => {
    navigate('/nueva-cita');
  };
  return (
    <div className="appointments-container">
      <div className="appointments-summary">
        <h2>Resumen de citas</h2>
        <p className="summary-subtitle">Vista general de las citas programadas para los próximos 7 días</p>
        
        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-icon calendar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-number">24</h3>
              <p className="card-label">Total citas</p>
              <span className="card-change positive">+3 vs semana anterior</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon patients-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-number">8</h3>
              <p className="card-label">Nuevos pacientes</p>
              <span className="card-change positive">+2 vs semana anterior</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon hours-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-number">32h</h3>
              <p className="card-label">Horas programadas</p>
              <span className="card-change positive">+5h vs semana anterior</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon treatments-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-number">18</h3>
              <p className="card-label">Tratamientos</p>
              <span className="card-change negative">-2 vs semana anterior</span>
            </div>
          </div>
        </div>
      </div>

      <div className="appointments-agenda">
        <div className="agenda-header">
          <div className="agenda-title">
            <h2>Citas</h2>
            <p>Gestión de agenda y citas programadas</p>
          </div>
          <button 
            className="new-appointment-btn"
            onClick={handleNewAppointment}
          >
            + Nueva Cita
          </button>
        </div>

        <div className="agenda-controls">
          <div className="date-navigation">
            <button className="nav-btn">‹</button>
            <h3 className="current-date">Viernes, 22 De Agosto De 2025</h3>
            <button className="nav-btn">›</button>
            <span className="today-label">Hoy</span>
          </div>
          
          <div className="view-controls">
            <button className="view-btn active">Día</button>
            <button className="view-btn">Semana</button>
            <button className="view-btn">Mes</button>
          </div>
        </div>

        <div className="agenda-content">
          <div className="schedule-column">
            <div className="time-slot">
              <span className="time">08:00</span>
            </div>
            <div className="time-slot">
              <span className="time">08:30</span>
            </div>
            <div className="time-slot">
              <span className="time">09:00</span>
            </div>
            <div className="time-slot">
              <span className="time">09:30</span>
            </div>
            <div className="time-slot">
              <span className="time">10:00</span>
            </div>
            <div className="time-slot">
              <span className="time">10:30</span>
            </div>
            <div className="time-slot">
              <span className="time">11:00</span>
            </div>
            <div className="time-slot">
              <span className="time">11:30</span>
            </div>
            <div className="time-slot">
              <span className="time">12:00</span>
            </div>
            <div className="time-slot">
              <span className="time">12:30</span>
            </div>
            <div className="time-slot">
              <span className="time">13:00</span>
            </div>
            <div className="time-slot">
              <span className="time">13:30</span>
            </div>
            <div className="time-slot">
              <span className="time">14:00</span>
            </div>
            <div className="time-slot">
              <span className="time">14:30</span>
            </div>
            <div className="time-slot">
              <span className="time">15:00</span>
            </div>
            <div className="time-slot">
              <span className="time">15:30</span>
            </div>
            <div className="time-slot">
              <span className="time">16:00</span>
            </div>
            <div className="time-slot">
              <span className="time">16:30</span>
            </div>
            <div className="time-slot">
              <span className="time">17:00</span>
            </div>
            <div className="time-slot">
              <span className="time">17:30</span>
            </div>
          </div>

          <div className="appointments-column">
            <div className="appointment-slot">
              <div className="appointment initial-consultation duration-30" style={{top: '2px'}}>
                <div className="appointment-info">
                  <h4>Juan Pérez</h4>
                  <p>Consulta inicial</p>
                </div>
                <span className="appointment-duration">30 min</span>
              </div>
            </div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot">
              <div className="appointment dental-cleaning duration-60" style={{top: '2px'}}>
                <div className="appointment-info">
                  <h4>María García</h4>
                  <p>Limpieza dental</p>
                </div>
                <span className="appointment-duration">60 min</span>
              </div>
            </div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot">
              <div className="appointment dental-extraction duration-30" style={{top: '2px'}}>
                <div className="appointment-info">
                  <h4>Carlos Rodríguez</h4>
                  <p>Extracción dental</p>
                </div>
                <span className="appointment-duration">30 min</span>
              </div>
            </div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot">
              <div className="appointment orthodontic-review duration-90" style={{top: '2px'}}>
                <div className="appointment-info">
                  <h4>Ana Martínez</h4>
                  <p>Revisión de ortodoncia</p>
                </div>
                <span className="appointment-duration">90 min</span>
              </div>
            </div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot">
              <div className="appointment endodontic duration-120" style={{top: '2px'}}>
                <div className="appointment-info">
                  <h4>Laura Sanchez</h4>
                  <p>Endodoncia</p>
                </div>
                <span className="appointment-duration">120 min</span>
              </div>
            </div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot"></div>

            <div className="appointment-slot">
              <div className="appointment consultation duration-30" style={{top: '2px'}}>
                <div className="appointment-info">
                  <h4>Roberto Gomez</h4>
                  <p>Consulta</p>
                </div>
                <span className="appointment-duration">30 min</span>
              </div>
            </div>

            <div className="appointment-slot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;