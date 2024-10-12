import React from 'react'
import './TopInfoHome.css'
import { FaWallet } from 'react-icons/fa'

const TopInfoHome = (quantity) => {
  return (
    <div className="info-chard">
        <div>
            <h5>Dinero de hoy</h5>
            <h4>$ 22123<span> +32%</span></h4>
        </div>
        <FaWallet className="icon-wallet" />
        
    </div>
  )
}

export default TopInfoHome