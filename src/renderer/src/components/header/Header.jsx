import React from 'react'
import './Header.css'
import { FaUser, FaSlidersH, FaBars } from "react-icons/fa";
import { useSidebar } from '../../context/SidebarContext';

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="header-container">
        <div className="header-left">
            <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                <FaBars />
            </button>
            <div className="breadcrumb">
                <h5>pages / Inicio</h5>
                <h4>Inicio</h4>
            </div>
        </div>
        <div className="header-right">
            <h5>Dra. Luzgarda</h5>
            <FaSlidersH/>
        </div>
    </header>
  );
}

export default Header