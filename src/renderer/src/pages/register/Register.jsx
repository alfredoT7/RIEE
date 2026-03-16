import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaGraduationCap,
  FaIdCard,
  FaImage,
  FaLock,
  FaPhone,
  FaUniversity,
  FaUser,
  FaUserMd
} from 'react-icons/fa'
import { useRegister } from './useRegister'
import ImagesApp from '../../assets/ImagesApp'

const inputClassName =
  'w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#00b09b]/40 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500'

const labelClassName = 'mb-4 block text-sm font-semibold text-slate-700 dark:text-slate-200'
const errorClassName = 'mt-2 text-xs font-medium text-rose-500'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const {
    currentStep,
    totalSteps,
    formData,
    errors,
    isLoading,
    specialities,
    loadingSpecialities,
    handleChange,
    handleCheckboxChange,
    handleNext,
    handlePrev,
    handleSubmit
  } = useRegister()

  const stepLabels = ['Datos personales', 'Info profesional', 'Especialidades', 'Contrasena']

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      setSelectedImage(null)
      setImagePreview(null)
      return
    }

    setSelectedImage(file)

    const reader = new FileReader()

    reader.onloadend = () => {
      setImagePreview(typeof reader.result === 'string' ? reader.result : null)
    }

    reader.readAsDataURL(file)
  }

  const renderInput = ({ id, name, label, placeholder, icon: Icon, type = 'text', value, error }) => (
    <div className="space-y-4">
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`${inputClassName} ${error ? 'border-rose-300 focus:border-rose-400' : ''}`}
        />
      </div>
      {error && <p className={errorClassName}>{error}</p>}
    </div>
  )

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/login')}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] transition-colors hover:text-[#0b5f59] dark:text-[#5ce1d4] dark:hover:text-[#8ce9dd]"
      >
        <FaArrowLeft className="text-base" />
        Volver al inicio de sesion
      </button>

      <div className="mb-10">
        <h2 className="text-4xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">
          Crear cuenta
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-500 dark:text-slate-400">
          Completa tu registro profesional para acceder al sistema.
        </p>
      </div>

      <div className="mb-8 rounded-[28px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex items-center justify-between gap-2">
          {stepLabels.map((step, index) => {
            const stepNumber = index + 1
            const isActive = currentStep === stepNumber
            const isCompleted = currentStep > stepNumber

            return (
              <div key={step} className="flex flex-1 items-center">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                      isCompleted || isActive
                        ? 'border-[#00b09b] bg-[#00b09b] text-white'
                        : 'border-slate-300 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400'
                    }`}
                  >
                    {isCompleted ? <FaCheck /> : stepNumber}
                  </div>
                  <span
                    className={`mt-2 text-[11px] font-medium ${
                      isActive
                        ? 'text-[#0f766e] dark:text-[#5ce1d4]'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {stepNumber < totalSteps && (
                  <div
                    className={`mx-2 mb-5 h-px flex-1 ${
                      currentStep > stepNumber ? 'bg-[#00b09b]' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">
          {currentStep === 1 && 'Datos personales'}
          {currentStep === 2 && 'Informacion profesional'}
          {currentStep === 3 && 'Especialidades e imagen'}
          {currentStep === 4 && 'Configurar contrasena'}
        </h3>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Paso {currentStep} de {totalSteps}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-10">
        {currentStep === 1 && (
          <div className="grid gap-6">
            {renderInput({
              id: 'nombres',
              name: 'nombres',
              label: 'Nombres *',
              placeholder: 'Juan Carlos',
              icon: FaUser,
              value: formData.nombres,
              error: errors.nombres
            })}
            {renderInput({
              id: 'apellidos',
              name: 'apellidos',
              label: 'Apellidos *',
              placeholder: 'Perez Gonzales',
              icon: FaUser,
              value: formData.apellidos,
              error: errors.apellidos
            })}
            {renderInput({
              id: 'email',
              name: 'email',
              label: 'Email *',
              placeholder: 'juan.perez@dental.com',
              icon: FaEnvelope,
              type: 'email',
              value: formData.email,
              error: errors.email
            })}
            {renderInput({
              id: 'username',
              name: 'username',
              label: 'Usuario *',
              placeholder: 'juanperez',
              icon: FaUserMd,
              value: formData.username,
              error: errors.username
            })}
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid gap-6">
            {renderInput({
              id: 'telefono',
              name: 'telefono',
              label: 'Telefono *',
              placeholder: '71234567',
              icon: FaPhone,
              type: 'number',
              value: formData.telefono,
              error: errors.telefono
            })}
            {renderInput({
              id: 'ciDentista',
              name: 'ciDentista',
              label: 'CI dentista *',
              placeholder: '7654321',
              icon: FaIdCard,
              type: 'number',
              value: formData.ciDentista,
              error: errors.ciDentista
            })}
            {renderInput({
              id: 'universidad',
              name: 'universidad',
              label: 'Universidad *',
              placeholder: 'Universidad Mayor de San Andres',
              icon: FaUniversity,
              value: formData.universidad,
              error: errors.universidad
            })}
            {renderInput({
              id: 'promocion',
              name: 'promocion',
              label: 'Promocion *',
              placeholder: '2018',
              icon: FaGraduationCap,
              type: 'number',
              value: formData.promocion,
              error: errors.promocion
            })}
          </div>
        )}

        {currentStep === 3 && (
          <div className="grid gap-12">
            <div className="grid gap-6">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Especialidades * <span className="text-slate-400">(Selecciona al menos una)</span>
              </label>
              {loadingSpecialities ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  Cargando especialidades...
                </div>
              ) : specialities.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  No se encontraron especialidades disponibles.
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  {specialities.map((esp) => {
                    const isSelected = formData.especialidadIds.includes(esp.id)

                    return (
                      <label
                        key={esp.id}
                        className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition-colors ${
                          isSelected
                            ? 'border-[#00b09b] bg-[#00b09b]/10 text-[#0f766e] dark:text-[#5ce1d4]'
                            : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleCheckboxChange(esp.id)}
                            className="rounded border-slate-300"
                          />
                          <span className="text-sm font-medium">{esp.nombre}</span>
                        </div>
                        {isSelected && <FaCheck className="text-sm" />}
                      </label>
                    )
                  })}
                </div>
              )}
              {errors.especialidadIds && <p className="mt-4 text-xs font-medium text-rose-500">{errors.especialidadIds}</p>}
            </div>

            <div className="grid gap-6">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Imagen de perfil
              </label>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                  <img
                    src={imagePreview || ImagesApp.defaultImage}
                    alt="Vista previa"
                    className="h-full w-full object-cover"
                    onError={() => setImagePreview(null)}
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="profileImage"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                  >
                    <FaImage />
                    Seleccionar imagen
                  </label>
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {selectedImage && (
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                      {selectedImage.name}
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                Por ahora esta imagen solo se muestra en frontend y aun no se envia al backend.
              </p>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="grid gap-12">
            <div className="grid gap-6">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Contrasena *
              </label>
              <div className="relative">
                <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimo 6 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClassName} ${errors.password ? 'border-rose-300 focus:border-rose-400' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="mt-4 text-xs font-medium text-rose-500">{errors.password}</p>}
            </div>

            <div className="grid gap-6">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Confirmar contrasena *
              </label>
              <div className="relative">
                <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Repite tu contrasena"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`${inputClassName} ${errors.confirmPassword ? 'border-rose-300 focus:border-rose-400' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-4 text-xs font-medium text-rose-500">{errors.confirmPassword}</p>}
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/50">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                La contrasena debe tener:
              </p>
              <div
                className={`mt-3 flex items-center gap-2 text-sm ${
                  formData.password.length >= 6
                    ? 'text-emerald-600'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <FaCheck />
                <span>Minimo 6 caracteres</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-950"
            >
              <FaArrowLeft />
              Anterior
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#00b09b] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-transform hover:-translate-y-0.5"
            >
              Siguiente
              <FaArrowRight />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#00b09b] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
            >
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
              {!isLoading && <FaCheck />}
            </button>
          )}
        </div>

        <p className="pt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Ya tienes una cuenta?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-semibold text-[#0f766e] transition-colors hover:text-[#0b5f59] dark:text-[#5ce1d4] dark:hover:text-[#8ce9dd]"
          >
            Inicia sesion aqui
          </button>
        </p>
      </form>
    </div>
  )
}

export default Register
