import React from 'react'
import { FaKitMedical,FaPersonCirclePlus,FaBookMedical } from 'react-icons/fa6';
import CardTreatment from '../../components/cardTreatment/CardTreatment';
import './Treatment.css'
import CardPaciente from '../../components/cardPaciente/CardPaciente';

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
          <h3>
            Últimos Tratamientos Realizados
          </h3>
          <CardPaciente 
            ci={'123456'}
            imagen={''}
            nombre={'Juan Perez'}
            direccion={'Calle 1'}
            fechaNacimiento={'01/01/2000'}
            numeroTelefonico={'123456'}
            />
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