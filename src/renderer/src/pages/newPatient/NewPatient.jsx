import React, { useState } from 'react'
import ImagesApp from '../../assets/ImagesApp'
import './NewPatient.css'
import { FaUpload, FaFile } from 'react-icons/fa'
const NewPatient = () => {
    const [formValues, setFormValues] = useState({
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
      });
    
      const [errors, setErrors] = useState({});
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };
    
      const validate = () => {
        let errors = {};
    
        // if (!formValues.name) errors.name = 'Nombre es obligatorio';
        // if (!formValues.lastname) errors.lastname = 'Apellido es obligatorio';
        // if (!formValues.ci) errors.ci = 'Carnet de identidad es obligatorio';
        // if (!formValues.birthDate) errors.birthDate = 'Fecha de nacimiento es obligatoria';
        // if (!formValues.phone) errors.phone = 'Teléfono es obligatorio';
        // if (!formValues.civilStatus) errors.civilStatus = 'Estado civil es obligatorio';
        // if (!formValues.occupation) errors.occupation = 'Ocupación es obligatoria';
        // if (!formValues.email) errors.email = 'Email es obligatorio';
        // if (!/\S+@\S+\.\S+/.test(formValues.email)) errors.email = 'Email no es válido';
        // if (!formValues.referencePerson) errors.referencePerson = 'Persona de referencia es obligatoria';
        // if (!formValues.referencePhone) errors.referencePhone = 'Teléfono de referencia es obligatorio';
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
          console.log('Datos del paciente:', formValues);
          alert('Formulario enviado');
        } else {
          alert('Por favor corrige los errores');
        }
      };
  return (
    <form className='cont-new-pat' onSubmit={handleSubmit}>
        <div className='img-card'>
            <h3>Imagen del Paciente</h3>
            <img src={ImagesApp.defaultImage} alt="Paciente" />
            <div>
                <button>
                    <FaUpload />
                    <p>Tomar Imagen</p>
                </button>
                <button>
                    <FaFile />
                    <p>Subir Imagen</p>
                </button>
            </div>
        </div>
        <div className='input-side'>
            <input className='input-card' name='name' type="text" placeholder='Nombres'  value={formValues.name} onChange={handleChange}/>
            <input className='input-card' name='lastname' type="text" placeholder='Apellido' value={formValues.lastname} onChange={handleChange}/>
            <div className='div-inputs'>
                <input className='in-two' type="number" name="ci" id="" placeholder='Carnet de identidad' value={formValues.ci} onChange={handleChange} />
                <input className='in-two' type="date" name="birthDate" id='' placeholder='Fecha de Nacimiento' value={formValues.birthDate} onChange={handleChange}/>
            </div>
            <input className='input-card' type="text" name='address' placeholder='Dirección' value={formValues.address} onChange={handleChange}/>
            <div className='input-two'>
                <input className='in-two' type="text" name="phone" placeholder='Telefono' value={formValues.phone} onChange={handleChange}/>
                <select className='select' name="civilStatus" value={formValues.civilStatus} onChange={handleChange}>
                    <option value="">Estado Civil</option>
                    <option value="soltero">Soltero</option>
                    <option value="casado">Casado</option>
                    <option value="divorciado">Divorciado</option>
                    <option value="viudo">Viudo</option>
                    <option value="union libre">Unión Libre</option>
                </select>
            </div>
            <input className='input-card' type="text" name="occupation" placeholder='Ocupación'  value={formValues.occupation} onChange={handleChange}/>
            <input className='input-card' type="email"  name="email" placeholder='Email'  value={formValues.email} onChange={handleChange}/>
            <input className='input-card' type="text"  name="referencePerson" placeholder='Nombre de persona de Referencia' value={formValues.referencePerson} onChange={handleChange}/>
            <input cassName='in-two-a' type="number" name="referencePhone" id="" placeholder='Num. de referencia' value={formValues.referencePhone} onChange={handleChange}/>
            <button type="submit">Añadir nuevo paciente</button>
        </div>
    </form>
  )
}

export default NewPatient