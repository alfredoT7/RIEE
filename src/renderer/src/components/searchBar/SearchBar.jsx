import React from 'react'
import './SearchBar.css'
import { FaSearch, FaPlus } from 'react-icons/fa'

const SearchBar = () => {
  return (
    <div className='sb-main-cont'>
        <input type='text' placeholder='Busca un paciente por nombre o CI'/>
        <FaSearch className='icon-search'/>
        <button>
          <p>Agrega nuevo paciente</p>
          <FaPlus className='icon-plus'/>
        </button>
    </div>
  )
}

export default SearchBar