import React, { useEffect, useState } from 'react';
import CardPaciente from '../../components/cardPaciente/CardPaciente';
import SearchBar from '../../components/searchBar/SearchBar';
import './Patient.css';
import PacienteHeader from '../../components/pacienteHeader/PacienteHeader';
import Pagination from '../../components/pagination/Pagination';
import { getPatientWithPagination, getAllPatients } from '../../api/Api';
import TopInfoHome from '../../components/topInfoHome/TopInfoHome';
import PacienteCard from '../../components/pacientescard/PacienteCard';
import { motion, AnimatePresence } from 'framer-motion';

const Patient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const response = await getAllPatients();
        console.log('Response completo:', response);
        console.log('Response.data:', response.data);
        console.log('Tipo de response.data:', typeof response.data);
        console.log('Es array response.data:', Array.isArray(response.data));
        
        const allPatients = Array.isArray(response.data) ? response.data : []; // Asegurar que sea un array
        console.log('AllPatients procesado:', allPatients);
        
        setPatients(allPatients);
        setFilteredPatients(allPatients);
        setTotalPatients(allPatients.length);
      } catch (error) {
        console.error('Error fetching patients:', error);
        // En caso de error, establecer arrays vacíos
        setPatients([]);
        setFilteredPatients([]);
        setTotalPatients(0);
      }
    };

    fetchAllPatients();
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    // Asegurar que patients sea un array antes de filtrar
    if (!Array.isArray(patients)) {
      console.warn('Patients is not an array:', patients);
      return;
    }
    
    const filtered = patients.filter(patient => 
      patient.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.apellido.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.ciPaciente.toString().includes(searchValue)
    );
    setFilteredPatients(filtered);
    setCurrentPage(1);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    window.scrollTo(0, 0);
    // Asegurar que filteredPatients sea un array
    if (!Array.isArray(filteredPatients)) {
      return [];
    }
    return filteredPatients.slice(startIndex, endIndex);
  };

  return (
  <>
    <SearchBar onSearch={handleSearch} />
    {!searchTerm && (
      <>
        <h3>Pacientes Recientes</h3>
        <motion.div className='pat-card-cont'
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
        >
          <PacienteCard />
          <PacienteCard />
          <PacienteCard />
          <PacienteCard />
          <PacienteCard />
          <PacienteCard />
        </motion.div>
      </>
    )}

    {searchTerm && (
      <>
        <PacienteHeader />
        <motion.div  className="card-paciente-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {getCurrentPageData().map((paciente) => (
              <motion.div
                key={paciente.ciPaciente}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="card-item" // Agregar clase para el item individual
              >
                <CardPaciente
                  ci={paciente.ciPaciente}
                  imagen={paciente.imagen}
                  nombre={`${paciente.nombre} ${paciente.apellido}`}
                  direccion={paciente.direccion}
                  fechaNacimiento={paciente.fechaNacimiento}
                  numeroTelefonico={paciente.phonesNumbers && paciente.phonesNumbers.length > 0 ? paciente.phonesNumbers[0].numero : 'N/A'}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <Pagination
          totalItems={filteredPatients.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </>
    )}
  </>
);
};

export default Patient;