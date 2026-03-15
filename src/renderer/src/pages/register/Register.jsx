import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaIdCard, FaUniversity, FaGraduationCap, FaEye, FaEyeSlash, FaUserMd, FaImage, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';
import ImagesApp from '../../assets/ImagesApp';
import { useRegister } from './useRegister';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Usar el hook personalizado
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
  } = useRegister();

  return (
    <div className="register-container">
      <div className="register-left" style={{ backgroundImage: `url(${ImagesApp.imglogin})` }}>
        <div className="register-image-overlay"></div>
        <div className="register-left-content">
          <img src={ImagesApp.rieeLogo} alt="RIEE Logo" className="register-brand-logo" />
          <p className="register-tagline">Únete a nuestra plataforma de gestión dental</p>
          <div className="register-features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Gestión Completa de Pacientes</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Sistema de Citas Inteligente</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Control de Tratamientos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="register-right">
        <div className="register-form-container">
          <div className="progress-container">
            <div className="progress-steps">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="progress-step-wrapper">
                  <div className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
                    {currentStep > step ? <FaCheck /> : step}
                  </div>
                  {step < 4 && <div className={`progress-line ${currentStep > step ? 'completed' : ''}`}></div>}
                </div>
              ))}
            </div>
            <div className="progress-labels">
              <span className={currentStep === 1 ? 'active' : ''}>Datos Personales</span>
              <span className={currentStep === 2 ? 'active' : ''}>Info Profesional</span>
              <span className={currentStep === 3 ? 'active' : ''}>Especialidades</span>
              <span className={currentStep === 4 ? 'active' : ''}>Contraseña</span>
            </div>
          </div>

          <div className="register-header">
            <h2>
              {currentStep === 1 && 'Datos Personales'}
              {currentStep === 2 && 'Información Profesional'}
              {currentStep === 3 && 'Especialidades e Imagen'}
              {currentStep === 4 && 'Configurar Contraseña'}
            </h2>
            <p>Paso {currentStep} de {totalSteps}</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form" noValidate>
            {currentStep === 1 && (
              <div className="form-step">
                <div className="register-form-group">
                  <label htmlFor="nombres">
                    <FaUser className="label-icon" />
                    Nombres *
                  </label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      id="nombres"
                      name="nombres"
                      placeholder="Juan Carlos"
                      value={formData.nombres}
                      onChange={handleChange}
                      className={errors.nombres ? 'error' : ''}
                    />
                  </div>
                  {errors.nombres && <span className="error-message">{errors.nombres}</span>}
                </div>

                <div className="register-form-group">
                  <label htmlFor="apellidos">
                    <FaUser className="label-icon" />
                    Apellidos *
                  </label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      placeholder="Pérez Gonzales"
                      value={formData.apellidos}
                      onChange={handleChange}
                      className={errors.apellidos ? 'error' : ''}
                    />
                  </div>
                  {errors.apellidos && <span className="error-message">{errors.apellidos}</span>}
                </div>

                <div className="register-form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="label-icon" />
                    Email *
                  </label>
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="juan.perez@dental.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="register-form-group">
                  <label htmlFor="username">
                    <FaUserMd className="label-icon" />
                    Usuario *
                  </label>
                  <div className="input-wrapper">
                    <FaUserMd className="input-icon" />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="juanperez"
                      value={formData.username}
                      onChange={handleChange}
                      className={errors.username ? 'error' : ''}
                    />
                  </div>
                  {errors.username && <span className="error-message">{errors.username}</span>}
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="form-step">
                <div className="register-form-group">
                  <label htmlFor="telefono">
                    <FaPhone className="label-icon" />
                    Teléfono *
                  </label>
                  <div className="input-wrapper">
                    <FaPhone className="input-icon" />
                    <input
                      type="number"
                      id="telefono"
                      name="telefono"
                      placeholder="71234567"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={errors.telefono ? 'error' : ''}
                    />
                  </div>
                  {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                </div>

                <div className="register-form-group">
                  <label htmlFor="ciDentista">
                    <FaIdCard className="label-icon" />
                    CI Dentista *
                  </label>
                  <div className="input-wrapper">
                    <FaIdCard className="input-icon" />
                    <input
                      type="number"
                      id="ciDentista"
                      name="ciDentista"
                      placeholder="7654321"
                      value={formData.ciDentista}
                      onChange={handleChange}
                      className={errors.ciDentista ? 'error' : ''}
                    />
                  </div>
                  {errors.ciDentista && <span className="error-message">{errors.ciDentista}</span>}
                </div>

                <div className="register-form-group">
                  <label htmlFor="universidad">
                    <FaUniversity className="label-icon" />
                    Universidad *
                  </label>
                  <div className="input-wrapper">
                    <FaUniversity className="input-icon" />
                    <input
                      type="text"
                      id="universidad"
                      name="universidad"
                      placeholder="Universidad Mayor de San Andrés"
                      value={formData.universidad}
                      onChange={handleChange}
                      className={errors.universidad ? 'error' : ''}
                    />
                  </div>
                  {errors.universidad && <span className="error-message">{errors.universidad}</span>}
                </div>

                <div className="register-form-group">
                  <label htmlFor="promocion">
                    <FaGraduationCap className="label-icon" />
                    Promoción *
                  </label>
                  <div className="input-wrapper">
                    <FaGraduationCap className="input-icon" />
                    <input
                      type="number"
                      id="promocion"
                      name="promocion"
                      placeholder="2018"
                      value={formData.promocion}
                      onChange={handleChange}
                      className={errors.promocion ? 'error' : ''}
                    />
                  </div>
                  {errors.promocion && <span className="error-message">{errors.promocion}</span>}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-step">
                <div className="register-form-group">
                  <label className="main-label">
                    <FaUserMd className="label-icon" />
                    Especialidades * 
                    <span className="label-hint">(Selecciona al menos una)</span>
                  </label>
                  {loadingSpecialities ? (
                    <div className="loading-specialities">
                      <div className="loading-spinner-small"></div>
                      <span>Cargando especialidades...</span>
                    </div>
                  ) : specialities.length === 0 ? (
                    <div className="no-specialities">
                      <p>No se encontraron especialidades disponibles</p>
                    </div>
                  ) : (
                    <div className="especialidades-grid">
                      {specialities.map(esp => (
                        <label key={esp.id} className={`especialidad-item ${formData.especialidadIds.includes(esp.id) ? 'selected' : ''}`}>
                          <input
                            type="checkbox"
                            checked={formData.especialidadIds.includes(esp.id)}
                            onChange={() => handleCheckboxChange(esp.id)}
                          />
                          <span className="especialidad-name">{esp.nombre}</span>
                          {formData.especialidadIds.includes(esp.id) && (
                            <FaCheck className="check-icon" />
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                  {errors.especialidadIds && <span className="error-message">{errors.especialidadIds}</span>}
                </div>

                <div className="register-form-group">
                  <label htmlFor="imagenUrl">
                    <FaImage className="label-icon" />
                    URL de Imagen (Opcional)
                  </label>
                  <div className="input-wrapper">
                    <FaImage className="input-icon" />
                    <input
                      type="url"
                      id="imagenUrl"
                      name="imagenUrl"
                      placeholder="https://example.com/photos/juan.jpg"
                      value={formData.imagenUrl}
                      onChange={handleChange}
                    />
                  </div>
                  <small className="field-hint">Puedes dejarlo vacío y subirlo después</small>
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div className="form-step">
                <div className="register-form-group">
                  <label htmlFor="password">
                    <FaLock className="label-icon" />
                    Contraseña *
                  </label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Mínimo 6 caracteres"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="register-form-group">
                  <label htmlFor="confirmPassword">
                    <FaLock className="label-icon" />
                    Confirmar Contraseña *
                  </label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Repite tu contraseña"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="password-requirements">
                  <p>La contraseña debe tener:</p>
                  <ul>
                    <li className={formData.password.length >= 6 ? 'valid' : ''}>
                      <FaCheck /> Mínimo 6 caracteres
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" onClick={handlePrev} className="btn-prev">
                  <FaArrowLeft /> Anterior
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button type="button" onClick={handleNext} className="btn-next">
                  Siguiente <FaArrowRight />
                </button>
              ) : (
                <button type="submit" className="btn-submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <>
                      <FaCheck /> Crear Cuenta
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="login-link">
              <p>¿Ya tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Inicia sesión aquí</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
