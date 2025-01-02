// import React, { useState, useRef } from 'react';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import ImagesApp from '../../assets/ImagesApp';
// import './NewPatient.css';
// import { FaUpload, FaFile } from 'react-icons/fa';
// import axios from 'axios';
// import { registerPatient } from '../../api/Api';
// import { useNavigate } from 'react-router-dom';

// const validationSchema = Yup.object().shape({
//   name: Yup.string()
//     .matches(/^[a-zA-Z\s]+$/, 'Nombre no debe contener números')
//     .required('Nombre es obligatorio'),
//   lastname: Yup.string()
//     .matches(/^[a-zA-Z\s]+$/, 'Apellido no debe contener números')
//     .required('Apellido es obligatorio'),
//   ci: Yup.string().required('Carnet de identidad es obligatorio'),
//   birthDate: Yup.date().required('Fecha de nacimiento es obligatoria'),
//   phone: Yup.string().required('Teléfono es obligatorio'),
//   civilStatus: Yup.string().required('Estado civil es obligatorio'),
//   occupation: Yup.string()
//     .matches(/^[a-zA-Z\s]+$/, 'Ocupación no debe contener números')
//     .required('Ocupación es obligatoria'),
//   email: Yup.string().email('Email no es válido').required('Email es obligatorio'),
//   referencePerson: Yup.string()
//     .matches(/^[a-zA-Z\s]+$/, 'Nombre de persona de referencia no debe contener números')
//     .required('Persona de referencia es obligatoria'),
//   referencePhone: Yup.string().required('Teléfono de referencia es obligatorio'),
// });

// const NewPatient = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   const initialValues = {
//     name: '',
//     lastname: '',
//     ci: '',
//     birthDate: '',
//     address: '',
//     phone: '',
//     civilStatus: '',
//     occupation: '',
//     email: '',
//     referencePerson: '',
//     referencePhone: '',
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setPreviewUrl(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const uploadImageToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'riee-consultorio');

//     try {
//       const response = await axios.post(
//         'https://api.cloudinary.com/v1_1/dzizafv5s/image/upload',
//         formData
//       );
//       return response.data.secure_url;
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       throw new Error('Error al subir la imagen');
//     }
//   };

//   const handleSubmit = async (values, { setSubmitting, setErrors }) => {
//     try {
//       let imageUrl = ImagesApp.defaultImage;
      
//       if (selectedFile) {
//         imageUrl = await uploadImageToCloudinary(selectedFile);
//       }

//       const patientData = {
//         ciPaciente: parseInt(values.ci),
//         idEstadoCivil: parseInt(values.civilStatus), 
//         fechaNacimiento: values.birthDate,
//         direccion: values.address,
//         ocupacion: values.occupation,
//         personaDeReferencia: values.referencePerson,
//         numeroPersonaRef: parseInt(values.referencePhone),
//         imagen: imageUrl,
//         nombre: values.name,
//         apellido: values.lastname,
//         numeroTelefono: parseInt(values.phone),
//       };
//       await registerPatient(patientData);
//       console.log('Form submitted:', patientData);
//       alert('Paciente registrado exitosamente');
//       setSelectedFile(null);
//       setPreviewUrl(null);
//       navigate('/patient');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Error al registrar el paciente: revisa el formato de las entradas o posiblemente el carnet de identidad ya existe');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleFileButtonClick = () => {
//     fileInputRef.current.click();
//   };

//  return (
//     <Formik
//     initialValues={initialValues}
//     validationSchema={validationSchema}
//     onSubmit={handleSubmit}
//     >
//   {({ isSubmitting }) => (
//     <Form className='cont-new-pat'>

