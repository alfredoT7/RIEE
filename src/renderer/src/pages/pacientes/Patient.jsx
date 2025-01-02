import React, { useEffect, useState } from 'react'
import CardPaciente from '../../components/cardPaciente/CardPaciente'
import SearchBar from '../../components/searchBar/SearchBar'
import './Patient.css'
import PacienteHeader from '../../components/pacienteHeader/PacienteHeader'
import Pagination from '../../components/pagination/Pagination'

const Patient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  
  // Example data - replace this with your actual data
  const pacientes = Array(45).fill({
    ci: "12345600",
    nombre: "Juan Perez",
    direccion: "Ortodoncia",
    fechaNacimiento: "12/12/2021",
    numeroTelefonico: '76424923'
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPacientes = pacientes.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
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
        {currentPacientes.map((paciente, index) => (
          <CardPaciente
            key={index}
            ci={paciente.ci}
            nombre={paciente.nombre}
            direccion={paciente.direccion}
            fechaNacimiento={paciente.fechaNacimiento}
            numeroTelefonico={paciente.numeroTelefonico}
          />
        ))}
      </div>
      <Pagination
        totalItems={pacientes.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Patient;