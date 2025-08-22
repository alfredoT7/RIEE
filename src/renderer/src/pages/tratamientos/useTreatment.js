import { useState, useEffect, useMemo } from 'react';
import { getAllTreatments } from '../../api/Api';
import { toast } from 'sonner';

export const useTreatment = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const fetchTreatments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllTreatments();
      setTreatments(response.data || []);
    } catch (err) {
      console.error('Error fetching treatments:', err);
      const errorMessage = err.response?.data?.message || 'Error al cargar los tratamientos';
      setError(errorMessage);
      
      toast.error('Error al cargar los tratamientos', {
        description: 'No se pudieron cargar los datos desde el servidor',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const filteredTreatments = useMemo(() => {
    if (!treatments || treatments.length === 0) return [];
    
    if (!searchTerm.trim()) return treatments;

    return treatments.filter(treatment =>
      treatment.nombreTratamiento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.procedimiento?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, treatments]);

  const totalPages = Math.ceil(filteredTreatments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTreatments = filteredTreatments.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };
  const refreshTreatments = () => {
    fetchTreatments();
  };
  const stats = useMemo(() => ({
    total: treatments.length,
    filtered: filteredTreatments.length,
    currentPageCount: currentTreatments.length,
    hasResults: filteredTreatments.length > 0,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    showPagination: filteredTreatments.length > itemsPerPage
  }), [treatments, filteredTreatments, currentTreatments, currentPage, totalPages]);

  return {
    treatments,
    loading,
    error,
    searchTerm,
    currentPage,
    filteredTreatments,
    currentTreatments,
    totalPages,
    startIndex,
    endIndex,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleSearchChange,
    refreshTreatments,
    stats,
    itemsPerPage
  };
};