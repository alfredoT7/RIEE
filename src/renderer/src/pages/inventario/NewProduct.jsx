import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa'

const fieldClassName =
  'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#00b09b]/40 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500'

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
    { value: 'materiales', label: 'Materiales dentales' },
    { value: 'proteccion', label: 'Equipo de proteccion' },
    { value: 'medicamentos', label: 'Medicamentos' },
    { value: 'ortodoncia', label: 'Ortodoncia' },
    { value: 'instrumentos', label: 'Instrumentos' },
    { value: 'otros', label: 'Otros' }
  ]

  return (
    <section className="px-2 pb-6 pt-3">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
        <div className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/inventario')}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Nuevo producto</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Agrega un producto al inventario del consultorio.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/inventario')
          }}
          className="space-y-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['name', 'Nombre del producto *'],
              ['code', 'Codigo de barras'],
              ['supplier', 'Proveedor'],
              ['location', 'Ubicacion en almacen'],
              ['cost', 'Precio de costo'],
              ['price', 'Precio (Bs.) *'],
              ['stock', 'Stock actual *'],
              ['minStock', 'Stock minimo'],
              ['expiryDate', 'Fecha de vencimiento']
            ].map(([name, label]) => (
              <div key={name}>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {label}
                </label>
                <input
                  type={name === 'expiryDate' ? 'date' : ['cost', 'price', 'stock', 'minStock'].includes(name) ? 'number' : 'text'}
                  name={name}
                  value={formData[name]}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [name]: e.target.value }))}
                  className={fieldClassName}
                />
              </div>
            ))}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Categoria *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className={fieldClassName}
              >
                <option value="">Seleccionar categoria</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Descripcion
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/inventario')}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-300"
            >
              <FaTimes />
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#00b09b] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)]"
            >
              <FaSave />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default NewProduct
