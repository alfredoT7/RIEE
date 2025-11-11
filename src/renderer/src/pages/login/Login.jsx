import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import ImagesApp from '../../assets/ImagesApp';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.emailOrUsername || !formData.password) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    setIsLoading(true);

    try {
      // Llamar al método login del contexto que ahora usa el servicio real
      const result = await login(formData.emailOrUsername, formData.password);
      
      if (result.success) {
        toast.success(result.message || '¡Bienvenido a RIEE!');
        navigate('/');
      } else {
        toast.error(result.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      toast.error('Error de conexión con el servidor');
      console.error('Error en login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info('Inicio de sesión con Google próximamente');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-left" style={{ backgroundImage: `url(${ImagesApp.imglogin})` }}>
        <div className="login-image-overlay"></div>
        <div className="login-left-content">
          <img src={ImagesApp.rieeLogo} alt="RIEE Logo" className="login-brand-logo" />
          <p className="login-tagline">Sistema de Gestión Dental Profesional</p>
          <div className="login-features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Gestión Integral de Pacientes</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Control de Tratamientos</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Administración de Citas</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Gestión de Inventario</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="login-header">
            <h2>Iniciar Sesión</h2>
            <p>Bienvenido de nuevo, ingresa tus credenciales</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="emailOrUsername">
                <FaUser className="label-icon" />
                Usuario o Correo Electrónico
              </label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  placeholder="usuario@ejemplo.com"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FaLock className="label-icon" />
                Contraseña
              </label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Recordarme</span>
              </label>
              <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>

            <div className="divider">
              <span>O continúa con</span>
            </div>

            <button type="button" className="google-login-button" onClick={handleGoogleLogin}>
              <FcGoogle className="google-icon" />
              Iniciar sesión con Google
            </button>

            <div className="signup-link">
              <p>¿No tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Regístrate aquí</a></p>
            </div>
          </form>

          <div className="login-footer">
            <p>© 2025 RIEE - Sistema de Gestión Dental</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
