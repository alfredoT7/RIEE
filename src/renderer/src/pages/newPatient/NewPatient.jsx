import React, { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ImagesApp from '../../assets/ImagesApp';
import './NewPatient.css';
import { 
  FaCamera, 
  FaUser, 
  FaIdCard, 
  FaCalendar, 
  FaMapMarker, 
  FaPhone, 
  FaHeart, 
  FaBriefcase, 
  FaEnvelope, 
  FaUserFriends, 
  FaSave, 
  FaTrash,
  FaUserPlus,
  FaAddressCard,
  FaPhoneAlt,
  FaInfoCircle,
  FaArrowLeft
} from 'react-icons/fa';
import axios from 'axios';
import { registerPatient } from '../../api/Api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Nombre no debe contener números')
    .required('Nombre es obligatorio'),
  lastname: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Apellido no debe contener números')
    .required('Apellido es obligatorio'),
  ci: Yup.string().required('Carnet de identidad es obligatorio'),
  birthDate: Yup.date().required('Fecha de nacimiento es obligatoria'),
  phone: Yup.string().required('Teléfono es obligatorio'),
  secondPhone: Yup.string(),
  civilStatus: Yup.string().required('Estado civil es obligatorio'),
  occupation: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Ocupación no debe contener números')
    .required('Ocupación es obligatoria'),
  email: Yup.string().email('Email no es válido').required('Email es obligatorio'),
  referencePerson: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Nombre de persona de referencia no debe contener números')
    .required('Persona de referencia es obligatoria'),
  referencePhone: Yup.string().required('Teléfono de referencia es obligatorio'),
});

