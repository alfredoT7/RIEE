import React, { useState, useMemo } from 'react'
import { FaPlus, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Treatment.css'

const Treatment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const treatments = [
    {
      code: 'ORTHO-01',
      name: 'Consulta de ortodoncia',
      category: 'Ortodoncia',
      duration: '30 min',
      price: 'Bs. 150',
      status: 'Activo'
    },
    {
      code: 'CLEAN-01',
      name: 'Limpieza dental profesional',
      category: 'Higiene',
      duration: '45 min',
      price: 'Bs. 200',
      status: 'Activo'
    },
    {
      code: 'EXTRACT-01',
      name: 'Extracción simple',
      category: 'Cirugía',
      duration: '40 min',
      price: 'Bs. 250',
      status: 'Activo'
    },
    {
      code: 'IMPLANT-01',
      name: 'Implante dental',
      category: 'Rehabilitación',
      duration: '90 min',
      price: 'Bs. 3000',
      status: 'Activo'
    },
    {
      code: 'WHITEN-01',
      name: 'Blanqueamiento dental',
      category: 'Estética',
      duration: '60 min',
      price: 'Bs. 500',
      status: 'Inactivo'
    },
    {
      code: 'ROOT-01',
      name: 'Tratamiento de conducto',
      category: 'Endodoncia',
      duration: '75 min',
      price: 'Bs. 800',
      status: 'Activo'
    },
    {
      code: 'CROWN-01',
      name: 'Corona dental',
      category: 'Rehabilitación',
      duration: '60 min',
      price: 'Bs. 1200',
      status: 'Activo'
    },
    {
      code: 'FILLING-01',
      name: 'Obturación dental',
      category: 'Odontología General',
      duration: '30 min',
      price: 'Bs. 180',
      status: 'Activo'
    },
    {
      code: 'XRAY-01',
      name: 'Radiografía dental',
      category: 'Diagnóstico',
      duration: '15 min',
      price: 'Bs. 50',
      status: 'Activo'
    },
    {
      code: 'BRIDGE-01',
      name: 'Puente dental',
      category: 'Rehabilitación',
      duration: '120 min',
      price: 'Bs. 2500',
      status: 'Activo'
    },
    {
      code: 'VENEER-01',
      name: 'Carillas dentales',
      category: 'Estética',
      duration: '90 min',
      price: 'Bs. 800',
      status: 'Activo'
    },
    {
      code: 'PERIO-01',
      name: 'Tratamiento periodontal',
      category: 'Periodoncia',
      duration: '60 min',
      price: 'Bs. 400',
      status: 'Activo'
    }
  ];

  // Filtrar tratamientos basado en el término de búsqueda
  const filteredTreatments = useMemo(() => {
    return treatments.filter(treatment =>
      treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, treatments]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredTreatments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTreatments = filteredTreatments.slice(startIndex, endIndex);

  // Resetear página cuando cambia la búsqueda
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <main className='main-cont-treatment'>
      <div className='treatment-header'>
        <div className='treatment-header-left'>
          <h4>Tratamientos</h4>
          <p>Gestione los tratamientos y procedimientos dentales</p>
        </div>
        <button className='base-button'>
          <p>Nuevo tratamiento</p>
          <FaPlus className='button-icon'/>
        </button>
      </div>

      {/* Buscador */}
      <div className='search-container'>
        <div className='search-input-wrapper'>
          <FaSearch className='search-icon' />
          <input
            type='text'
            placeholder='Buscar por nombre, código o categoría...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-input'
          />
        </div>
        <div className='search-results-info'>
          {searchTerm && (
            <span>{filteredTreatments.length} resultado{filteredTreatments.length !== 1 ? 's' : ''} encontrado{filteredTreatments.length !== 1 ? 's' : ''}</span>
          )}
        </div>
      </div>
      
      <div className='treatment-table-container'>
        <table className='treatment-table'>
          <thead>
            <tr>
              <th>CÓDIGO</th>
              <th>TRATAMIENTO</th>
              <th>CATEGORÍA</th>
              <th>DURACIÓN</th>
              <th>PRECIO</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {currentTreatments.length > 0 ? (
              currentTreatments.map((treatment, index) => (
                <tr key={index}>
                  <td className='code-cell'>{treatment.code}</td>
                  <td className='treatment-cell'>
                    <span className='treatment-icon'>🦷</span>
                    {treatment.name}
                  </td>
                  <td>
                    <span className={`category-tag ${treatment.category.toLowerCase().replace(/[íáéóú\s]/g, (match) => {
                      const replacements = {'í': 'i', 'á': 'a', 'é': 'e', 'ó': 'o', 'ú': 'u', ' ': '-'};
                      return replacements[match] || match;
                    })}`}>
                      {treatment.category}
                    </span>
                  </td>
                  <td>{treatment.duration}</td>
                  <td className='price-cell'>{treatment.price}</td>
                  <td>
                    <span className={`status-badge ${treatment.status.toLowerCase()}`}>
                      {treatment.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className='no-results'>
                  No se encontraron tratamientos que coincidan con tu búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredTreatments.length > itemsPerPage && (
        <div className='pagination-container'>
          <div className='pagination-info'>
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredTreatments.length)} de {filteredTreatments.length} tratamientos
          </div>
          <div className='pagination-controls'>
            <button 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className='pagination-btn'
            >
              <FaChevronLeft />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className='pagination-btn'
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </main>
  )
};

export default Treatment