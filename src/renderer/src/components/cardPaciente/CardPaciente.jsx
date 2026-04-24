import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye } from 'lucide-react'
import ImagesApp from '../../assets/ImagesApp'

const CardPaciente = ({ ci, imagen, nombre, direccion, fechaNacimiento, numeroTelefonico, patient }) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsImageExpanded(false)
      }
    }

    if (isImageExpanded) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isImageExpanded])

  const imageSrc = imagen?.startsWith('http') ? imagen : ImagesApp.defaultImage

  const handleOpenDetails = () => {
    const patientId = patient?.id || patient?.ciPaciente || ci

    if (!patientId) {
      return
    }

    navigate(`/patient/${patientId}`, {
      state: { patient }
    })
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 transition-colors hover:border-[#00b09b]/20 hover:bg-[#fcfffe] dark:border-slate-800 dark:bg-slate-950 dark:hover:border-[#5ce1d4]/20 dark:hover:bg-slate-900 md:grid md:grid-cols-[80px_36px_minmax(170px,1fr)_minmax(180px,1fr)_120px_130px_36px] md:items-center md:gap-2">
        <div
          className="basis-[80px] shrink-0 text-sm font-medium text-slate-600 dark:text-slate-300"
          title="Carnet de identidad"
        >
          {ci}
        </div>

        <img
          title="Imagen del paciente"
          src={imageSrc}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = ImagesApp.defaultImage
          }}
          alt={nombre || 'Imagen no disponible'}
          onClick={() => setIsImageExpanded(true)}
          className="h-9 w-9 shrink-0 cursor-pointer rounded-full object-cover ring-2 ring-slate-100 transition-transform hover:scale-105 dark:ring-slate-800"
        />

        <button
          type="button"
          onClick={handleOpenDetails}
          title="Ver ficha del paciente"
          className="min-w-[170px] flex-1 truncate text-left text-sm font-medium text-slate-700 transition hover:cursor-pointer hover:underline dark:text-slate-100 md:min-w-0"
        >
          {nombre}
        </button>
        <p
          className="min-w-[180px] flex-1 truncate text-sm text-slate-500 dark:text-slate-400 md:min-w-0"
          title="Último tratamiento"
        >
          {direccion}
        </p>
        <p
          className="basis-[120px] shrink-0 text-sm text-slate-500 dark:text-slate-400"
          title="Fecha nacimiento"
        >
          {fechaNacimiento}
        </p>
        <p
          className="basis-[130px] shrink-0 text-sm text-slate-500 dark:text-slate-400"
          title="Número de contacto"
        >
          {numeroTelefonico}
        </p>
        <div className="flex basis-[36px] shrink-0 items-center justify-end">
          <button
            type="button"
            onClick={handleOpenDetails}
            title="Ver detalles del paciente"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-sky-500/40 dark:hover:bg-sky-500/10 dark:hover:text-sky-300"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {isImageExpanded && (
        <div
          className="fixed inset-0 z-[1000] flex cursor-pointer items-center justify-center bg-black/75 p-5 backdrop-blur-sm"
          onClick={() => setIsImageExpanded(false)}
        >
          <div
            className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -right-4 -top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/70 text-xl text-white transition-colors hover:bg-white hover:text-slate-800"
              onClick={() => setIsImageExpanded(false)}
            >
              ×
            </button>
            <img
              src={imageSrc}
              alt={nombre || 'Imagen no disponible'}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = ImagesApp.defaultImage
              }}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default CardPaciente
