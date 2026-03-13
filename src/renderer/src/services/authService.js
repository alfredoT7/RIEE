import { publicApi } from '../api/Api';

const AUTH_BASE_PATH = '/api/v1/riee/auth';

// Función para hacer login
export const login = async (username, password) => {
  try {
    const response = await publicApi.post(`${AUTH_BASE_PATH}/login`, {
      username,
      password
    });

    if (response.data.success && response.data.data.token) {
      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', username);
      return {
        success: true,
        token: response.data.data.token,
        message: response.data.message
      };
    }
    
    return {
      success: false,
      message: response.data.message || 'Error en el login'
    };
  } catch (error) {
    console.error('Error en login:', error);
    const isTimeout = error.code === 'ECONNABORTED';
    return {
      success: false,
      message: error.response?.data?.message || (isTimeout
        ? 'El servidor tardó demasiado en responder. Intenta nuevamente.'
        : 'Error de conexión con el servidor')
    };
  }
};

// Función para registrar un dentista
export const register = async (dentistData) => {
  try {
    const response = await publicApi.post(`${AUTH_BASE_PATH}/register`, dentistData);

    if (response.data.success && response.data.data.token) {
      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', dentistData.username);
      return {
        success: true,
        token: response.data.data.token,
        message: response.data.message
      };
    }
    
    return {
      success: false,
      message: response.data.message || 'Error en el registro'
    };
  } catch (error) {
    console.error('Error en registro:', error);
    const isTimeout = error.code === 'ECONNABORTED';
    return {
      success: false,
      message: error.response?.data?.message || (isTimeout
        ? 'El servidor tardó demasiado en responder. Intenta nuevamente.'
        : 'Error de conexión con el servidor'),
      errors: error.response?.data?.errors
    };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
export const getToken = () => {
  return localStorage.getItem('token');
};
export const isAuthenticated = () => {
  return !!getToken();
};
export const getCurrentUser = () => {
  return localStorage.getItem('user');
};
