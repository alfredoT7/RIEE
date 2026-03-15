import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay una sesión guardada al cargar
  useEffect(() => {
    const token = authService.getToken();
    const storedUser = authService.getCurrentUser();
    
    if (token && storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const result = await authService.login(username, password);
      
      if (result.success) {
        setUser(result.user || { username });
        setIsAuthenticated(true);
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.message };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: 'Error de conexión con el servidor' };
    }
  };

  const register = async (dentistData) => {
    try {
      const result = await authService.register(dentistData);
      
      if (result.success) {
        setUser(result.user || { username: dentistData.username });
        setIsAuthenticated(true);
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.message, errors: result.errors };
      }
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: 'Error de conexión con el servidor' };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
