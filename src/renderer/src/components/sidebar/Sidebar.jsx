import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css'
import { FaHome, FaUsers, FaBookMedical, FaCalendarAlt, FaToolbox, FaMoneyCheckAlt, FaUserMd } from "react-icons/fa";
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const [selected, setSelected] = useState('Inicio');
    const { isCollapsed, updateCurrentPage } = useSidebar();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const doctorFirstName = user?.nombres?.trim()?.split(' ')[0] || user?.username || 'Doctora';
    const doctorName = `Dra. ${doctorFirstName}`;

    const routeToPageName = useMemo(() => ({
        '/': 'Inicio',
        '/patient': 'Pacientes',
        '/new-patient': 'Nuevo Paciente',
        '/treatment': 'Tratamiento',
        '/new-treatment': 'Nuevo Tratamiento',
        '/appointments': 'Citas',
        '/nueva-cita': 'Nueva Cita',
        '/inventario': 'Inventario',
        '/inventario/nuevo-producto': 'Nuevo Producto',
        '/cuentas': 'Cuentas',
        '/perfil': 'Perfil'
    }), []);

    useEffect(() => {
        const currentPageName = routeToPageName[location.pathname] || 'Inicio';
        setSelected(currentPageName);
        updateCurrentPage(currentPageName);
    }, [location.pathname, routeToPageName, updateCurrentPage]);

    const handleSelection = (section) => {
        setSelected(section);
        updateCurrentPage(section);
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
        if(section === 'Inventario'){
            navigate('/inventario');
        }
        if(section === 'Cuentas'){
            navigate('/cuentas');
        }
    };

    const menuItems = useMemo(() => [
        { key: 'Inicio', icon: FaHome, label: 'Inicio' },
        { key: 'Pacientes', icon: FaUsers, label: 'Pacientes' },
        { key: 'Tratamiento', icon: FaBookMedical, label: 'Tratamiento' },
        { key: 'Citas', icon: FaCalendarAlt, label: 'Citas' },
        { key: 'Inventario', icon: FaToolbox, label: 'Inventario' },
        { key: 'Cuentas', icon: FaMoneyCheckAlt, label: 'Cuentas' },
        { key: 'Perfil', icon: FaUserMd, label: 'Perfil' },
    ], []);
          
    return (
        <nav className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-profile" title={isCollapsed ? doctorName : ''}>
                {user?.imagenUrl ? (
                    <img className="sidebar-profile-image" src={user.imagenUrl} alt={doctorName} />
                ) : (
                    <div className="sidebar-profile-fallback">
                        <FaUserMd />
                    </div>
                )}
                {!isCollapsed && <h4 className="sidebar-profile-name">{doctorName}</h4>}
            </div>
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
