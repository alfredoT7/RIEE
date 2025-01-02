import React, { useEffect, useState } from 'react';
import CardPaciente from '../../components/cardPaciente/CardPaciente';
import SearchBar from '../../components/searchBar/SearchBar';
import './Patient.css';
import PacienteHeader from '../../components/pacienteHeader/PacienteHeader';
import Pagination from '../../components/pagination/Pagination';
import { getAllPatient } from '../../api/Api';

const Patient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatient(currentPage);
        console.log('API Response:', response.data.pacientes[0]);
        setPatients(response.data.pacientes);
        setTotalPatients(response.data.totalPacientes);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <SearchBar />
      <PacienteHeader />
      <div className="card-paciente-container">
        {patients.map((paciente) => (
          <CardPaciente
            key={paciente.ciPaciente}
            ci={paciente.ciPaciente}
            imagen={paciente.imagen}
            nombre={`${paciente.nombre} ${paciente.apellido}`}
            direccion={paciente.direccion}
            fechaNacimiento={paciente.fechaNacimiento}
            numeroTelefonico={paciente.numeroTelefono}
          />
        ))}
      </div>
      <Pagination
        totalItems={totalPatients}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Patient;