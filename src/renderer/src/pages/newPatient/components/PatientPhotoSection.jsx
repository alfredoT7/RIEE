import React from 'react'
import ImagesApp from '../../../assets/ImagesApp'
import { FaCamera, FaTrash } from 'react-icons/fa'
import CollapsibleSection from './CollapsibleSection'

const PatientPhotoSection = ({
  fileInputRef,
  isSubmitting,
  onFileChange,
  onFileButtonClick,
  onRemoveImage,
  previewUrl,
  isOpen,
  onToggle
}) => (
  <CollapsibleSection icon={FaCamera} title="Fotografía del Paciente" isOpen={isOpen} onToggle={onToggle}>
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="relative h-44 w-44 overflow-hidden rounded-[28px] border-4 border-[#00b09b] bg-slate-100 shadow-[0_16px_35px_rgba(15,23,42,0.10)] dark:bg-slate-900">
        <img
          src={previewUrl || ImagesApp.defaultImage}
          alt="Vista previa del paciente"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-slate-950/50 to-transparent pb-4 pt-10 text-white">
          <FaCamera size={20} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={onFileChange} />

        <button
          type="button"
          onClick={onFileButtonClick}
          disabled={isSubmitting}
          className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#00b09b] px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,176,155,0.22)] transition-colors hover:bg-[#0f766e] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaCamera />
          Subir Foto
        </button>

        {previewUrl && (
          <button
            type="button"
            onClick={onRemoveImage}
            disabled={isSubmitting}
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-950/70"
          >
            <FaTrash />
            Quitar
          </button>
        )}
      </div>
    </div>
  </CollapsibleSection>
)

export default PatientPhotoSection
