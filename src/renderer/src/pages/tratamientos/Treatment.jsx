import React, { useState, useMemo } from 'react'
import { FaPlus, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Treatment.css'

const Treatment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const treatments = [
    {
      id: 1,
      nombreTratamiento: 'Consulta de ortodoncia',
      descripcion: 'Evaluación inicial y diagnóstico para tratamientos de ortodoncia',
      procedimiento: 'Examen clínico, radiografías, análisis de modelos y plan de tratamiento',
      semanasEstimadas: 2,
      costoBaseTratamiento: 150,
      notasAdicionales: 'Incluye material de diagnóstico'
    },
    {
      id: 2,
      nombreTratamiento: 'Limpieza dental profesional',
      descripcion: 'Profilaxis dental completa con eliminación de placa y sarro',
      procedimiento: 'Raspado, alisado radicular, pulido dental y aplicación de flúor',
      semanasEstimadas: 1,
      costoBaseTratamiento: 200,
      notasAdicionales: 'Se recomienda cada 6 meses'
    },
    {
      id: 3,
      nombreTratamiento: 'Extracción simple',
      descripcion: 'Extracción de piezas dentales no complicadas',
      procedimiento: 'Anestesia local, luxación, extracción y sutura si es necesario',
      semanasEstimadas: 1,
      costoBaseTratamiento: 250,
      notasAdicionales: 'Cuidados post-operatorios incluidos'
    },
    {
      id: 4,
      nombreTratamiento: 'Implante dental',
      descripcion: 'Colocación de implante de titanio para reemplazar pieza dental',
      procedimiento: 'Cirugía de colocación, período de oseointegración y colocación de corona',
      semanasEstimadas: 16,
      costoBaseTratamiento: 3000,
      notasAdicionales: 'Incluye corona provisional'
    },
    {
      id: 5,
      nombreTratamiento: 'Blanqueamiento dental',
      descripcion: 'Aclaramiento del color dental mediante geles blanqueadores',
      procedimiento: 'Protección de encías, aplicación de gel blanqueador y activación',
      semanasEstimadas: 3,
      costoBaseTratamiento: 500,
      notasAdicionales: 'Evitar alimentos pigmentantes'
    },
    {
      id: 6,
      nombreTratamiento: 'Tratamiento de conducto',
      descripcion: 'Endodoncia para tratar infecciones del nervio dental',
      procedimiento: 'Apertura, limpieza de conductos, medicación y obturación',
      semanasEstimadas: 4,
      costoBaseTratamiento: 800,
      notasAdicionales: 'Requiere corona posterior'
    },
    {
      id: 7,
      nombreTratamiento: 'Corona dental',
      descripcion: 'Prótesis fija para restaurar forma y función dental',
      procedimiento: 'Preparación del diente, toma de impresión, fabricación y cementado',
      semanasEstimadas: 3,
      costoBaseTratamiento: 1200,
      notasAdicionales: 'Material cerámico de alta calidad'
    },
    {
      id: 8,
      nombreTratamiento: 'Obturación dental',
      descripcion: 'Restauración de caries con material de resina',
      procedimiento: 'Remoción de caries, preparación de cavidad y obturación',
      semanasEstimadas: 1,
      costoBaseTratamiento: 180,
      notasAdicionales: 'Color personalizado al diente'
    }
  ];
  const filteredTreatments = useMemo(() => {
    return treatments.filter(treatment =>
      treatment.nombreTratamiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.procedimiento.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, treatments]);
  const totalPages = Math.ceil(filteredTreatments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTreatments = filteredTreatments.slice(startIndex, endIndex);
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
              <th>TRATAMIENTO</th>
              <th>DESCRIPCIÓN</th>
              <th>SEMANAS ESTIMADAS</th>
              <th>COSTO BASE (Bs.)</th>
              <th>NOTAS</th>
            </tr>
          </thead>
          <tbody>
            {currentTreatments.length > 0 ? (
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
                      {treatment.descripcion}
                    </div>
                  </td>
                  <td className='weeks-cell'>
                    <span className='weeks-badge'>
                      {treatment.semanasEstimadas} {treatment.semanasEstimadas === 1 ? 'semana' : 'semanas'}
                    </span>
                  </td>
                  <td className='price-cell'>
                    <span className='price-amount'>Bs. {treatment.costoBaseTratamiento.toLocaleString()}</span>
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
      <FeaturedTreatments />

    </main>
  )
};

export default Treatment