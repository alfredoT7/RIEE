import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'
import { useAuth } from '../../context/AuthContext'
import { consumeAuthNotice } from '../../services/authStorage'

const inputClassName =
  'w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#00b09b]/40 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  })

  useEffect(() => {
    const authNotice = consumeAuthNotice()

    if (authNotice) {
      toast.error(authNotice)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.emailOrUsername || !formData.password) {
      toast.error('Por favor, completa todos los campos')
      return
    }

    setIsLoading(true)

    try {
      const result = await login(formData.emailOrUsername, formData.password)

      if (result.success) {
        toast.success(result.message || 'Bienvenido a RIEE')
        navigate('/')
      } else {
        setFormData((prev) => ({ ...prev, password: '' }))
        setShowPassword(false)
        toast.error(result.error || 'Credenciales incorrectas')
      }
    } catch (error) {
      console.error('Error en login:', error)
      toast.error('Error de conexion con el servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-14">
        <h2 className="text-4xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">
          Iniciar sesion
        </h2>
        <p className="mt-5 max-w-lg text-base leading-8 text-slate-500 dark:text-slate-400">
          Ingresa con tu usuario o correo para acceder al panel del consultorio.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Usuario o correo electronico
          </label>
          <div className="relative">
            <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, emailOrUsername: e.target.value }))
              }
              className={inputClassName}
              placeholder="usuario@ejemplo.com"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Contrasena
          </label>
          <div className="relative">
            <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              className={inputClassName}
              placeholder="Ingresa tu contrasena"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-1 text-sm">
          <label className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <input type="checkbox" className="rounded border-slate-300 text-[#00b09b]" />
            <span>Recordarme</span>
          </label>
          <button
            type="button"
            className="cursor-pointer font-medium text-[#0f766e] transition-colors hover:text-[#0b5f59] dark:text-[#5ce1d4] dark:hover:text-[#8ce9dd]"
          >
            Olvidaste tu contrasena?
          </button>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer rounded-2xl bg-[#00b09b] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,176,155,0.25)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Ingresando...' : 'Iniciar sesion'}
          </button>
        </div>

        <div className="relative flex items-center">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          <span className="px-4 text-sm text-slate-400 dark:text-slate-500">o continua con</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <button
          type="button"
          onClick={() => toast.info('Inicio de sesion con Google proximamente')}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          <FcGoogle className="text-lg" />
          Google
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          No tienes una cuenta?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="cursor-pointer font-semibold text-[#0f766e] transition-colors hover:text-[#0b5f59] dark:text-[#5ce1d4] dark:hover:text-[#8ce9dd]"
          >
            Registrate aqui
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login
