import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('Día'); // 'Día', 'Semana', 'Mes'
  const [selectedDay, setSelectedDay] = useState(22); // Día seleccionado para la vista de día

  // Datos estáticos de citas - expandidos para múltiples días
  const appointmentsData = {
    'Día': {
      '2025-08-01': [
        { time: '09:00', patient: 'Andrea Moreno', treatment: 'Consulta inicial', duration: 30, type: 'initial-consultation' },
        { time: '10:30', patient: 'Diego Herrera', treatment: 'Limpieza dental', duration: 60, type: 'dental-cleaning' },
        { time: '14:00', patient: 'Patricia Luna', treatment: 'Ortodoncia', duration: 45, type: 'orthodontic-review' },
        { time: '15:30', patient: 'Ricardo Vega', treatment: 'Consulta', duration: 30, type: 'consultation' },
      ],
      '2025-08-02': [
        { time: '08:30', patient: 'Carmen Silva', treatment: 'Endodoncia', duration: 120, type: 'endodontic' },
        { time: '11:00', patient: 'Manuel Torres', treatment: 'Extracción dental', duration: 45, type: 'dental-extraction' },
        { time: '15:00', patient: 'Lucia Campos', treatment: 'Blanqueamiento', duration: 90, type: 'whitening' },
      ],
      '2025-08-05': [
        { time: '08:00', patient: 'Fernando Castro', treatment: 'Implante dental', duration: 120, type: 'implant' },
        { time: '10:30', patient: 'Gloria Mendez', treatment: 'Consulta inicial', duration: 30, type: 'initial-consultation' },
        { time: '12:00', patient: 'Alberto Ruiz', treatment: 'Limpieza dental', duration: 60, type: 'dental-cleaning' },
        { time: '14:30', patient: 'Rosa Martinez', treatment: 'Corona dental', duration: 90, type: 'crown' },
        { time: '16:30', patient: 'Sergio Lopez', treatment: 'Seguimiento', duration: 30, type: 'follow-up' },
      ],
      '2025-08-06': [
        { time: '09:00', patient: 'Isabella Cruz', treatment: 'Odontopediatría', duration: 45, type: 'pediatric' },
        { time: '11:00', patient: 'Mateo Guerrero', treatment: 'Ortodoncia', duration: 60, type: 'orthodontic-review' },
        { time: '13:00', patient: 'Valentina Soto', treatment: 'Cirugía oral', duration: 90, type: 'surgery' },
        { time: '15:30', patient: 'Alejandro Vargas', treatment: 'Consulta', duration: 30, type: 'consultation' },
      ],
      '2025-08-07': [
        { time: '08:30', patient: 'Camila Rodriguez', treatment: 'Puente dental', duration: 120, type: 'bridge' },
        { time: '11:00', patient: 'Nicolas Fernandez', treatment: 'Limpieza dental', duration: 60, type: 'dental-cleaning' },
        { time: '14:00', patient: 'Sofia Morales', treatment: 'Emergencia', duration: 45, type: 'emergency' },
      ],
      '2025-08-08': [
        { time: '09:00', patient: 'Gabriel Santos', treatment: 'Consulta inicial', duration: 30, type: 'initial-consultation' },
        { time: '10:00', patient: 'Daniela Jimenez', treatment: 'Blanqueamiento', duration: 90, type: 'whitening' },
        { time: '12:30', patient: 'Emilio Herrera', treatment: 'Extracción dental', duration: 45, type: 'dental-extraction' },
        { time: '14:30', patient: 'Mariana Castro', treatment: 'Ortodoncia', duration: 60, type: 'orthodontic-review' },
        { time: '16:00', patient: 'Sebastian Torres', treatment: 'Seguimiento', duration: 30, type: 'follow-up' },
      ],
      '2025-08-09': [
        { time: '08:00', patient: 'Adriana Lopez', treatment: 'Endodoncia', duration: 120, type: 'endodontic' },
        { time: '11:00', patient: 'Joaquin Mendoza', treatment: 'Corona dental', duration: 90, type: 'crown' },
        { time: '15:00', patient: 'Renata Silva', treatment: 'Consulta', duration: 30, type: 'consultation' },
      ],
      '2025-08-12': [
        { time: '09:30', patient: 'Andres Gutierrez', treatment: 'Implante dental', duration: 120, type: 'implant' },
        { time: '12:00', patient: 'Paola Reyes', treatment: 'Limpieza dental', duration: 60, type: 'dental-cleaning' },
        { time: '14:30', patient: 'Miguel Vargas', treatment: 'Odontopediatría', duration: 45, type: 'pediatric' },
        { time: '16:30', patient: 'Elena Moreno', treatment: 'Consulta inicial', duration: 30, type: 'initial-consultation' },
      ],
      '2025-08-22': [
        { time: '08:00', patient: 'Juan Pérez', treatment: 'Consulta inicial', duration: 30, type: 'initial-consultation' },
        { time: '09:00', patient: 'María García', treatment: 'Limpieza dental', duration: 60, type: 'dental-cleaning' },
        { time: '11:00', patient: 'Carlos Rodríguez', treatment: 'Extracción dental', duration: 30, type: 'dental-extraction' },
        { time: '13:00', patient: 'Ana Martínez', treatment: 'Revisión de ortodoncia', duration: 90, type: 'orthodontic-review' },
        { time: '15:30', patient: 'Laura Sanchez', treatment: 'Endodoncia', duration: 120, type: 'endodontic' },
        { time: '17:00', patient: 'Roberto Gomez', treatment: 'Consulta', duration: 30, type: 'consultation' }
      ]
    },
    'Semana': {
      'Lunes': [
        { time: '09:00', patient: 'Pedro López', treatment: 'Implante dental', duration: 120, type: 'implant' },
        { time: '14:00', patient: 'Sofia Vega', treatment: 'Blanqueamiento', duration: 60, type: 'whitening' }
      ],
      'Martes': [
        { time: '08:30', patient: 'Miguel Torres', treatment: 'Cirugía oral', duration: 90, type: 'surgery' },
        { time: '11:00', patient: 'Elena Ruiz', treatment: 'Emergencia', duration: 30, type: 'emergency' },
        { time: '15:00', patient: 'David Castro', treatment: 'Seguimiento', duration: 30, type: 'follow-up' }
      ],
      'Miércoles': [
        { time: '10:00', patient: 'Carmen Herrera', treatment: 'Odontopediatría', duration: 45, type: 'pediatric' },
        { time: '13:30', patient: 'Fernando Silva', treatment: 'Corona dental', duration: 90, type: 'crown' }
      ],
      'Jueves': [
        { time: '08:00', patient: 'Luisa Morales', treatment: 'Puente dental', duration: 120, type: 'bridge' },
        { time: '16:00', patient: 'Antonio Jiménez', treatment: 'Limpieza dental', duration: 60, type: 'dental-cleaning' }
      ],
      'Viernes': [
        { time: '09:30', patient: 'Isabella Cruz', treatment: 'Consulta inicial', duration: 30, type: 'initial-consultation' },
        { time: '11:00', patient: 'Rodrigo Mendoza', treatment: 'Extracción', duration: 45, type: 'dental-extraction' },
        { time: '14:30', patient: 'Natalia Guerrero', treatment: 'Ortodoncia', duration: 60, type: 'orthodontic-review' }
      ]
    },
    'Mes': [
      { date: '1', count: 8, highlight: false },
      { date: '2', count: 6, highlight: false },
      { date: '3', count: 0, highlight: false },
      { date: '4', count: 0, highlight: false },
      { date: '5', count: 12, highlight: false },
      { date: '6', count: 9, highlight: false },
      { date: '7', count: 7, highlight: false },
      { date: '8', count: 11, highlight: false },
      { date: '9', count: 5, highlight: false },
      { date: '10', count: 0, highlight: false },
      { date: '11', count: 0, highlight: false },
      { date: '12', count: 8, highlight: false },
      { date: '13', count: 10, highlight: false },
      { date: '14', count: 6, highlight: false },
      { date: '15', count: 9, highlight: false },
      { date: '16', count: 7, highlight: false },
      { date: '17', count: 0, highlight: false },
      { date: '18', count: 0, highlight: false },
      { date: '19', count: 12, highlight: false },
      { date: '20', count: 8, highlight: false },
      { date: '21', count: 11, highlight: false },
      { date: '22', count: 14, highlight: true }, // Día actual
      { date: '23', count: 6, highlight: false },
      { date: '24', count: 0, highlight: false },
      { date: '25', count: 0, highlight: false },
      { date: '26', count: 9, highlight: false },
      { date: '27', count: 8, highlight: false },
      { date: '28', count: 7, highlight: false },
      { date: '29', count: 10, highlight: false },
      { date: '30', count: 5, highlight: false },
      { date: '31', count: 8, highlight: false }
    ]
  };

  const handleNewAppointment = () => {
    navigate('/nueva-cita');
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleDayClick = (day) => {
    setSelectedDay(parseInt(day));
    setCurrentView('Día');
  };

  const formatCurrentDate = () => {
    if (currentView === 'Día') {
      const date = new Date(2025, 7, selectedDay); // Agosto = mes 7 (0-indexed)
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('es-ES', options);
    }
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('es-ES', options);
  };

  const getCurrentViewTitle = () => {
    switch(currentView) {
      case 'Día':
        return formatCurrentDate();
      case 'Semana':
        return 'Semana del 19 al 25 de Agosto, 2025';
      case 'Mes':
        return 'Agosto 2025';
      default:
        return formatCurrentDate();
    }
  };

  // Renderizado de vista de día
  const renderDayView = () => {
    const timeSlots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        timeSlots.push(time);
      }
    }

    // Usar el día seleccionado para obtener las citas
    const selectedDateKey = `2025-08-${selectedDay.toString().padStart(2, '0')}`;
    const dayAppointments = appointmentsData['Día'][selectedDateKey] || [];

    return (
      <div className="agenda-content">
        <div className="schedule-column">
          {timeSlots.map((time) => (
            <div key={time} className="time-slot">
              <span className="time">{time}</span>
            </div>
          ))}
        </div>

        <div className="appointments-column">
          {timeSlots.map((time, index) => {
            const appointment = dayAppointments.find(apt => apt.time === time);
            return (
              <div key={time} className="appointment-slot">
                {appointment && (
                  <div className={`appointment ${appointment.type} duration-${appointment.duration}`} style={{top: '2px'}}>
                    <div className="appointment-info">
                      <h4>{appointment.patient}</h4>
                      <p>{appointment.treatment}</p>
                    </div>
                    <span className="appointment-duration">{appointment.duration} min</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Renderizado de vista de semana
  const renderWeekView = () => {
    const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const timeSlots = [];
    for (let hour = 8; hour < 18; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    return (
      <div className="agenda-content week-view">
        <div className="week-header">
          <div className="time-header"></div>
          {weekDays.map(day => (
            <div key={day} className="day-header">
              <h4>{day}</h4>
              <p>{19 + weekDays.indexOf(day)} Ago</p>
            </div>
          ))}
        </div>
        
        <div className="week-content">
          <div className="week-time-column">
            {timeSlots.map(time => (
              <div key={time} className="week-time-slot">
                <span className="time">{time}</span>
              </div>
            ))}
          </div>
          
          {weekDays.map(day => (
            <div key={day} className="week-day-column">
              {timeSlots.map(time => {
                const dayAppointments = appointmentsData['Semana'][day] || [];
                const appointment = dayAppointments.find(apt => apt.time.startsWith(time.split(':')[0]));
                return (
                  <div key={time} className="week-appointment-slot">
                    {appointment && (
                      <div className={`week-appointment ${appointment.type}`}>
                        <div className="appointment-info">
                          <h5>{appointment.patient}</h5>
                          <p>{appointment.treatment}</p>
                          <span className="time-duration">{appointment.time} ({appointment.duration}min)</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renderizado de vista de mes
  const renderMonthView = () => {
    const monthData = appointmentsData['Mes'];
    const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    
    return (
      <div className="agenda-content month-view">
        <div className="month-header">
          {weekDays.map(day => (
            <div key={day} className="month-day-header">{day}</div>
          ))}
        </div>
        
        <div className="month-grid">
          {monthData.map((day, index) => (
            <div 
              key={index} 
              className={`month-day ${day.highlight ? 'current-day' : ''} ${day.count === 0 ? 'no-appointments' : ''} ${parseInt(day.date) === selectedDay ? 'selected-day' : ''}`}
              onClick={() => handleDayClick(day.date)}
            >
              <span className="day-number">{day.date}</span>
              {day.count > 0 && (
                <div className="appointment-count">
                  <span className="count-badge">{day.count}</span>
                  <span className="count-text">citas</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
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
            <h3 className="current-date">{getCurrentViewTitle()}</h3>
            <button className="nav-btn">›</button>
            <span className="today-label">Hoy</span>
          </div>
          
          <div className="view-controls">
            <button 
              className={`view-btn ${currentView === 'Día' ? 'active' : ''}`}
              onClick={() => handleViewChange('Día')}
            >
              Día
            </button>
            <button 
              className={`view-btn ${currentView === 'Semana' ? 'active' : ''}`}
              onClick={() => handleViewChange('Semana')}
            >
              Semana
            </button>
            <button 
              className={`view-btn ${currentView === 'Mes' ? 'active' : ''}`}
              onClick={() => handleViewChange('Mes')}
            >
              Mes
            </button>
          </div>
        </div>

        {/* Renderizado condicional basado en la vista actual */}
        {currentView === 'Día' && renderDayView()}
        {currentView === 'Semana' && renderWeekView()}
        {currentView === 'Mes' && renderMonthView()}
      </div>
    </div>
  );
};

export default Appointments;
