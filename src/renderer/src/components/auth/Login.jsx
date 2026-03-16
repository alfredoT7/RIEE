import React, { useState } from 'react';
import { FaGoogle, FaUser, FaLock, FaSpinner } from 'react-icons/fa';
import { login } from '../../services/authService';
import ImagesApp from '../../assets/ImagesApp';

const Login = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!identifier.trim() || !password.trim()) {
      setMessage('Por favor completa todos los campos.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('Iniciando sesión...');
    setMessageType('info');

    try {
      const result = await login(identifier, password);
      
      if (result.success) {
        setMessage('¡Login exitoso! Redirigiendo...');
        setMessageType('success');
        
        if (onLoginSuccess) {
          setTimeout(() => {
            onLoginSuccess(result.token);
          }, 1000);
        }
      } else {
        setMessage(result.message || 'Error al iniciar sesión');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error de conexión con el servidor');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setMessage('Función de Google Sign-In próximamente...');
    setMessageType('info');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-visual">
          <img
            src={ImagesApp.imglogin}
            alt="Dentista trabajando"
            className="visual-img"
          />
          <div className="visual-overlay">
            <img src={ImagesApp.rieeLogo} alt="RIEE Logo" className="logo-overlay" />
            <h2>Bienvenido a RIEE</h2>
            <p>Gestiona tu clínica dental de forma profesional.</p>
          </div>
        </div>

        <div className="login-form-side">
          <div className="form-header">
            <h3 className="form-title">Iniciar Sesión</h3>
            <p className="form-sub">Ingresa con tu usuario o correo electrónico</p>
          </div>

          <button className="btn-google" onClick={handleGoogleSignIn} type="button" disabled={loading}>
            <FaGoogle className="google-icon" /> Continuar con Google
          </button>

          <div className="divider"><span>o</span></div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon"><FaUser /></span>
                <input
                  type="text"
                  placeholder="Usuario o correo electrónico"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={loading}
                  required
                />
              </label>
            </div>

            <div className="input-group">
              <label className="input-label">
                <span className="label-icon"><FaLock /></span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </label>
            </div>

            <div className="form-actions">
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <FaSpinner className="spinner" /> Ingresando...
                  </>
                ) : (
                  'Ingresar'
                )}
              </button>
            </div>

            <a className="forgot-link" href="#" onClick={(e) => e.preventDefault()}>
              ¿Olvidaste tu contraseña?
            </a>
          </form>

          {message && (
            <div className={`form-message ${messageType}`}>
              {message}
            </div>
          )}

          <p className="register-cta">
            ¿No tienes cuenta? <a href="#" className="link-register" onClick={(e) => e.preventDefault()}>Regístrate</a>
          </p>

          <div className="form-footer">
            <small>🔒 Tu privacidad y seguridad son nuestra prioridad</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
