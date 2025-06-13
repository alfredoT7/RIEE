import React from 'react'
import './PacienteCard.css';
import ImagesApp from '../../assets/ImagesApp'
import { SquarePen, Trash, Phone, Mail, MapPin, FileText } from 'lucide-react';

const PacienteCard = () => {
  return (
    <div className='card-pat'>
      <div className='top'>
        <div className='left'>
          <div>
            <img src={ImagesApp.defaultImage} alt="" />
          </div>
        </div>
        <div className='mid'>
          <h5 >Alfredo Torrico</h5>
          <p>32 años - CI: 12312312</p>
        </div>
        <div className='rigth'>
          <div title='Editar paciente'>
            <SquarePen className='ic'/>
          </div>
          <div title='Eliminar paciente'>
            <Trash className='ic'/>
          </div>
        
        </div>
      </div>
      <div className='mid2'>
        <div>
          <Phone className='ic2' title='Llamar' />
          <p>+591 76424923</p>
        </div>
        <div>
          <Mail className='ic2' title='Enviar correo' />
          <p>alfredo@gmail.com</p>
        </div>
        <div>
          <MapPin className='ic2' title='Ver ubicación' />
          <p>La Paz, Bolivia</p>
        </div>
      </div>
      <div className='bot1'>
        <div className='left1'>
          <p className='p1'>Última visita</p>
          <p className='p2'>12/12/2024</p>
          <button>
            <FileText className='ic2' title='Ver historial médico' />
            Historia
          </button>
        </div>
        <div className='rigth1'>
          <p className='p1'>Próxima cita</p>
          <p className='p2'>15/12/2024</p>
          <button>
            Agendar
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default PacienteCard