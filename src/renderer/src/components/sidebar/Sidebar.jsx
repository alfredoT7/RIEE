import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'
import { FaHome, FaUsers, FaBookMedical, FaCalendarAlt, FaToolbox, FaMoneyCheckAlt, FaUserMd } from "react-icons/fa";
import { useSidebar } from '../../context/SidebarContext';

const Sidebar = () => {
    const [selected, setSelected] = useState('Inicio');
    const { isCollapsed } = useSidebar();
    const navigate = useNavigate();

    const handleSelection = (section) => {
        setSelected(section);
        if (section === 'Inicio') {
            navigate('/');
        }
        if (section === 'Pacientes') {
            navigate('/patient');
        }
        if(section === 'Tratamiento'){
            navigate('/treatment');
        }
        if(section === 'Citas'){
            navigate('/appointments');
        }
    };

    const menuItems = useMemo(() => [
        { key: 'Inicio', icon: FaHome, label: 'Inicio' },
        { key: 'Pacientes', icon: FaUsers, label: 'Pacientes' },
        { key: 'Tratamiento', icon: FaBookMedical, label: 'Tratamientos' },
        { key: 'Citas', icon: FaCalendarAlt, label: 'Citas' },
        { key: 'Inventario', icon: FaToolbox, label: 'Inventario' },
        { key: 'Cuentas', icon: FaMoneyCheckAlt, label: 'Cuentas' },
        { key: 'Perfil', icon: FaUserMd, label: 'Perfil' },
    ], []);
          
    return (
        <nav className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-menu">
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <div 
                            key={item.key}
                            className={`menu-item ${selected === item.key ? 'active' : ''}`} 
                            onClick={() => handleSelection(item.key)}
                            title={isCollapsed ? item.label : ''}
                        >
                            <IconComponent className="menu-icon" />
                            {!isCollapsed && (
                                <h4 className={selected === item.key ? 'active-text' : ''}>
                                    {item.label}
                                </h4>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}

export default Sidebar;