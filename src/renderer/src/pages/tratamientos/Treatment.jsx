import React from 'react'
import { FaKitMedical,FaPersonCirclePlus,FaBookMedical } from 'react-icons/fa6';
import CardTreatment from '../../components/cardTreatment/CardTreatment';
import './Treatment.css'
import CardPaciente from '../../components/cardPaciente/CardPaciente';
import { FaPlus } from 'react-icons/fa';
const Treatment = () => {
  return (
    <main className='main-cont-treatment'>
      <div className='treatment-header'>
        <div className='treatment-header-left'>
          <h4>Tratamientos</h4>
          <p>Gestione los tratamientos y procedimientos dentales</p>
        </div>
        <button className='base-button'>
          <p>Nuevo tratamiento</p>
          <FaPlus className='button-icon'/>
        </button>
      </div>
      
    </main>
  )
};

export default Treatment