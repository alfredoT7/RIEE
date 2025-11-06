import React, { useState, useEffect, useRef } from 'react'
import './Header.css'
import { FaUser, FaSlidersH, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ThemeToggle from '../themeToggle/ThemeToggle';

const Header = () => {
  const { toggleSidebar, currentPage } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada exitosamente');
    navigate('/login');
  };

  return (
    <header className="header-container">
        <div className="header-left">
            <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                <FaBars />
            </button>
            <div className="breadcrumb">
                <h5>RIEE / {currentPage}</h5>
                <h4>{currentPage}</h4>
            </div>
        </div>
        <div className="header-right">
            <ThemeToggle />
            <h5>{user?.name || 'Dra. Luzgarda'}</h5>
            <div className="user-menu-container" ref={menuRef}>
              <button 
                className="user-menu-btn" 
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaSlidersH/>
              </button>
              {showMenu && (
                <div className="user-dropdown-menu">
                  <button className="dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
        </div>
    </header>
  );
}

export default Header