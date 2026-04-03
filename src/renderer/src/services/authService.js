import { api, publicApi, syncApiAuthToken } from '../api/Api';
import {
  clearStoredSession,
  getStoredToken,
  getStoredUser,
  setStoredSession
} from './authStorage';

const AUTH_BASE_PATH = '/api/v1/riee/auth';
const STATUS_PATH = '/api/v1/riee/status';

const clearStoredAuth = () => {
  clearStoredSession();
  syncApiAuthToken();
};

const notifyAuthLogout = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth:logout'));
  }
};

export const checkBackendStatus = async () => {
  try {
    const response = await api.get(STATUS_PATH, {
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

      const token = setStoredSession({
        token: userData.token,
        user
      });
      syncApiAuthToken();

      return {
        success: true,
        token,
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

      const token = setStoredSession({
        token: userData.token,
        user
      });
      syncApiAuthToken();

      return {
        success: true,
        token,
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
  return getStoredToken();
};
export const isAuthenticated = () => {
  return !!getToken();
};
export const getCurrentUser = () => {
  return getStoredUser();
};
