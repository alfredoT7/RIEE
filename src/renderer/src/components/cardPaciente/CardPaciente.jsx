import React, { useState, useEffect } from 'react'
import ImagesApp from '../../assets/ImagesApp'

const CardPaciente = ({ ci, imagen, nombre, direccion, fechaNacimiento, numeroTelefonico }) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false)

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

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 transition-colors hover:border-[#00b09b]/20 hover:bg-[#fcfffe] md:flex-nowrap">
        <div className="basis-[80px] shrink-0 text-sm font-medium text-slate-600" title="Carnet de identidad">
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
          className="h-9 w-9 shrink-0 cursor-pointer rounded-full object-cover ring-2 ring-slate-100 transition-transform hover:scale-105"
        />

        <p className="min-w-[170px] flex-1 truncate text-sm font-medium text-slate-700">{nombre}</p>
        <p className="min-w-[180px] flex-1 truncate text-sm text-slate-500" title="Último tratamiento">
          {direccion}
        </p>
        <p className="basis-[90px] shrink-0 text-sm text-slate-500" title="Fecha nacimiento">
          {fechaNacimiento}
        </p>
        <p className="basis-[90px] shrink-0 text-sm text-slate-500" title="Número de contacto">
          {numeroTelefonico}
        </p>
      </div>

      {isImageExpanded && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm"
          onClick={() => setIsImageExpanded(false)}
        >
          <div
            className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-xl text-white transition-colors hover:bg-white hover:text-slate-800"
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
