  import React, { useEffect, useState } from 'react';
import CardPaciente from '../../components/cardPaciente/CardPaciente';
import SearchBar from '../../components/searchBar/SearchBar';
import './Patient.css';
import PacienteHeader from '../../components/pacienteHeader/PacienteHeader';
import Pagination from '../../components/pagination/Pagination';
import { getPatientWithPagination, getAllPatients } from '../../api/Api';
import TopInfoHome from '../../components/topInfoHome/TopInfoHome';

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
    return filteredPatients.slice(startIndex, endIndex);
  };

  return (
    <>
      <div className='chards-container'>
        <TopInfoHome title='Pacientes' quantity={totalPatients} porcentaje='123'/>
        <TopInfoHome title='Pacientes' quantity={totalPatients} porcentaje='123'/>
        <TopInfoHome title='Pacientes' quantity={totalPatients} porcentaje='123'/>
        <TopInfoHome title='Pacientes' quantity={totalPatients} porcentaje='123'/>
      </div>
      <SearchBar onSearch={handleSearch} />
      <PacienteHeader />
      <div className="card-paciente-container">
        {getCurrentPageData().map((paciente) => (
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
        totalItems={filteredPatients.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Patient;