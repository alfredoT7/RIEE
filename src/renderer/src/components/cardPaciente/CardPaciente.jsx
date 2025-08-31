import React, {useState, useEffect} from 'react'
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

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsImageExpanded(false);
      }
    };

    if (isImageExpanded) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll en el body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isImageExpanded]);

  // Prevenir que el click en la imagen cierre el modal
  const handleImageModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="chard-paciente-main-cont">
      <div className="ci" title='Carnet de Identidad'>
        <p>{ci}</p>
      </div>
      <img
        title='Imagen del Paciente'
        src={imagen?.startsWith('http') ? imagen : ImagesApp.defaultImage}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = ImagesApp.defaultImage;
        }}
        alt={nombre || 'Imagen no disponible'}
        onClick={handleImageClick} 
      />
      <p className="name">{nombre}</p>
      <p className="treatment" title='Último tratamiento'>{direccion}</p>
      <p className="date" title='Fecha nacimiento'>{fechaNacimiento}</p>
      <p className='phone' title='Numero de contacto'>{numeroTelefonico}</p>
      {isImageExpanded && (
        <div 
          className="image-modal" 
          onClick={handleCloseModal}
          style={{
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div 
            className="modal-content" 
            onClick={handleImageModalClick}
            style={{
              animation: 'slideIn 0.3s ease-out'
            }}
          >
            <img
              src={imagen?.startsWith('http') ? imagen : ImagesApp.defaultImage}
              alt={nombre || 'Imagen no disponible'}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = ImagesApp.defaultImage;
              }}
              style={{
                animation: 'zoomIn 0.3s ease-out'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CardPaciente;