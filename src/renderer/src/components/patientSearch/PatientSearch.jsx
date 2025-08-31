import React, { useState, useEffect, useRef } from 'react';
import './PatientSearch.css';
import { FaSearch, FaUser } from 'react-icons/fa';

const PatientSearch = ({ patients, onPatientSelect, selectedPatientId, placeholder = "Buscar paciente..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filtrar pacientes basado en el término de búsqueda
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = patients.filter(patient =>
        `${patient.nombre} ${patient.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.cedula?.includes(searchTerm) ||
        patient.telefono?.includes(searchTerm)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients([]);
    }
  }, [searchTerm, patients]);

  // Encontrar el paciente seleccionado cuando cambia selectedPatientId
  useEffect(() => {
    if (selectedPatientId) {
      const patient = patients.find(p => p.id === parseInt(selectedPatientId));
      if (patient) {
        setSelectedPatient(patient);
        setSearchTerm(`${patient.nombre} ${patient.apellido}`);
      }
    } else {
      setSelectedPatient(null);
      setSearchTerm('');
    }
  }, [selectedPatientId, patients]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);
    
    // Si se borra el campo, resetear selección
    if (value === '') {
      setSelectedPatient(null);
      onPatientSelect('');
    }
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSearchTerm(`${patient.nombre} ${patient.apellido}`);
    setIsOpen(false);
    onPatientSelect(patient.id);
  };

  const handleInputFocus = () => {
    if (searchTerm.length > 0) {
      setIsOpen(true);
    }
  };

  const clearSelection = () => {
    setSelectedPatient(null);
    setSearchTerm('');
    setIsOpen(false);
    onPatientSelect('');
    searchRef.current?.focus();
  };

  return (
    <div className="patient-search-container" ref={searchRef}>
      <label className="patient-search-label">Paciente *</label>
      <div className="patient-search-input-container">
        <div className="search-input-wrapper">
          {/* <FaSearch className="search-icon" /> */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="patient-search-input"
            autoComplete="off"
          />
          {selectedPatient && (
            <button
              type="button"
              onClick={clearSelection}
              className="clear-selection-btn"
            >
              ×
            </button>
          )}
        </div>

        {isOpen && filteredPatients.length > 0 && (
          <div className="patient-dropdown" ref={dropdownRef}>
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="patient-option"
                onClick={() => handlePatientSelect(patient)}
              >
                <div className="patient-avatar">
                  <FaUser />
                </div>
                <div className="patient-info">
                  <div className="patient-name">
                    {patient.nombre} {patient.apellido}
                  </div>
                  <div className="patient-details">
                    {patient.cedula && <span>CI: {patient.cedula}</span>}
                    {patient.telefono && <span> • Tel: {patient.telefono}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isOpen && searchTerm.length > 0 && filteredPatients.length === 0 && (
          <div className="patient-dropdown">
            <div className="no-results">
              No se encontraron pacientes
            </div>
          </div>
        )}
      </div>

      {selectedPatient && (
        <div className="selected-patient-info">
          <FaUser className="selected-icon" />
          <span>
            {selectedPatient.nombre} {selectedPatient.apellido}
            {selectedPatient.cedula && ` • CI: ${selectedPatient.cedula}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default PatientSearch;
