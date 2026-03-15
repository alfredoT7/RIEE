import React from 'react'
import { FaPlus, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTreatment } from './useTreatment';

const Treatment = () => {
  const navigate = useNavigate();
  
  const {
    loading,
    error,
    searchTerm,
    currentPage,
    currentTreatments,
    totalPages,
    startIndex,
    endIndex,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleSearchChange,
    refreshTreatments,
    stats
  } = useTreatment();

  const FeaturedTreatments = () => {
    const featuredData = [
      {
        id: 1,
        name: 'Ortodoncia Brackets',
        description: 'Tratamiento de ortodoncia con brackets metálicos para corregir la alineación dental.',
        category: 'Ortodoncia',
        price: 'Bs. 3500',
        duration: '18 meses',
        popularity: 95
      },
      {
        id: 2,
        name: 'Implante Dental',
        description: 'Colocación de implante de titanio para reemplazar piezas dentales perdidas.',
        category: 'Implante',
        price: 'Bs. 3000',
        duration: '3-6 meses',
        popularity: 85
      },
      {
        id: 3,
        name: 'Blanqueamiento LED',
        description: 'Sistema avanzado de blanqueamiento dental con tecnología LED para resultados óptimos.',
        category: 'Blanqueamiento',
        price: 'Bs. 800',
        duration: '2 sesiones',
        popularity: 78
      }
    ];

    return (
      <div className="featured-treatments-container">
        <div className="featured-header">
          <h2>Tratamientos Destacados</h2>
          <p>Tratamientos más solicitados en el último mes</p>
        </div>

        <div className="featured-treatments-grid">
          {featuredData.map((treatment) => (
            <div key={treatment.id} className={`featured-treatment-card ${treatment.category.toLowerCase()}`}>
              <div className="featured-card-header">
                <h3 className="featured-treatment-title">{treatment.name}</h3>
              </div>
              <p className="featured-treatment-description">
                {treatment.description}
              </p>
              
              <div className="featured-treatment-details">
                <div className="featured-detail-group">
                  <div className="featured-detail-label">Precio</div>
                  <div className="featured-detail-value featured-price">{treatment.price}</div>
                </div>
                <div className="featured-detail-group">
                  <div className="featured-detail-label">Duración</div>
                  <div className="featured-detail-value">{treatment.duration}</div>
                </div>
              </div>

              <div className="featured-popularity-section">
                <div className="featured-popularity-label">
                  <span>Popularidad</span>
                  <span className="featured-popularity-percentage">{treatment.popularity}%</span>
                </div>
                <div className="featured-progress-bar">
                  <div 
                    className="featured-progress-fill" 
                    style={{ width: `${treatment.popularity}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };




  return (
    <main className='main-cont-treatment'>
      <div className='treatment-header'>
        <div className='treatment-header-left'>
          <h4>Tratamientos</h4>
          <p>Gestione los tratamientos y procedimientos dentales</p>
        </div>
        <button 
          className='base-button'
          onClick={() => navigate('/new-treatment')}
        >
          <p>Nuevo tratamiento</p>
          <FaPlus className='button-icon'/>
        </button>
      </div>
      <div className='search-container'>
        <div className='search-input-wrapper'>
          <FaSearch className='search-icon' />
          <input
            type='text'
            placeholder='Buscar por nombre, descripción o procedimiento...'
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className='search-input'
          />
        </div>
        <div className='search-results-info'>
          {searchTerm && (
            <span>
              {stats.filtered} resultado{stats.filtered !== 1 ? 's' : ''} encontrado{stats.filtered !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
      
      <div className='treatment-table-container'>
        <table className='treatment-table'>
          <thead>
            <tr>
              <th>TRATAMIENTO</th>
              <th>DESCRIPCIÓN</th>
              <th>SEMANAS ESTIMADAS</th>
              <th>COSTO BASE (Bs.)</th>
              <th>NOTAS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className='loading-cell'>
                  <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <span>Cargando tratamientos...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className='error-cell'>
                  <div className="error-content">
                    <span>❌ {error}</span>
                    <button 
                      className="retry-btn"
                      onClick={refreshTreatments}
                    >
                      Reintentar
                    </button>
                  </div>
                </td>
              </tr>
            ) : currentTreatments.length > 0 ? (
              currentTreatments.map((treatment, index) => (
                <tr key={treatment.id || index}>
                  <td className='treatment-cell'>
                    <span className='treatment-icon'>🦷</span>
                    <div className='treatment-info'>
                      <div className='treatment-name'>{treatment.nombreTratamiento}</div>
                    </div>
                  </td>
                  <td className='description-cell'>
                    <div className='description-text'>
                      {treatment.descripcion || 'Sin descripción'}
                    </div>
                  </td>
                  <td className='weeks-cell'>
                    <span className='weeks-badge'>
                      {treatment.semanasEstimadas} {treatment.semanasEstimadas === 1 ? 'semana' : 'semanas'}
                    </span>
                  </td>
                  <td className='price-cell'>
                    <span className='price-amount'>Bs. {treatment.costoBaseTratamiento?.toLocaleString()}</span>
                  </td>
                  <td className='notes-cell'>
                    <div className='notes-text'>
                      {treatment.notasAdicionales || 'Sin notas adicionales'}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='no-results'>
                  {searchTerm 
                    ? 'No se encontraron tratamientos que coincidan con tu búsqueda'
                    : 'No hay tratamientos registrados'
                  }
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!loading && !error && stats.showPagination && (
        <div className='pagination-container'>
          <div className='pagination-info'>
            Mostrando {startIndex + 1}-{Math.min(endIndex, stats.filtered)} de {stats.filtered} tratamientos
          </div>
          <div className='pagination-controls'>
            <button 
              onClick={handlePreviousPage}
              disabled={!stats.hasPreviousPage}
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
              disabled={!stats.hasNextPage}
              className='pagination-btn'
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
      <FeaturedTreatments />

    </main>
  )
};

export default Treatment
