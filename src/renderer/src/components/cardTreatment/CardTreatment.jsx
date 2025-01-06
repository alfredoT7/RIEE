import React from 'react'
import './CardTreatment.css'
const CardTreatment = ( {title, icon, description} ) => {
  return (
    <div className='card-treatment'>
        <div className='left'>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
        <div className='right'>
            {icon}
        </div>
    </div>
  )
}

export default CardTreatment