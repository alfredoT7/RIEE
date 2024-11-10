import React from 'react'
import './SearchBar.css'
import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
  return (
    <div className='sb-main-cont'>
        <input type='text' placeholder='Busca un paciente por nombre o CI'/>
        <FaSearch className='icon-search'/>
    </div>
  )
}

export default SearchBar