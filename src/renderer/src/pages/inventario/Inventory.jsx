import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaPlus, FaBox, FaExclamationTriangle, FaShoppingCart, FaEdit, FaTrash } from 'react-icons/fa'

const products = [
  { id: 'INV001', nombre: 'Resina Z350', categoria: 'Materiales', stock: 24, precio: 'Bs. 250', caducidad: '10/12/2025', estado: 'Normal' },
  { id: 'INV002', nombre: 'Guantes de latex', categoria: 'Proteccion', stock: 5, precio: 'Bs. 80', caducidad: '15/06/2024', estado: 'Bajo' },
  { id: 'INV003', nombre: 'Anestesia Lidocaina', categoria: 'Medicamentos', stock: 0, precio: 'Bs. 120', caducidad: '05/05/2024', estado: 'Agotado' },
  { id: 'INV004', nombre: 'Brackets metalicos', categoria: 'Ortodoncia', stock: 150, precio: 'Bs. 12', caducidad: '-', estado: 'Normal' },
  { id: 'INV005', nombre: 'Alginato', categoria: 'Materiales', stock: 3, precio: 'Bs. 180', caducidad: '22/01/2024', estado: 'Por vencer' }
]

const Inventory = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoriaFiltro === 'Todas' || product.categoria === categoriaFiltro

    return matchesSearch && matchesCategory
  })

  return (
    <section className="px-2 pb-6 pt-3">
      <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Inventario</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Gestiona productos y materiales del consultorio.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/inventario/nuevo-producto')}
            className="inline-flex w-fit items-center gap-2 rounded-2xl bg-[#00b09b] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)]"
          >
            <FaPlus />
            Agregar producto
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ['Total de productos', '248', FaBox, 'text-sky-500'],
            ['Productos agotados', '12', FaExclamationTriangle, 'text-rose-500'],
            ['Por vencer', '28', FaShoppingCart, 'text-amber-500']
          ].map(([title, value, Icon, color]) => (
            <div key={title} className="rounded-[22px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-800 dark:text-slate-100">{value}</p>
                </div>
                <Icon className={`text-2xl ${color}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xl">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          >
            {['Todas', 'Materiales', 'Proteccion', 'Medicamentos', 'Ortodoncia'].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-slate-200 dark:border-slate-800">
          <div className="hidden grid-cols-[2fr_1fr_110px_110px_130px_130px_96px] gap-3 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 md:grid dark:bg-slate-900 dark:text-slate-400">
            <span>Producto</span>
            <span>Categoria</span>
            <span>Stock</span>
            <span>Precio</span>
            <span>Caducidad</span>
            <span>Estado</span>
            <span>Acciones</span>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredProducts.map((product) => (
              <div key={product.id} className="grid gap-3 bg-white px-4 py-4 md:grid-cols-[2fr_1fr_110px_110px_130px_130px_96px] dark:bg-slate-950">
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{product.nombre}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{product.id}</p>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-300">{product.categoria}</span>
                <span className="text-sm text-slate-600 dark:text-slate-300">{product.stock}</span>
                <span className="text-sm text-slate-600 dark:text-slate-300">{product.precio}</span>
                <span className="text-sm text-slate-600 dark:text-slate-300">{product.caducidad}</span>
                <span className="text-sm text-slate-600 dark:text-slate-300">{product.estado}</span>
                <div className="flex gap-2">
                  <button type="button" className="rounded-xl border border-slate-200 p-2 text-slate-500 dark:border-slate-800 dark:text-slate-300">
                    <FaEdit />
                  </button>
                  <button type="button" className="rounded-xl border border-slate-200 p-2 text-rose-500 dark:border-slate-800">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Inventory
