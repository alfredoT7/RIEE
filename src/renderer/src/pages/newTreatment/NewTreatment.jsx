import React, { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import treatmentPhoto from '../../assets/img/treatmentphoto.png';
import { FaCamera, FaTooth, FaFileAlt, FaClipboardList, FaClock, FaDollarSign, FaStickyNote, FaSave, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useNewTreatment } from './useNewTreatment';

const validationSchema = Yup.object().shape({
  nombreTratamiento: Yup.string()
    .trim()
    .min(1, 'El nombre del tratamiento es obligatorio')
    .max(255, 'El nombre del tratamiento debe tener máximo 255 caracteres')
    .required('El nombre del tratamiento es obligatorio'),
  descripcion: Yup.string()
    .max(500, 'La descripción debe tener máximo 500 caracteres'),
  procedimiento: Yup.string()
    .max(1000, 'El procedimiento debe tener máximo 1000 caracteres'),
  semanasEstimadas: Yup.number()
    .typeError('Las semanas estimadas deben ser un número')
    .min(1, 'Las semanas estimadas deben ser al menos 1')
    .max(104, 'Las semanas estimadas no pueden exceder 104')
    .integer('Las semanas estimadas deben ser un número entero')
    .required('Las semanas estimadas son obligatorias'),
  costoBaseTratamiento: Yup.number()
    .typeError('El costo base debe ser un número')
    .min(0, 'El costo base no puede ser negativo')
    .integer('El costo base debe ser un número entero')
    .required('El costo base es obligatorio'),
  notasAdicionales: Yup.string()
    .max(500, 'Las notas adicionales deben tener máximo 500 caracteres'),
});

const NewTreatment = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  // Usar el hook personalizado
  const { createTreatment, isSubmitting, resizeImage } = useNewTreatment();

  const initialValues = {
    nombreTratamiento: '',
    descripcion: '',
    procedimiento: '',
    semanasEstimadas: '',
    costoBaseTratamiento: '',
    notasAdicionales: '',
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const resizedFile = await resizeImage(file);
        setSelectedFile(resizedFile);

        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(resizedFile);
      } catch (error) {
        console.error('Error resizing the image:', error);
      }
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    
    const result = await createTreatment(values, selectedFile, treatmentPhoto);
    
    if (result.success) {
      // Limpiar formulario y estado
      setSelectedFile(null);
      setPreviewUrl(null);
    }
    
    setSubmitting(false);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="new-treatment-container">
      <div className="page-header">
        <h1 className="page-title">
          <FaTooth className="title-icon" />
          Registro de Nuevo Tratamiento
        </h1>
        <p className="page-subtitle">Complete la información del tratamiento dental</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form className="treatment-form">
            {/* Sección de Imagen */}
            <div className="form-section image-section">
              <div className="section-header" style={{ marginBottom: '28px', paddingBottom: '20px' }}>
                <h3>Imagen Referencial del Tratamiento</h3>
              </div>
              
              <div className="image-upload-container">
                <div className="image-preview">
                  <img
                    src={previewUrl || treatmentPhoto}
                    alt="Vista previa del tratamiento"
                    className="preview-image"
                  />
                  <div className="image-overlay">
                    <FaCamera className="camera-icon" />
                  </div>
                </div>
                
                <div className="image-controls">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    className="upload-btn"
                    onClick={handleFileButtonClick}
                    disabled={isSubmitting}
                  >
                    <FaCamera />
                    Subir Imagen
                  </button>
                  {previewUrl && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={handleRemoveImage}
                      disabled={isSubmitting}
                    >
                      <FaTrash />
                      Quitar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Información Básica del Tratamiento */}
            <div className="form-section">
              <div className="section-header" style={{ marginBottom: '28px', paddingBottom: '20px' }}>
                <h3>Información Básica</h3>
              </div>
              
              <div className="form-grid">
                <div className="input-group full-width">
                  <label htmlFor="nombreTratamiento">
                    <FaTooth className="input-icon" />
                    Nombre del Tratamiento *
                  </label>
                  <Field 
                    name="nombreTratamiento" 
                    type="text" 
                    className={`form-input ${errors.nombreTratamiento && touched.nombreTratamiento ? 'error' : ''}`}
                    placeholder="Ej: Ortodoncia con brackets metálicos"
                  />
                  <ErrorMessage name="nombreTratamiento" component="div" className="error-message" />
                </div>

                <div className="input-group full-width">
                  <label htmlFor="descripcion">
                    <FaFileAlt className="input-icon" />
                    Descripción *
                  </label>
                  <Field 
                    as="textarea"
                    name="descripcion" 
                    rows="3"
                    className={`form-textarea ${errors.descripcion && touched.descripcion ? 'error' : ''}`}
                    placeholder="Descripción breve del tratamiento y sus beneficios..."
                  />
                  <div className="character-count">
                    {values.descripcion.length}/500 caracteres
                  </div>
                  <ErrorMessage name="descripcion" component="div" className="error-message" />
                </div>
              </div>
            </div>

            {/* Procedimiento */}
            <div className="form-section">
              <div className="section-header" style={{ marginBottom: '28px', paddingBottom: '20px' }}>
                <h3>Procedimiento Detallado</h3>
              </div>
              
              <div className="form-grid">
                <div className="input-group full-width">
                  <label htmlFor="procedimiento">
                    <FaClipboardList className="input-icon" />
                    Procedimiento *
                  </label>
                  <Field 
                    as="textarea"
                    name="procedimiento" 
                    rows="5"
                    className={`form-textarea ${errors.procedimiento && touched.procedimiento ? 'error' : ''}`}
                    placeholder="Describe paso a paso el procedimiento del tratamiento..."
                  />
                  <div className="character-count">
                    {values.procedimiento.length}/1000 caracteres
                  </div>
                  <ErrorMessage name="procedimiento" component="div" className="error-message" />
                </div>
              </div>
            </div>

            {/* Información de Tiempo y Costo */}
            <div className="form-section">
              <div className="section-header" style={{ marginBottom: '28px', paddingBottom: '20px' }}>
                <h3>Tiempo y Costo</h3>
              </div>
              
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="semanasEstimadas">
                    <FaClock className="input-icon" />
                    Semanas Estimadas *
                  </label>
                  <Field 
                    name="semanasEstimadas" 
                    type="number" 
                    min="1"
                    max="104"
                    className={`form-input ${errors.semanasEstimadas && touched.semanasEstimadas ? 'error' : ''}`}
                    placeholder="Ej: 12"
                  />
                  <ErrorMessage name="semanasEstimadas" component="div" className="error-message" />
                </div>

                <div className="input-group">
                  <label htmlFor="costoBaseTratamiento">
                    <FaDollarSign className="input-icon" />
                    Costo Base (Bs.) *
                  </label>
                  <Field 
                    name="costoBaseTratamiento" 
                    type="number" 
                    min="0"
                    step="1"
                    className={`form-input ${errors.costoBaseTratamiento && touched.costoBaseTratamiento ? 'error' : ''}`}
                    placeholder="Ej: 1500"
                  />
                  <ErrorMessage name="costoBaseTratamiento" component="div" className="error-message" />
                </div>
              </div>
            </div>

            {/* Notas Adicionales */}
            <div className="form-section">
              <div className="section-header" style={{ marginBottom: '28px', paddingBottom: '20px' }}>
                <h3>Notas Adicionales</h3>
              </div>
              
              <div className="form-grid">
                <div className="input-group full-width">
                  <label htmlFor="notasAdicionales">
                    <FaStickyNote className="input-icon" />
                    Notas Adicionales
                  </label>
                  <Field 
                    as="textarea"
                    name="notasAdicionales" 
                    rows="3"
                    className="form-textarea"
                    placeholder="Consideraciones especiales, contraindicaciones, cuidados post-tratamiento..."
                  />
                  <div className="character-count">
                    {values.notasAdicionales.length}/500 caracteres
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => navigate('/treatment')}
                disabled={isSubmitting}
              >
                <FaArrowLeft className="btn-icon" />
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                <FaSave className="btn-icon" />
                {isSubmitting ? 'Guardando...' : 'Registrar Tratamiento'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewTreatment;
