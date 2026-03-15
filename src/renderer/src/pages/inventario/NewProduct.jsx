import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa'

const NewProduct = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: '',
    price: '',
    cost: '',
    stock: '',
    minStock: '',
    expiryDate: '',
    supplier: '',
    description: '',
    location: ''
  })

  const categories = [
    { value: 'materiales', label: 'Materiales Dentales' },
    { value: 'proteccion', label: 'Equipo de Protección' },
    { value: 'medicamentos', label: 'Medicamentos' },
    { value: 'ortodoncia', label: 'Ortodoncia' },
    { value: 'instrumentos', label: 'Instrumentos' },
    { value: 'otros', label: 'Otros' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí implementarías la lógica para guardar el producto
    console.log('Producto a guardar:', formData)
    // Simular guardado exitoso
    alert('Producto agregado exitosamente')
    navigate('/inventario')
  }

  const handleCancel = () => {
    navigate('/inventario')
  }

  return (
    <div className="new-product-container">
      <div className="new-product-header">
        <div className="header-content">
          <button 
            className="btn-back"
            onClick={handleCancel}
            type="button"
          >
            <FaArrowLeft />
          </button>
          <div className="header-text">
            <h1>Nuevo Producto</h1>
            <p>Agregar producto al inventario</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="new-product-form">
        <div className="form-content">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Nombre del Producto *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Resina Z350, Guantes de látex..."
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="code">Código de Barras</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Código de barras del producto"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="supplier">Proveedor</label>
              <input
                type="text"
                id="supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                placeholder="Seleccionar proveedor"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cost">Precio de Costo</label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Precio (Bs.) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock Actual *</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="minStock">Stock Mínimo</label>
              <input
                type="number"
                id="minStock"
                name="minStock"
                value={formData.minStock}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiryDate">Fecha de Vencimiento</label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Ubicación en Almacén</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Ej: Estante A-3, Refrigerador 1..."
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descripción detallada del producto..."
                rows="3"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={handleCancel}
          >
            <FaTimes />
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn-primary"
          >
            <FaSave />
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewProduct
