import React from 'react'
import './PacienteHeader.css'
const PacienteHeader = () => {
  return (
    <div className="head-paciente-title1">
          <div className="ci"><p>CI</p></div>
          <div className="name"><p>Nombre</p></div>
          <div className="treatment"><p>Dirección</p></div>
          <div className="date"><p>Fecha Nac.</p></div>
          <div className='numero-telefono'><p>Numero Telf.</p></div>
    </div>
  )
}

export default PacienteHeader