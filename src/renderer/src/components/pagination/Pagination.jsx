import React from 'react';
import './Pagination.css';
const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div className="pagination-container">
        <button 
            className="pagination-button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
        >
            Anterior
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
            <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
            {index + 1}
            </button>
        ))}
        
        <button
            className="pagination-button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            Siguiente
        </button>
    </div>
  );
};
export default Pagination;