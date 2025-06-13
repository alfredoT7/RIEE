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
        const allPatients = response.data.pacientes;
        setPatients(allPatients);
        setFilteredPatients(allPatients);
        setTotalPatients(allPatients.length);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchAllPatients();
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
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
              >
                <CardPaciente
                  ci={paciente.ciPaciente}
                  imagen={paciente.imagen}
                  nombre={`${paciente.nombre} ${paciente.apellido}`}
                  direccion={paciente.direccion}
                  fechaNacimiento={paciente.fechaNacimiento}
                  numeroTelefonico={paciente.numeroTelefono}
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