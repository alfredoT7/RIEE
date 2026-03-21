import { publicApi } from '../api/Api';

const AUTH_BASE_PATH = '/api/v1/riee/auth';
const STATUS_PATH = '/api/v1/riee/status';

const clearStoredAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const notifyAuthLogout = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth:logout'));
  }
};

export const checkBackendStatus = async () => {
  try {
    const response = await publicApi.get(STATUS_PATH, {
      timeout: 3000,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
    });

    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Función para hacer login
export const login = async (username, password) => {
  try {
    const response = await publicApi.post(`${AUTH_BASE_PATH}/login`, {
      username,
      password
    });

    if (response.data.success && response.data.data.token) {
      const userData = response.data.data;
      const user = {
        id: userData.id,
        username,
        nombres: userData.nombres || '',
        apellidos: userData.apellidos || '',
        imagenUrl: userData.imagenUrl || ''
      };

      // Guardar el token en localStorage
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(user));
      return {
        success: true,
        token: userData.token,
        user,
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
      const userData = response.data.data;
      const user = {
        id: userData.id,
        username: dentistData.username,
        nombres: userData.nombres || dentistData.nombres || '',
        apellidos: userData.apellidos || dentistData.apellidos || '',
        imagenUrl: userData.imagenUrl || dentistData.imagenUrl || ''
      };

      // Guardar el token en localStorage
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(user));
      return {
        success: true,
        token: userData.token,
        user,
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
  clearStoredAuth();
  notifyAuthLogout();
};
export const getToken = () => {
  return localStorage.getItem('token');
};
export const isAuthenticated = () => {
  return !!getToken();
};
export const getCurrentUser = () => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    // Compatibilidad con formato antiguo donde solo se guardaba username
    return { username: storedUser };
  }
};
