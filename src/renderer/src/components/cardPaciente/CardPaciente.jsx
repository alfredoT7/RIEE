import React from 'react'
import './CardPaciente.css'
import ephey from '../../assets/ephey.jpg'

const CardPaciente = ({ci,nombre,tratamiento,fecha}) => {
  return (
    <div className="chard-paciente-main-cont">
        <div className="ci"><p>{ci}</p>
        </div>
        <img src={ephey} alt="" />
        <p className="name">{nombre}</p>
        <p className="treatment">{tratamiento}</p>
        <p className="date">{fecha}</p>
    </div>
  )
}

export default CardPaciente