import React from 'react'
import ImagesApp from '../../assets/ImagesApp'
import './NewPatient.css'
import { FaUpload, FaFile } from 'react-icons/fa'
const NewPatient = () => {
  return (
    <div className='cont-new-pat'>
        <div className='img-card'>
            <h3>Imagen del Paciente</h3>
            <img src={ImagesApp.defaultImage} alt="" />
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
            <input className='input-card' type="text" placeholder='Nombres'/>
            <input className='input-card' type="text" placeholder='Apellido'/>
            <div className='div-inputs'>
                <input className='in-two' type="number" name="" id="" placeholder='Carnet de identidad'/>
                <input className='in-two' type="date" placeholder='Fecha de Nacimiento'/>
            </div>
            <input className='input-card' type="text" placeholder='Dirección'/>
            <div className='input-two'>
                <input className='in-two' type="text" placeholder='Telefono'/>
                <select className='select'>
                    <option value="">Estado Civil</option>
                    <option value="soltero">Soltero</option>
                    <option value="casado">Casado</option>
                    <option value="divorciado">Divorciado</option>
                    <option value="viudo">Viudo</option>
                    <option value="union libre">Unión Libre</option>
                </select>
            </div>
            <input className='input-card' type="text" placeholder='Ocupación'/>
            <input className='input-card' type="email" placeholder='Email'/>
            <input className='input-card' type="text" placeholder='Nombre de persona de Referencia'/>
            <input cassName='in-two-a' type="number" name="" id="" placeholder='Num. de referencia'/>
            <button>Añadir nuevo paciente</button>
        </div>
    </div>
  )
}

export default NewPatient