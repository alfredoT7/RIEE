import React from 'react'
import './TopInfoHome.css'
import { FaWallet } from 'react-icons/fa'

const TopInfoHome = ({title,quantity,porcentaje}) => {
  return (
    <div className="info-chard">
        <div>
            <h5>{title}</h5>
            <h4>{quantity}<span>{porcentaje}</span></h4>
        </div>
        <FaWallet className="icon-wallet" />
        
    </div>
  )
}

export default TopInfoHome