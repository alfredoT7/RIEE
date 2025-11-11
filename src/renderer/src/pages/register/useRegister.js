import { useState, useEffect } from 'react';
import { getAllSpecialities } from '../../api/Api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [specialities, setSpecialities] = useState([]);
  const [loadingSpecialities, setLoadingSpecialities] = useState(true);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    username: '',
    telefono: '',
    ciDentista: '',
    universidad: '',
    promocion: '',
    especialidadIds: [],
    imagenUrl: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  // Cargar especialidades al montar el componente
  useEffect(() => {
    loadSpecialities();
  }, []);

  const loadSpecialities = async () => {
    try {
      setLoadingSpecialities(true);
      const response = await getAllSpecialities();
      
      console.log('Response completa:', response);
      console.log('Response.data:', response.data);
      console.log('Response.data.data:', response.data.data);
      
      if (response.data && response.data.success && response.data.data) {
        console.log('Especialidades cargadas:', response.data.data);
        setSpecialities(response.data.data);
      } else {
        console.error('No se encontraron especialidades en la respuesta');
        toast.error('Error al cargar especialidades');
        setSpecialities([]);
      }
    } catch (error) {
      console.error('Error loading specialities:', error);
      console.error('Error completo:', error.response || error);
      toast.error('No se pudieron cargar las especialidades. Por favor, recarga la página.');
      setSpecialities([]);
    } finally {
      setLoadingSpecialities(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (especialidadId) => {
    setFormData(prev => {
      const currentIds = prev.especialidadIds;
      const newIds = currentIds.includes(especialidadId)
        ? currentIds.filter(id => id !== especialidadId)
        : [...currentIds, especialidadId];
      
      return {
        ...prev,
        especialidadIds: newIds
      };
    });

    // Limpiar error de especialidades
    if (errors.especialidadIds) {
      setErrors(prev => ({
        ...prev,
        especialidadIds: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.nombres.trim()) {
          newErrors.nombres = 'Los nombres son requeridos';
        }
        if (!formData.apellidos.trim()) {
          newErrors.apellidos = 'Los apellidos son requeridos';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'El email no es válido';
        }
        if (!formData.username.trim()) {
          newErrors.username = 'El nombre de usuario es requerido';
        } else if (formData.username.length < 4) {
          newErrors.username = 'El username debe tener al menos 4 caracteres';
        }
        break;

      case 2:
        if (!formData.telefono.trim()) {
          newErrors.telefono = 'El teléfono es requerido';
        } else if (!/^\d+$/.test(formData.telefono)) {
          newErrors.telefono = 'El teléfono debe contener solo números';
        }
        if (!formData.ciDentista.trim()) {
          newErrors.ciDentista = 'El CI del dentista es requerido';
        } else if (!/^\d+$/.test(formData.ciDentista)) {
          newErrors.ciDentista = 'El CI debe contener solo números';
        }
        if (!formData.universidad.trim()) {
          newErrors.universidad = 'La universidad es requerida';
        }
        if (!formData.promocion.trim()) {
          newErrors.promocion = 'La promoción es requerida';
        } else if (!/^\d+$/.test(formData.promocion)) {
          newErrors.promocion = 'La promoción debe ser un número';
        } else {
          const year = parseInt(formData.promocion);
          const currentYear = new Date().getFullYear();
          if (year < 1950 || year > currentYear + 10) {
            newErrors.promocion = `La promoción debe estar entre 1950 y ${currentYear + 10}`;
          }
        }
        break;

      case 3:
        if (formData.especialidadIds.length === 0) {
          newErrors.especialidadIds = 'Debes seleccionar al menos una especialidad';
        }
        // imagenUrl es opcional
        break;

      case 4:
        if (!formData.password) {
          newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 8) {
          newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        } else if (!/[A-Z]/.test(formData.password)) {
          newErrors.password = 'La contraseña debe contener al menos una mayúscula';
        } else if (!/[a-z]/.test(formData.password)) {
          newErrors.password = 'La contraseña debe contener al menos una minúscula';
        } else if (!/[0-9]/.test(formData.password)) {
          newErrors.password = 'La contraseña debe contener al menos un número';
        }
        
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Debes confirmar la contraseña';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast.error('Por favor completa todos los campos correctamente');
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      toast.error('Por favor completa todos los campos correctamente');
      return;
    }

    setIsLoading(true);

    try {
      // Preparar datos para enviar (sin confirmPassword)
      const dataToSend = {
        nombres: formData.nombres.trim(),
        apellidos: formData.apellidos.trim(),
        email: formData.email.trim(),
        username: formData.username.trim(),
        telefono: parseInt(formData.telefono),
        ciDentista: parseInt(formData.ciDentista),
        universidad: formData.universidad.trim(),
        promocion: parseInt(formData.promocion),
        especialidadIds: formData.especialidadIds,
        imagenUrl: formData.imagenUrl.trim() || 'https://example.com/default-dentist.jpg',
        password: formData.password
      };

      console.log('Enviando datos de registro:', dataToSend);

      // Usar el método register del contexto de autenticación
      const result = await registerUser(dataToSend);

      if (result.success) {
        toast.success(result.message || '¡Registro exitoso! Bienvenido a RIEE');
        
        // Redirigir al home (ya está autenticado)
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast.error(result.error || 'Error al registrar dentista');
        
        // Si hay errores de validación del backend, mostrarlos
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (error) {
      console.error('Error en registro:', error);
      toast.error('Error inesperado al registrar');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    currentStep,
    totalSteps,
    formData,
    errors,
    isLoading,
    specialities,
    loadingSpecialities,
    
    // Actions
    handleChange,
    handleCheckboxChange,
    handleNext,
    handlePrev,
    handleSubmit,
    validateStep
  };
};
