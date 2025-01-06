import React from 'react'
import { FaKitMedical,FaPersonCirclePlus,FaBookMedical } from 'react-icons/fa6';
import CardTreatment from '../../components/cardTreatment/CardTreatment';
import './Treatment.css'

const Treatment = () => {
  return (
    <main className='main-cont-treatment'>
      <div className='top'>
        <CardTreatment 
          title={'Gestionar Informacion Tratamientos'}
          icon={<FaKitMedical />}
          description={'Edita la informacion de los trataminetos'}
        />
        <CardTreatment 
          title={'Iniciar tratamiento a un paciente'}
          icon={<FaPersonCirclePlus />}
          description={'Inicio de forma personalizada un tratamiento a un paciente'}
        />
        <CardTreatment 
          title={'Ver el historial de tratamientos'}
          icon={<FaBookMedical />}
          description={'Ve el historial de tus pacientes'}
        />
      </div>
      <div className='bot'>
        <div className='left'>

        </div>
        <div className='right'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </main>
  )
};

export default Treatment