import React from 'react'
import './Header.css'
import { FaUser, FaSlidersH } from "react-icons/fa";
const Header = () => {
  return (
    <header className="header-container">
        <div>
            <h5>pages / Inicio</h5>
            <h4>Inicio</h4>
        </div>
        <div>
            <h5>Dra. Luzgarda</h5>
            <FaSlidersH/>
        </div>

    </header>
  );
}

export default Header