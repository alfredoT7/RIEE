import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'
import { FaSearch, FaPlus } from 'react-icons/fa'

const SearchBar = () => {
  const navigate = useNavigate()
  const click = () => {
    navigate('/new-patient')
  }

  return (
    <div className='sb-main-cont'>
        <input type='text' placeholder='Busca un paciente por nombre o CI'/>
        <FaSearch className='icon-search'/>
        <button onClick={click}>
          <p>Agrega nuevo paciente</p>
          <FaPlus className='icon-plus'/>
        </button>
    </div>
  )
}

export default SearchBar