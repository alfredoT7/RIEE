import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus, FaBox, FaExclamationTriangle, FaShoppingCart, FaTh, FaList, FaEdit, FaTrash } from 'react-icons/fa';

const Inventory = () => {
  const navigate = useNavigate();
  const [vistaGrid, setVistaGrid] = useState(true);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Categoría');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProduct = () => {
    navigate('/inventario/nuevo-producto');
  };

  const productos = [
    {
      id: 'INV001',
      nombre: 'Resina Z350',
      categoria: 'Materiales',
      stock: 24,
      precio: 'Bs. 250',
      caducidad: '10/12/2025',
      estado: 'Normal'
    },
    {
      id: 'INV002',
      nombre: 'Guantes de Látex (caja)',
      categoria: 'Protección',
      stock: 5,
      precio: 'Bs. 80',
      caducidad: '15/06/2024',
      estado: 'Bajo'
    },
    {
      id: 'INV003',
      nombre: 'Anestesia Lidocaína',
      categoria: 'Medicamentos',
      stock: 0,
      precio: 'Bs. 120',
      caducidad: '05/05/2024',
      estado: 'Agotado'
    },
    {
      id: 'INV004',
      nombre: 'Brackets Metálicos',
      categoria: 'Ortodoncia',
      stock: 150,
      precio: 'Bs. 12',
      caducidad: '-',
      estado: 'Normal'
    },
    {
      id: 'INV005',
      nombre: 'Alginato (kg)',
      categoria: 'Materiales',
      stock: 3,
      precio: 'Bs. 180',
      caducidad: '22/01/2024',
      estado: 'Por vencer'
    },
    {
      id: 'INV006',
      nombre: 'Fresas Diamante',
      categoria: 'Instrumentos',
      stock: 32,
      precio: 'Bs. 25',
      caducidad: '-',
      estado: 'Normal'
    }
  ];

  const getEstadoClass = (estado) => {
    switch(estado) {
      case 'Normal': return 'estado-normal';
      case 'Bajo': return 'estado-bajo';
      case 'Agotado': return 'estado-agotado';
      case 'Por vencer': return 'estado-por-vencer';
      default: return 'estado-default';
    }
  };

  const getCategoriaClass = (categoria) => {
    const classes = {
      'Materiales': 'categoria-materiales',
      'Protección': 'categoria-proteccion',
      'Medicamentos': 'categoria-medicamentos',
      'Ortodoncia': 'categoria-ortodoncia',
      'Instrumentos': 'categoria-instrumentos'
    };
    return classes[categoria] || 'categoria-default';
  };

  const filteredProducts = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoriaFiltro === 'Categoría' || producto.categoria === categoriaFiltro;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="inventory-container">
      <div className="inventory-content">
        {/* Header */}
        <div className="inventory-header">
          <div className="header-text">
            <h1>Inventario</h1>
            <p>Gestione el inventario de productos y materiales dentales</p>
          </div>
          <button className="btn-add-product" onClick={handleAddProduct}>
            <FaPlus />
            Agregar Producto
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total-products">
              <FaBox />
            </div>
            <div className="stat-content">
              <p className="stat-label">Total de Productos</p>
              <p className="stat-number">248</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon out-of-stock">
              <FaExclamationTriangle />
            </div>
            <div className="stat-content">
              <p className="stat-label">Productos Agotados</p>
              <p className="stat-number">12</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon expiring-soon">
              <FaShoppingCart />
            </div>
            <div className="stat-content">
              <p className="stat-label">Productos por Vencer</p>
              <p className="stat-number">28</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="inventory-controls">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="controls-group">
            <select 
              className="category-filter"
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              <option>Categoría</option>
              <option>Materiales</option>
              <option>Protección</option>
              <option>Medicamentos</option>
              <option>Ortodoncia</option>
              <option>Instrumentos</option>
            </select>
            
            <div className="view-toggle">
              <button
                onClick={() => setVistaGrid(true)}
                className={`view-btn ${vistaGrid ? 'active' : ''}`}
              >
                <FaTh />
              </button>
              <button
                onClick={() => setVistaGrid(false)}
                className={`view-btn ${!vistaGrid ? 'active' : ''}`}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>PRODUCTO</th>
                <th>CATEGORÍA</th>
                <th>STOCK</th>
                <th>PRECIO</th>
                <th>CADUCIDAD</th>
                <th>ESTADO</th>
                <th className="actions-header"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((producto, index) => (
                <tr key={producto.id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td className="product-cell">
                    <div className="product-info">
                      <div className="product-icon">
                        <FaBox />
                      </div>
                      <div className="product-details">
                        <p className="product-name">{producto.nombre}</p>
                        <p className="product-id">{producto.id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`category-badge ${getCategoriaClass(producto.categoria)}`}>
                      {producto.categoria}
                    </span>
                  </td>
                  <td>
                    <span className="stock-text">{producto.stock} unidades</span>
                  </td>
                  <td>
                    <span className="price-text">{producto.precio}</span>
                  </td>
                  <td>
                    <span className="expiry-text">{producto.caducidad}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${getEstadoClass(producto.estado)}`}>
                      {producto.estado}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button className="action-btn edit-btn">
                        <FaEdit />
                      </button>
                      <button className="action-btn delete-btn">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="inventory-footer">
          <p>Productos populares - Los productos más utilizados últimos 30 días</p>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
