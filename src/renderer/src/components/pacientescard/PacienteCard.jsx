import React from 'react'
import './PacienteCard.css';
import ImagesApp from '../../assets/ImagesApp'
import { SquarePen, Trash } from 'lucide-react';

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
          
          <h5>Alfredo Torrico</h5>
          <h5>32 años - CI: 12312312</h5>
        </div>
        <div className='rigth'>
          <SquarePen className='ic' title='Editar paciente' />
          <Trash className='ic' title='Eliminar paciente' />
        </div>
      </div>
      <div className='mid'>
        <p>+591 76424923</p>
        <p>alfredo@gmail.com</p>
        <p>La Paz, Bolivia</p>
      </div>
      <div className='bot'>
        2 mas
        <button>
          Ver mas
        </button>
      </div>
      
    </div>
  )
}

export default PacienteCard