import React from 'react'
import './CardPaciente.css'
import ephey from '../../assets/ephey.jpg'

const CardPaciente = ({ci,nombre,direccion,fechaNacimiento,numeroTelefonico,}) => {
  return (
    <div className="chard-paciente-main-cont">
        <div className="ci">
          <p>{ci}</p>
        </div>
        <img src={ephey} alt="" />
        <p className="name">{nombre}</p>
        <p className="treatment">{direccion}</p>
        <p className="date">{fechaNacimiento}</p>
        <p className='phone'>{numeroTelefonico}</p>
    </div>
  )
}

export default CardPaciente