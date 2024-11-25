import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'
import ImagesApp from '../../assets/ImagesApp'
import { FaHome, FaUsers, FaBookMedical, FaCalendarAlt, FaToolbox, FaMoneyCheckAlt, FaUserMd } from "react-icons/fa";

const Sidebar = () => {
    const [selected, setSelected] = useState('Inicio');
    const navigate = useNavigate();

    const handleSelection = (section) => {
        setSelected(section);
        if (section === 'Inicio') {
            navigate('/');
        }
        if (section === 'Pacientes') {
            navigate('/patient');
        }
    };          
    return (
        <nav className='sidebar-container'>
            <img src={ImagesApp.sidebarImg} alt="" />
            <div>
                <div className={selected === 'Inicio' ? 'active' : ''} onClick={() => handleSelection('Inicio')}>
                    <FaHome className="icon" />
                    <h4 className={selected === 'Inicio' ? 'active-text' : ''}>Inicio</h4>
                </div>
                <div className={selected === 'Pacientes' ? 'active' : ''} onClick={() => handleSelection('Pacientes')}>
                    <FaUsers className="icon" />
                    <h4 className={selected === 'Pacientes' ? 'active-text' : ''}>Pacientes</h4>
                </div>
                <div className={selected === 'Historial' ? 'active' : ''} onClick={() => handleSelection('Historial')}>
                    <FaBookMedical className="icon" />
                    <h4 className={selected === 'Historial' ? 'active-text' : ''}>Historial Clínico</h4>

                </div>
                <div className={selected === 'Citas' ? 'active' : ''} onClick={() => handleSelection('Citas')}>
                    <FaCalendarAlt className="icon" />
                    <h4 className={selected === 'Citas' ? 'active-text' : ''}>Citas</h4>
                </div>
                <div className={selected === 'Inventario' ? 'active' : ''} onClick={() => handleSelection('Inventario')}>
                    <FaToolbox className="icon" />
                    <h4 className={selected === 'Inventario' ? 'active-text' : ''}>Inventario</h4>
                </div>
                <div className={selected === 'Cuentas' ? 'active' : ''} onClick={() => handleSelection('Cuentas')}>
                    <FaMoneyCheckAlt className="icon" />
                    <h4 className={selected === 'Cuentas' ? 'active-text' : ''}>Cuentas</h4>

                </div>
                <div className={selected === 'Perfil' ? 'active' : ''} onClick={() => handleSelection('Perfil')}>
                    <FaUserMd className="icon" />
                    <h4 className={selected === 'Perfil' ? 'active-text' : ''}>Perfil</h4>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;