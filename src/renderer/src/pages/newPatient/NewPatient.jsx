import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ImagesApp from '../../assets/ImagesApp';
import './NewPatient.css';
import { FaUpload, FaFile } from 'react-icons/fa';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nombre es obligatorio'),
  lastname: Yup.string().required('Apellido es obligatorio'),
  ci: Yup.string().required('Carnet de identidad es obligatorio'),
  birthDate: Yup.date().required('Fecha de nacimiento es obligatoria'),
  phone: Yup.string().required('Teléfono es obligatorio'),
  civilStatus: Yup.string().required('Estado civil es obligatorio'),
  occupation: Yup.string().required('Ocupación es obligatoria'),
  email: Yup.string().email('Email no es válido').required('Email es obligatorio'),
  referencePerson: Yup.string().required('Persona de referencia es obligatoria'),
  referencePhone: Yup.string().required('Teléfono de referencia es obligatorio')
});

const NewPatient = () => {
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
    referencePhone: ''
  };

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const errors = validationSchema.validateSync(values, { abortEarly: false });
    if (errors.length > 0) {
      const errorMessages = errors.map(error => error.message).join('\n');
      alert(`Errores:\n${errorMessages}`);
      setErrors(errors);
      setSubmitting(false);
    } else {
      console.log('Datos del paciente:', values);
      alert('Formulario enviado');
      setSubmitting(false);
    }
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
            <img src={ImagesApp.defaultImage} alt="Paciente" />
            <div>
              <button type="button">
                <FaUpload />
                <p>Tomar Imagen</p>
              </button>
              <button type="button">
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
            <button type="submit" disabled={isSubmitting}>Añadir nuevo paciente</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewPatient;