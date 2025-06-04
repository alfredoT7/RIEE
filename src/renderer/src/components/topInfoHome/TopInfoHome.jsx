import React from 'react'
import './TopInfoHome.css'

const TopInfoHome = ({ title, quantity, porcentaje, icon }) => {
  const IconComponent = icon;

  return (
    <div className="info-chard">
        <div className='info-chard-top'>
            <IconComponent className="icon-wallet" strokeWidth={2}/>
            <div className='info-chard-top-right'>
              <h5>{title}</h5>
              <h4>{quantity}</h4>
            </div>
        </div>
        <div className='info-chard-bot'>
          <p>{porcentaje}</p>
        </div>
        
    </div>
  )
}
export default TopInfoHome