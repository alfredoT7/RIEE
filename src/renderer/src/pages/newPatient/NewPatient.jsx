import React, { useState, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ImagesApp from '../../assets/ImagesApp'; // Cambia la ruta según corresponda
import './NewPatient.css';
import { FaUpload, FaFile } from 'react-icons/fa';
import axios from 'axios';

// Validación con Yup
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

// Componente principal
const NewPatient = () => {
  const [imageUrl, setImageUrl] = useState(ImagesApp.defaultImage); // Imagen predeterminada
  const fileInputRef = useRef(null); // Referencia al input de archivo

  // Valores iniciales del formulario
  const initialValues = {
    name: '',
    lastname: '',
    ci: '',
    birthDate: '',
    address: '',
    phone: '',
    civilStatus: '',
    occupation: '',
    email: '',
    referencePerson: '',
    referencePhone: '',
  };

  // Manejo de subida de imagen
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'riee-consultorio'); // Reemplaza con tu upload_preset

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dzizafv5s/image/upload',
          formData
        );
        setImageUrl(response.data.secure_url); // Actualiza la URL de la imagen subida
        alert('Imagen subida exitosamente');
      } catch (error) {
        console.error('Error al subir la imagen:', error.response?.data || error.message);
        alert('Error al subir la imagen');
      }
    }
  };

  // Envío del formulario
  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const dataToSubmit = { ...values, imageUrl }; // Incluye la URL de la imagen

    validationSchema
      .validate(dataToSubmit, { abortEarly: false })
      .then(() => {
        console.log('Datos del paciente:', dataToSubmit);
        alert('Formulario enviado exitosamente');
        setSubmitting(false);
      })
      .catch((err) => {
        const errorMessages = err.errors.join('\n');
        alert(`Errores:\n${errorMessages}`);
        setErrors(
          err.inner.reduce((acc, error) => {
            acc[error.path] = error.message;
            return acc;
          }, {})
        );
        setSubmitting(false);
      });
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click(); // Abre el explorador de archivos
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='cont-new-pat'>
          <div className='img-card'>
            <h3>Imagen del Paciente</h3>
            <img src={imageUrl} alt="Paciente" />
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={handleFileButtonClick}
                disabled={isSubmitting}
              >
                <FaFile />
                <p>Subir Imagen</p>
              </button>
            </div>
          </div>
          <div className='input-side'>
            <div className="input-group">
              <label htmlFor="name">Nombres</label>
              <Field className="input-card" id="name" name="name" type="text" />
            </div>
            <div className="input-group">
              <label htmlFor="lastname">Apellido</label>
              <Field className="input-card" id="lastname" name="lastname" type="text" />
            </div>
            <div className='div-inputs'>
              <div className="input-group">
                <label htmlFor="ci">Carnet de identidad</label>
                <Field className="input-card" id="ci" name="ci" type="number" />
              </div>
              <div className="input-group">
                <label htmlFor="birthDate">Fecha de Nacimiento</label>
                <Field className="input-card" id="birthDate" name="birthDate" type="date" />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="address">Dirección</label>
              <Field className="input-card" id="address" name="address" type="text" />
            </div>
            <div className='input-two'>
              <div className="input-group">
                <label htmlFor="phone">Teléfono</label>
                <Field className="input-card" id="phone" name="phone" type="text" />
              </div>
              <div className="input-group">
                <label htmlFor="civilStatus">Estado Civil</label>
                <Field as="select" className="select" id="civilStatus" name="civilStatus">
                  <option value="">Estado Civil</option>
                  <option value="soltero">Soltero</option>
                  <option value="casado">Casado</option>
                  <option value="divorciado">Divorciado</option>
                  <option value="viudo">Viudo</option>
                  <option value="union libre">Unión Libre</option>
                </Field>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="occupation">Ocupación</label>
              <Field className="input-card" id="occupation" name="occupation" type="text" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <Field className="input-card" id="email" name="email" type="email" />
            </div>
            <div className="input-group">
              <label htmlFor="referencePerson">Nombre de persona de Referencia</label>
              <Field className="input-card" id="referencePerson" name="referencePerson" type="text" />
            </div>
            <div className="input-group inp-ref">
              <label htmlFor="referencePhone">Num. de referencia</label>
              <Field className="input-card" id="referencePhone" name="referencePhone" type="number" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Añadir nuevo paciente
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewPatient;
