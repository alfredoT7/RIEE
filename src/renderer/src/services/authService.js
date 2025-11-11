import axios from 'axios';

// URL directa al backend - el proxy no funcionó como esperado
const API_URL = 'http://localhost:8080/api/v1/riee/auth';

// Función para hacer login
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
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
    return {
      success: false,
      message: error.response?.data?.message || 'Error de conexión con el servidor'
    };
  }
};

// Función para registrar un dentista
export const register = async (dentistData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, dentistData);

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
    return {
      success: false,
      message: error.response?.data?.message || 'Error de conexión con el servidor',
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
