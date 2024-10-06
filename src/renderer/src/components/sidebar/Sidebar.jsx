import React, { useState } from 'react';
import './Sidebar.css'
import ImagesApp from '../../assets/ImagesApp'
import { FaHome,FaUsers, FaBookMedical,FaCalendarAlt,FaToolbox,FaMoneyCheckAlt,FaUserMd,FaRegUserCircle } from "react-icons/fa";

const Sidebar = () => {
    const [selected, setSelected] = useState('Inicio');  

    const handleSelection = (section) => {
        setSelected(section);
  };
  return (
    <nav className='sidebar-container'>
      <img src={ImagesApp.sidebarImg} alt="" />
      
      <div className={selected === 'Inicio' ? 'active' : ''} onClick={() => handleSelection('Inicio')}>
        <FaHome />
        <h4>Inicio</h4>
      </div>

      <div className={selected === 'Pacientes' ? 'active' : ''} onClick={() => handleSelection('Pacientes')}>
        <FaUsers />
        <h4>Pacientes</h4>
      </div>

      <div className={selected === 'Historial' ? 'active' : ''} onClick={() => handleSelection('Historial')}>
        <FaBookMedical />
        <h4>Historial Clinico</h4>
      </div>

      <div className={selected === 'Citas' ? 'active' : ''} onClick={() => handleSelection('Citas')}>
        <FaCalendarAlt />
        <h4>Citas</h4>
      </div>

      <div className={selected === 'Inventario' ? 'active' : ''} onClick={() => handleSelection('Inventario')}>
        <FaToolbox />
        <h4>Inventario</h4>
      </div>

      <div className={selected === 'Cuentas' ? 'active' : ''} onClick={() => handleSelection('Cuentas')}>
        <FaMoneyCheckAlt />
        <h4>Cuentas</h4>
      </div>

      <div className={selected === 'Perfil' ? 'active' : ''} onClick={() => handleSelection('Perfil')}>
        <FaUserMd />
        <h4>Perfil</h4>
      </div>

      <div className={selected === 'Login' ? 'active' : ''} onClick={() => handleSelection('Login')}>
        <FaRegUserCircle />
        <h4>Iniciar Sesión</h4>
      </div>
    </nav>
    
  )
}

export default Sidebar