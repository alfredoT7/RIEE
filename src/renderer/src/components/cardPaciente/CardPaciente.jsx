import React from 'react'
import './CardPaciente.css'
import ImagesApp from '../../assets/ImagesApp'

const CardPaciente = ({ci, imagen, nombre, direccion, fechaNacimiento, numeroTelefonico}) => {
  return (
    <div className="chard-paciente-main-cont">
        <div className="ci">
          <p>{ci}</p>
        </div>
        <img 
          src={imagen?.startsWith('http') ? imagen : ImagesApp.defaultImage}
          onError={(e) => {
            e.target.onerror = null;
            //e.target.src = ImagesApp.defaultImage;
          }}
          alt={nombre || 'Imagen no disponible'} 
        />
        <p className="name">{nombre}</p>
        <p className="treatment">{direccion}</p>
        <p className="date">{fechaNacimiento}</p>
        <p className='phone'>{numeroTelefonico}</p>
    </div>
  )
}

export default CardPaciente