import React from 'react';
import { FaArrowUp, FaArrowDown, FaCreditCard, FaFileAlt, FaCalendarAlt, FaBolt, FaMobileAlt, FaDollarSign, FaChartLine, FaChartBar } from 'react-icons/fa';
import './Cuentas.css';

const Cuentas = () => {
  return (
    <div className="cuentas-container">
      <div className="cuentas-content">
        {/* Header */}
        <div className="cuentas-header">
          <h1 className="cuentas-title">Finanzas</h1>
          <p className="cuentas-subtitle">Gestión financiera y reportes</p>
        </div>

        {/* Financial Summary Cards */}
        <div className="financial-summary-cards">
          {/* Ingresos */}
          <div className="summary-card">
            <div className="card-header">
              <span className="card-label">Ingresos</span>
              <FaChartLine className="card-icon income-icon" />
            </div>
            <div className="card-amount">
              <span className="amount-text">Bs. 25,320</span>
            </div>
            <div className="card-trend positive">
              <div className="trend-info">
                <FaArrowUp className="trend-icon" />
                <span className="trend-percentage">+8.2%</span>
              </div>
              <span className="trend-text">vs mes anterior</span>
            </div>
          </div>

          {/* Gastos */}
          <div className="summary-card">
            <div className="card-header">
              <span className="card-label">Gastos</span>
              <FaChartBar className="card-icon expense-icon" />
            </div>
            <div className="card-amount">
              <span className="amount-text">Bs. 12,450</span>
            </div>
            <div className="card-trend negative">
              <div className="trend-info">
                <FaArrowDown className="trend-icon" />
                <span className="trend-percentage">-3.1%</span>
              </div>
              <span className="trend-text">vs mes anterior</span>
            </div>
          </div>

          {/* Ganancia Neta */}
          <div className="summary-card">
            <div className="card-header">
              <span className="card-label">Ganancia Neta</span>
              <FaDollarSign className="card-icon profit-icon" />
            </div>
            <div className="card-amount">
              <span className="amount-text">Bs. 12,870</span>
            </div>
            <div className="card-trend positive">
              <div className="trend-info">
                <FaArrowUp className="trend-icon" />
                <span className="trend-percentage">+12.5%</span>
              </div>
              <span className="trend-text">vs mes anterior</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Resumen Financiero */}
          <div className="financial-summary">
            <div className="section-header">
              <div className="header-info">
                <h3 className="section-title">Resumen Financiero</h3>
                <p className="section-subtitle">Visión general de los ingresos y gastos</p>
              </div>
              <select className="period-selector">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Yearly</option>
              </select>
            </div>
            
            {/* Chart Placeholder */}
            <div className="chart-container">
              <div className="chart-content">
                <div className="chart-placeholder">
                  <div className="chart-icon"></div>
                </div>
                <p className="chart-text">Gráfico de Ingresos vs Gastos</p>
              </div>
            </div>
          </div>

          {/* Transacciones Recientes */}
          <div className="recent-transactions">
            <div className="section-header-simple">
              <h3 className="section-title">Transacciones Recientes</h3>
              <p className="section-subtitle">Últimas transacciones registradas</p>
            </div>

            <div className="transactions-list">
              <div className="transaction-item income">
                <div className="transaction-left">
                  <div className="transaction-icon income">
                    <FaArrowUp />
                  </div>
                  <div className="transaction-info">
                    <p className="transaction-title">Consulta ortodoncia - Juan Perez</p>
                    <p className="transaction-date">22 Oct 2023</p>
                  </div>
                </div>
                <span className="transaction-amount income">Bs. 350</span>
              </div>

              <div className="transaction-item expense">
                <div className="transaction-left">
                  <div className="transaction-icon expense">
                    <FaArrowDown />
                  </div>
                  <div className="transaction-info">
                    <p className="transaction-title">Materiales dentales - Proveedor XYZ</p>
                    <p className="transaction-date">21 Oct 2023</p>
                  </div>
                </div>
                <span className="transaction-amount expense">- Bs. 1,200</span>
              </div>

              <div className="transaction-item income">
                <div className="transaction-left">
                  <div className="transaction-icon income">
                    <FaArrowUp />
                  </div>
                  <div className="transaction-info">
                    <p className="transaction-title">Tratamiento conducto - María García</p>
                    <p className="transaction-date">20 Oct 2023</p>
                  </div>
                </div>
                <span className="transaction-amount income">Bs. 800</span>
              </div>

              <div className="transaction-item income">
                <div className="transaction-left">
                  <div className="transaction-icon income">
                    <FaArrowUp />
                  </div>
                  <div className="transaction-info">
                    <p className="transaction-title">Limpieza dental - Carlos Rodríguez</p>
                    <p className="transaction-date">19 Oct 2023</p>
                  </div>
                </div>
                <span className="transaction-amount income">Bs. 200</span>
              </div>

              <div className="transaction-item expense">
                <div className="transaction-left">
                  <div className="transaction-icon expense">
                    <FaArrowDown />
                  </div>
                  <div className="transaction-info">
                    <p className="transaction-title">Pago de servicios - Electricidad</p>
                    <p className="transaction-date">18 Oct 2023</p>
                  </div>
                </div>
                <span className="transaction-amount expense">- Bs. 350</span>
              </div>
            </div>
          </div>
        </div>

        {/* Income Report */}
        <div className="income-report">
          <div className="report-header">
            <div className="header-info">
              <h3 className="section-title">Reporte de Ingresos</h3>
              <p className="section-subtitle">Ingresos desglosados por categoría de tratamiento</p>
            </div>
            <div className="report-date">
              <FaCalendarAlt className="date-icon" />
              Octubre 2023
            </div>
          </div>

          <div className="categories-list">
            <div className="category-item">
              <div className="category-left">
                <div className="category-dot blue"></div>
                <span className="category-name">Ortodoncia</span>
              </div>
              <div className="category-right">
                <div className="progress-container">
                  <div className="progress-fill blue" style={{width: '66%'}}></div>
                </div>
                <span className="category-amount">Bs. 8,500</span>
                <span className="category-percentage">33%</span>
              </div>
            </div>

            <div className="category-item">
              <div className="category-left">
                <div className="category-dot teal"></div>
                <span className="category-name">Limpieza Dental</span>
              </div>
              <div className="category-right">
                <div className="progress-container">
                  <div className="progress-fill teal" style={{width: '50%'}}></div>
                </div>
                <span className="category-amount">Bs. 5,200</span>
                <span className="category-percentage">21%</span>
              </div>
            </div>

            <div className="category-item">
              <div className="category-left">
                <div className="category-dot purple"></div>
                <span className="category-name">Tratamientos de Conducto</span>
              </div>
              <div className="category-right">
                <div className="progress-container">
                  <div className="progress-fill purple" style={{width: '42%'}}></div>
                </div>
                <span className="category-amount">Bs. 4,800</span>
                <span className="category-percentage">19%</span>
              </div>
            </div>

            <div className="category-item">
              <div className="category-left">
                <div className="category-dot orange"></div>
                <span className="category-name">Extracciones</span>
              </div>
              <div className="category-right">
                <div className="progress-container">
                  <div className="progress-fill orange" style={{width: '33%'}}></div>
                </div>
                <span className="category-amount">Bs. 3,400</span>
                <span className="category-percentage">13%</span>
              </div>
            </div>

            <div className="category-item">
              <div className="category-left">
                <div className="category-dot red"></div>
                <span className="category-name">Implantes</span>
              </div>
              <div className="category-right">
                <div className="progress-container">
                  <div className="progress-fill red" style={{width: '25%'}}></div>
                </div>
                <span className="category-amount">Bs. 2,300</span>
                <span className="category-percentage">9%</span>
              </div>
            </div>

            <div className="category-item">
              <div className="category-left">
                <div className="category-dot gray"></div>
                <span className="category-name">Otros</span>
              </div>
              <div className="category-right">
                <div className="progress-container">
                  <div className="progress-fill gray" style={{width: '17%'}}></div>
                </div>
                <span className="category-amount">Bs. 1,120</span>
                <span className="category-percentage">5%</span>
              </div>
            </div>
          </div>

          <div className="total-section">
            <div className="total-content">
              <span className="total-label">Total de Ingresos</span>
              <span className="total-amount">Bs. 25,320</span>
            </div>
          </div>
        </div>

        {/* Functionality Cards */}
        <div className="functionality-section">
          <h2 className="functionality-title">Funcionalidades de Pago</h2>
          
          {/* Basic Functionalities */}
          <div className="basic-functionalities">
            <h3 className="subsection-title">
              <span className="title-dot"></span>
              Funcionalidades básicas
            </h3>
            <div className="function-cards-basic">
              <div className="function-card">
                <div className="function-content">
                  <div className="function-icon-container blue">
                    <FaCreditCard className="function-icon" />
                  </div>
                  <div className="function-info">
                    <h4 className="function-title">Registro de pagos manuales en caja</h4>
                    <ul className="function-list">
                      <li>• Registrar efectivo, transferencia o tarjeta desde la recepción</li>
                      <li>• Generar comprobante/factura digital automáticamente</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="function-card">
                <div className="function-content">
                  <div className="function-icon-container green">
                    <FaFileAlt className="function-icon" />
                  </div>
                  <div className="function-info">
                    <h4 className="function-title">Historial de pagos por paciente</h4>
                    <ul className="function-list">
                      <li>• Pagos realizados, deudas pendientes, planes de pago</li>
                      <li>• Descarga de facturas en PDF</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="payment-options">
            <h3 className="subsection-title">
              <span className="title-dot"></span>
              Opciones de pago para pacientes
            </h3>
            <div className="function-cards-grid">
              <div className="function-card">
                <div className="function-content">
                  <div className="function-icon-container purple">
                    <FaMobileAlt className="function-icon" />
                  </div>
                  <div className="function-info">
                    <h4 className="function-title">Pago online desde la app</h4>
                    <ul className="function-list">
                      <li>• Integrar pasarelas como Stripe, PayPal, MercadoPago, Square</li>
                      <li>• Pago con QR o billeteras móviles (Yape, Tigo Money, etc.)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="function-card">
                <div className="function-content">
                  <div className="function-icon-container orange">
                    <FaCalendarAlt className="function-icon" />
                  </div>
                  <div className="function-info">
                    <h4 className="function-title">Planes de pago y financiamiento</h4>
                    <ul className="function-list">
                      <li>• Fraccionar tratamientos costosos (ortodoncia, implantes)</li>
                      <li>• Recordatorios de cuotas</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="function-card">
                <div className="function-content">
                  <div className="function-icon-container teal">
                    <FaBolt className="function-icon" />
                  </div>
                  <div className="function-info">
                    <h4 className="function-title">Señales/adelantos online</h4>
                    <ul className="function-list">
                      <li>• Paciente paga una reserva antes de la cita</li>
                      <li>• Confirmación automática de citas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuentas;