const NewPatient = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    lastname: '',
    ci: '',
    birthDate: '',
    address: '',
    phone: '',
    secondPhone: '',
    civilStatus: '',
    occupation: '',
    email: '',
    referencePerson: '',
    referencePhone: '',
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

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      let imageUrl = ImagesApp.defaultImage;

      if (selectedFile) {
        imageUrl = await uploadImageToCloudinary(selectedFile);
      }

      

      const phoneNumbers = [{ numero: values.phone }];
      if (values.secondPhone && values.secondPhone.trim() !== '') {
        phoneNumbers.push({ numero: values.secondPhone });
      }

      const patientData = {
        ciPaciente: parseInt(values.ci),
        email: values.email,
        estadoCivil: {
          id: parseInt(values.civilStatus)
        },
        fechaNacimiento: values.birthDate,
        direccion: values.address,
        ocupacion: values.occupation,
        personaDeReferencia: values.referencePerson,
        numeroPersonaRef: parseInt(values.referencePhone),
        imagen: imageUrl,
        nombre: values.name,
        apellido: values.lastname,
        phonesNumbers: phoneNumbers
      };

      await registerPatient(patientData);
      console.log('Form submitted:', patientData);
      
      toast.success('¡Paciente registrado exitosamente!', {
        description: `${values.name} ${values.lastname} ha sido agregado al sistema`,
        duration: 4000,
      });
      
      setSelectedFile(null);
      setPreviewUrl(null);
      navigate('/patient');
    } catch (error) {
      console.error('Error submitting form:', error);
      
      toast.error('Error al registrar el paciente', {
        description: 'Revisa el formato de las entradas o posiblemente el carnet de identidad ya existe',
        duration: 5000,
      });
    } finally {
      setSubmitting(false);
    }
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
    <div className="new-patient-container">
      <div className="page-header">
        <h1 className="page-title">
          <FaUserPlus className="title-icon" />
          Registro de Nuevo Paciente
        </h1>
        <p className="page-subtitle">Complete toda la información del paciente para crear su perfil médico</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="patient-form">
            {/* Sección de Imagen */}
            <div className="form-section image-section">
              <div className="section-header">
                <h3><FaCamera /> Fotografía del Paciente</h3>
              </div>
              
              <div className="image-upload-container">
                <div className="image-preview">
                  <img
                    src={previewUrl || ImagesApp.defaultImage}
                    alt="Vista previa del paciente"
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
                    Subir Foto
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

            {/* Información Personal */}
            <div className="form-section">
              <div className="section-header">
                <h3><FaAddressCard /> Información Personal</h3>
              </div>
              
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="name">
                    <FaUser className="input-icon" />
                    Nombres *
                  </label>
                  <Field 
                    name="name" 
                    type="text" 
                    className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
                    placeholder="Ingrese los nombres"
                  />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>

                <div className="input-group">
                  <label htmlFor="lastname">
                    <FaUser className="input-icon" />
                    Apellidos *
                  </label>
                  <Field 
                    name="lastname" 
                    type="text" 
                    className={`form-input ${errors.lastname && touched.lastname ? 'error' : ''}`}
                    placeholder="Ingrese los apellidos"
                  />
                  <ErrorMessage name="lastname" component="div" className="error-message" />
                </div>

                <div className="input-group">
                  <label htmlFor="ci">
                    <FaIdCard className="input-icon" />
                    Carnet de Identidad *
                  </label>
                  <Field 
                    name="ci" 
                    type="text" 
                    className={`form-input ${errors.ci && touched.ci ? 'error' : ''}`}
                    placeholder="Ej: 1234567 LP"
                  />
                  <ErrorMessage name="ci" component="div" className="error-message" />
                </div>

                <div className="input-group">
                  <label htmlFor="birthDate">
                    <FaCalendar className="input-icon" />
                    Fecha de Nacimiento *
                  </label>
                  <Field 
                    name="birthDate" 
                    type="date" 
                    className={`form-input ${errors.birthDate && touched.birthDate ? 'error' : ''}`}
                  />
                  <ErrorMessage name="birthDate" component="div" className="error-message" />
                </div>

                <div className="input-group full-width">
                  <label htmlFor="address">
                    <FaMapMarker className="input-icon" />
                    Dirección
                  </label>
                  <Field 
                    name="address" 
                    type="text" 
                    className="form-input"
                    placeholder="Ingrese la dirección completa"
                  />
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="form-section">
              <div className="section-header">
                <h3><FaPhoneAlt /> Información de Contacto</h3>
              </div>
              
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="phone">
                    <FaPhone className="input-icon" />
                    Teléfono Principal *
                  </label>
                  <Field 
                    name="phone" 
                    type="tel" 
                    className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`}
                    placeholder="70123456"
                  />
                  <ErrorMessage name="phone" component="div" className="error-message" />
                </div>

                <div className="input-group">
                  <label htmlFor="secondPhone">
                    <FaPhone className="input-icon" />
                    Teléfono Secundario
                  </label>
                  <Field 
                    name="secondPhone" 
                    type="tel" 
                    className="form-input"
                    placeholder="22334455 (Opcional)"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">
                    <FaEnvelope className="input-icon" />
                    Correo Electrónico *
                  </label>
                  <Field 
                    name="email" 
                    type="email" 
                    className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                    placeholder="ejemplo@correo.com"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>
              </div>
            </div>

            {/* Información Adicional */}
            <div className="form-section">
              <div className="section-header">
                <h3><FaInfoCircle /> Información Adicional</h3>
              </div>
              
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="civilStatus">
                    <FaHeart className="input-icon" />
                    Estado Civil *
                  </label>
                  <Field 
                    as="select" 
                    name="civilStatus" 
                    className={`form-select ${errors.civilStatus && touched.civilStatus ? 'error' : ''}`}
                  >
                    <option value="">Seleccione estado civil</option>
                    <option value="1">Soltero(a)</option>
                    <option value="2">Casado(a)</option>
                    <option value="3">Divorciado(a)</option>
                    <option value="4">Viudo(a)</option>
                    <option value="5">Unión Libre</option>
                  </Field>
                  <ErrorMessage name="civilStatus" component="div" className="error-message" />
                </div>

                <div className="input-group">
                  <label htmlFor="occupation">
                    <FaBriefcase className="input-icon" />
                    Ocupación *
                  </label>
                  <Field 
                    name="occupation" 
                    type="text" 
                    className={`form-input ${errors.occupation && touched.occupation ? 'error' : ''}`}
                    placeholder="Ej: Ingeniero, Estudiante, etc."
                  />
                  <ErrorMessage name="occupation" component="div" className="error-message" />
                </div>
              </div>
            </div>

            {/* Persona de Referencia */}
            <div className="form-section">
              <div className="section-header">
                <h3>Persona de Referencia</h3>
              </div>
              
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="referencePerson">
                    <FaUserFriends className="input-icon" />
                    Nombre Completo *
                  </label>
                  <Field 
                    name="referencePerson" 
                    type="text" 
                    className={`form-input ${errors.referencePerson && touched.referencePerson ? 'error' : ''}`}
                    placeholder="Nombre de la persona de contacto"
                  />
                  <ErrorMessage name="referencePerson" component="div" className="error-message" />
                </div>

                <div className="input-group">
                  <label htmlFor="referencePhone">
                    <FaPhone className="input-icon" />
                    Teléfono de Referencia *
                  </label>
                  <Field 
                    name="referencePhone" 
                    type="tel" 
                    className={`form-input ${errors.referencePhone && touched.referencePhone ? 'error' : ''}`}
                    placeholder="Teléfono de contacto"
                  />
                  <ErrorMessage name="referencePhone" component="div" className="error-message" />
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => navigate('/patient')}
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
                {isSubmitting ? 'Guardando...' : 'Registrar Paciente'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPatient;