import axios from 'axios';

// URL directa al backend
const baseURL = "http://localhost:8080";

// Crear instancia de axios con configuración base
const api = axios.create({
    baseURL: baseURL,
    responseType: 'json',
    timeout: 10000
});

// Interceptor para agregar el token JWT a todas las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Puedes redirigir al login aquí si usas react-router
            console.log('Sesión expirada');
        }
        return Promise.reject(error);
    }
);

// API pública sin autenticación
const publicApi = axios.create({
    baseURL: baseURL,
    responseType: 'json',
    timeout: 10000
});

export const registerPatient = (data) => api.post('/api/v1/riee/patients', data);
export const getPatientWithPagination = (pageNumber) => api.get(`/api/pacientes/all/${pageNumber}`);
export const getAllPatients = () => api.get('/api/v1/riee/patients');
export const getAllTreatments = () => api.get('/api/v1/riee/treatments');
export const registerTreatment = (data) => api.post('/api/v1/riee/treatments', data);
export const registerAppointment = (data) => api.post('/api/v1/riee/appointments', data);
export const getAllAppointments = () => api.get('/api/v1/riee/appointments');
export const getAllSpecialities = () => publicApi.get('/api/v1/riee/specialities');
export const registerDentist = (data) => publicApi.post('/api/v1/riee/dentists', data);