//          <div className='img-card'>
//             <h3>Imagen del Paciente</h3>
//             <img 
//               src={previewUrl || ImagesApp.defaultImage} 
//               alt="Paciente" 
//               style={{ height: '80%', width: '80%', objectFit: 'cover', objectPosition: 'center', borderRadius: '30px' }} 
//             />
//             <div>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 accept="image/*"
//                 style={{ display: 'none' }}
//                 onChange={handleFileChange}
//               />
//               <button
//                 type="button"
//                 onClick={handleFileButtonClick}
//                 disabled={isSubmitting}
//               >
//                 <FaFile />
//                 <p>Subir Imagen</p>
//               </button>
//             </div>
//           </div>
//          <div className='input-side'>
//            <div className="input-group">
//              <label htmlFor="name">Nombres</label>
//              <Field className="input-card" id="name" name="name" type="text" />
//            </div>
//            <div className="input-group">
//              <label htmlFor="lastname">Apellido</label>
//              <Field className="input-card" id="lastname" name="lastname" type="text" />
//            </div>
//            <div className='div-inputs'>
//              <div className="input-group">
//                <label htmlFor="ci">Carnet de identidad</label>
//                <Field className="input-card" id="ci" name="ci" type="number" />
//              </div>
//              <div className="input-group">
//                <label htmlFor="birthDate">Fecha de Nacimiento</label>
//                <Field className="input-card" id="birthDate" name="birthDate" type="date" />
//              </div>
//            </div>
//            <div className="input-group">
//              <label htmlFor="address">Dirección</label>
//              <Field className="input-card" id="address" name="address" type="text" />
//            </div>
//            <div className='input-two'>
//              <div className="input-group">
//                <label htmlFor="phone">Teléfono</label>
//                <Field className="input-card" id="phone" name="phone" type="number" />
//              </div>
//              <div className="input-group">
//                <label htmlFor="civilStatus">Estado Civil</label>
//                <Field as="select" className="select" id="civilStatus" name="civilStatus">
//                 <option value="">Estado Civil</option>
//                 <option value="1">Soltero</option>
//                 <option value="2">Casado</option>
//                 <option value="3">Divorciado</option>
//                 <option value="4">Viudo</option>
//                 <option value="5">Unión Libre</option>
//                </Field>
//              </div>
//            </div>
//            <div className="input-group">
//              <label htmlFor="occupation">Ocupación</label>
//              <Field className="input-card" id="occupation" name="occupation" type="text" />
//            </div>
//            <div className="input-group">
//              <label htmlFor="email">Email</label>
//              <Field className="input-card" id="email" name="email" type="email" />
//            </div>
//            <div className="input-group">
//              <label htmlFor="referencePerson">Nombre de persona de Referencia</label>
//              <Field className="input-card" id="referencePerson" name="referencePerson" type="text" />
//            </div>
//            <div className="input-group inp-ref">
//              <label htmlFor="referencePhone">Num. de referencia</label>
//              <Field className="input-card" id="referencePhone" name="referencePhone" type="number" />
//            </div>
//            <button type="submit" disabled={isSubmitting}>
//               Añadir nuevo paciente
//             </button>
//          </div>
//        </Form>
//      )}
//    </Formik>
//  );
// };
// export default NewPatient;
import React, { useState, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ImagesApp from '../../assets/ImagesApp';
import './NewPatient.css';
import { FaUpload, FaFile } from 'react-icons/fa';
import axios from 'axios';
import { registerPatient } from '../../api/Api';
import { useNavigate } from 'react-router-dom';

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
    civilStatus: '',
    occupation: '',
    email: '',
    referencePerson: '',
    referencePhone: '',
  };

  // Función para redimensionar la imagen a 550x550px manteniendo la proporción
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

          // Redimensionar la imagen manteniendo la proporción
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

          // Crear un canvas para redibujar la imagen con el tamaño ajustado
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convertir el canvas a un formato de imagen
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, { type: file.type });
            resolve(resizedFile);
          }, 'image/jpeg', 0.7); // Puedes ajustar la calidad aquí (0.7 es 70%)
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
        // Redimensionar la imagen antes de mostrarla
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

      const patientData = {
        ciPaciente: parseInt(values.ci),
        idEstadoCivil: parseInt(values.civilStatus),
        fechaNacimiento: values.birthDate,
        direccion: values.address,
        ocupacion: values.occupation,
        personaDeReferencia: values.referencePerson,
        numeroPersonaRef: parseInt(values.referencePhone),
        imagen: imageUrl,
        nombre: values.name,
        apellido: values.lastname,
        numeroTelefono: parseInt(values.phone),
      };

      await registerPatient(patientData);
      console.log('Form submitted:', patientData);
      alert('Paciente registrado exitosamente');
      setSelectedFile(null);
      setPreviewUrl(null);
      navigate('/patient');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error al registrar el paciente: revisa el formato de las entradas o posiblemente el carnet de identidad ya existe');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
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
            <img
              src={previewUrl || ImagesApp.defaultImage}
              alt="Paciente"
              style={{
                height: '80%',
                width: '80%',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '30px',
              }}
            />
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
                <Field className="input-card" id="phone" name="phone" type="number" />
              </div>
              <div className="input-group">
                <label htmlFor="civilStatus">Estado Civil</label>
                <Field as="select" className="select" id="civilStatus" name="civilStatus">
                  <option value="">Estado Civil</option>
                  <option value="1">Soltero</option>
                  <option value="2">Casado</option>
                  <option value="3">Divorciado</option>
                  <option value="4">Viudo</option>
                  <option value="5">Unión Libre</option>
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
