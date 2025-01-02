import React, { useEffect } from 'react'
import CardPaciente from '../../components/cardPaciente/CardPaciente'
import SearchBar from '../../components/searchBar/SearchBar'
import './Patient.css'
import PacienteHeader from '../../components/pacienteHeader/PacienteHeader'
const Patient = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
    <SearchBar />
    <PacienteHeader />
    <div className="card-paciente-container">
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="asdasdashg"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="1231"     nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="1231"     nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="1231"     nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico='76424923'/>
        </div>
    </>
  )
}

export default Patient