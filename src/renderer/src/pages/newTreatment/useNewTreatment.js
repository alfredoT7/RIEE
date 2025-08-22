import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { registerTreatment } from '../../api/Api';
import axios from 'axios';

export const useNewTreatment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'riee-consultorio');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzizafv5s/image/upload',
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Error al subir la imagen');
    }
  };

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxWidth = 550;
          const maxHeight = 550;

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, { type: file.type });
            resolve(resizedFile);
          }, 'image/jpeg', 0.7);
        };
        img.onerror = (error) => reject(error);
        img.src = e.target.result;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const createTreatment = async (formData, selectedFile, defaultImageUrl) => {
    setIsSubmitting(true);
    
    try {
      let imageUrl = defaultImageUrl;

      // Si hay archivo seleccionado, subirlo a Cloudinary
      if (selectedFile) {
        const resizedFile = await resizeImage(selectedFile);
        imageUrl = await uploadImageToCloudinary(resizedFile);
      }

      // Preparar datos para el backend según TreatmentRequest
      const treatmentRequest = {
        nombreTratamiento: formData.nombreTratamiento.trim(),
        descripcion: formData.descripcion?.trim() || null,
        procedimiento: formData.procedimiento?.trim() || null,
        semanasEstimadas: parseInt(formData.semanasEstimadas),
        costoBaseTratamiento: parseInt(formData.costoBaseTratamiento),
        notasAdicionales: formData.notasAdicionales?.trim() || null,
        // No enviamos imagen_referencial al backend según el TreatmentRequest
      };

      // Validar datos localmente antes de enviar
      if (!treatmentRequest.nombreTratamiento) {
        throw new Error('El nombre del tratamiento es obligatorio');
      }
      
      if (treatmentRequest.semanasEstimadas < 1 || treatmentRequest.semanasEstimadas > 104) {
        throw new Error('Las semanas estimadas deben estar entre 1 y 104');
      }
      
      if (treatmentRequest.costoBaseTratamiento < 0) {
        throw new Error('El costo base no puede ser negativo');
      }

      // Enviar al backend
      await registerTreatment(treatmentRequest);

      // Mostrar mensaje de éxito
      toast.success('¡Tratamiento registrado exitosamente!', {
        description: `${treatmentRequest.nombreTratamiento} ha sido agregado al sistema`,
        duration: 4000,
      });

      // Navegar de vuelta a la lista de tratamientos
      navigate('/treatment');
      
      return { success: true, data: treatmentRequest };

    } catch (error) {
      console.error('Error creating treatment:', error);
      
      // Mostrar mensaje de error específico
      const errorMessage = error.response?.data?.message || error.message || 'Error al registrar el tratamiento';
      
      toast.error('Error al registrar el tratamiento', {
        description: errorMessage,
        duration: 5000,
      });

      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateTreatmentData = (data) => {
    const errors = {};

    if (!data.nombreTratamiento || data.nombreTratamiento.trim().length < 3) {
      errors.nombreTratamiento = 'El nombre debe tener al menos 3 caracteres';
    }

    if (data.nombreTratamiento && data.nombreTratamiento.length > 255) {
      errors.nombreTratamiento = 'El nombre no puede exceder 255 caracteres';
    }

    if (data.descripcion && data.descripcion.length > 500) {
      errors.descripcion = 'La descripción no puede exceder 500 caracteres';
    }

    if (data.procedimiento && data.procedimiento.length > 1000) {
      errors.procedimiento = 'El procedimiento no puede exceder 1000 caracteres';
    }

    if (!data.semanasEstimadas || data.semanasEstimadas < 1 || data.semanasEstimadas > 104) {
      errors.semanasEstimadas = 'Las semanas estimadas deben estar entre 1 y 104';
    }

    if (!data.costoBaseTratamiento || data.costoBaseTratamiento < 0) {
      errors.costoBaseTratamiento = 'El costo base debe ser mayor o igual a 0';
    }

    if (data.notasAdicionales && data.notasAdicionales.length > 500) {
      errors.notasAdicionales = 'Las notas adicionales no pueden exceder 500 caracteres';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return {
    createTreatment,
    validateTreatmentData,
    isSubmitting,
    resizeImage,
    uploadImageToCloudinary
  };
};