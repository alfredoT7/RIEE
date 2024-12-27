import React from 'react'
import CardPaciente from '../../components/cardPaciente/CardPaciente'
import SearchBar from '../../components/searchBar/SearchBar'
import './Patient.css'
const Patient = () => {
  return (
    <>
    <SearchBar />
    <div className="head-paciente-title1">
          <div className="ci"><p>CI</p></div>
          <div className="name"><p>Nombre</p></div>
          <div className="treatment"><p>Ultimo Tratamiento</p></div>
          <div className="date"><p>Fecha ultima atención</p></div>
    </div>
    <div className="card-paciente-container">
          <CardPaciente ci="12345600" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="1231" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="1231" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="1231" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" tratamiento="Ortodoncia" fecha="12/12/2021" />
        </div>
    </>
  )
}

export default Patient