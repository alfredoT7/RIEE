import React, {useState} from 'react'
import './CardPaciente.css'
import ImagesApp from '../../assets/ImagesApp'

const CardPaciente = ({ci, imagen, nombre, direccion, fechaNacimiento, numeroTelefonico}) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const handleImageClick = () => {
    setIsImageExpanded(true);
  }
  const handleCloseModal = () => {
    setIsImageExpanded(false);
  }

  return (
    <div className="chard-paciente-main-cont">
      <div className="ci">
        <p>{ci}</p>
      </div>
      <img
        src={imagen?.startsWith('http') ? imagen : ImagesApp.defaultImage}
        onError={(e) => {
          e.target.onerror = null;
        }}
        alt={nombre || 'Imagen no disponible'}
        onClick={handleImageClick} 
      />
      <p className="name">{nombre}</p>
      <p className="treatment">{direccion}</p>
      <p className="date">{fechaNacimiento}</p>
      <p className='phone'>{numeroTelefonico}</p>
      {isImageExpanded && (
        <div className="image-modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <img
              src={imagen?.startsWith('http') ? imagen : ImagesApp.defaultImage}
              alt={nombre || 'Imagen no disponible'}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CardPaciente;