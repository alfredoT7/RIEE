import axios from 'axios';

// URL directa al backend
const baseURL = "http://localhost:8080";
const REQUEST_TIMEOUT = 10000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const clearAuthSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth:logout'));
    }
};

const shouldRetryRequest = (error) => {
    const status = error.response?.status;
    const isTimeout = error.code === 'ECONNABORTED';
    const isNetworkError = !error.response;
    const isRetryableStatus = [500, 502, 503, 504].includes(status);

    return isTimeout || isNetworkError || isRetryableStatus;
};

const attachRetryInterceptor = (client) => {
    client.interceptors.response.use(
        (response) => response,
        async (error) => {
            const config = error.config;

            if (!config || !shouldRetryRequest(error)) {
                return Promise.reject(error);
            }

            config.__retryCount = config.__retryCount ?? 0;

            if (config.__retryCount >= MAX_RETRIES) {
                return Promise.reject(error);
            }

            config.__retryCount += 1;
            const delay = RETRY_DELAY_MS * (2 ** (config.__retryCount - 1));

            await sleep(delay);

            return client(config);
        }
    );
};

// Crear instancia de axios con configuración base
const api = axios.create({
    baseURL: baseURL,
    responseType: 'json',
    timeout: REQUEST_TIMEOUT
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
        const status = error.response?.status;
        const backendUnavailable = !error.response || [502, 503, 504].includes(status);

        if (status === 401) {
            clearAuthSession();
            console.log('Sesion expirada');
        } else if (backendUnavailable) {
            clearAuthSession();
            console.log('Backend no disponible, cerrando sesion');
        }
        return Promise.reject(error);
    }
);

// API pública sin autenticación
const publicApi = axios.create({
    baseURL: baseURL,
    responseType: 'json',
    timeout: REQUEST_TIMEOUT
});

attachRetryInterceptor(api);
attachRetryInterceptor(publicApi);

export const registerPatient = (data) => api.post('/api/v1/riee/patients', data);
export const getPatientWithPagination = (pageNumber) => api.get(`/api/pacientes/all/${pageNumber}`);
export const getAllPatients = () => api.get('/api/v1/riee/patients');
export const getAllTreatments = () => api.get('/api/v1/riee/treatments');
export const registerTreatment = (data) => api.post('/api/v1/riee/treatments', data);
export const registerAppointment = (data) => api.post('/api/v1/riee/appointments', data);
export const getAllAppointments = () => api.get('/api/v1/riee/appointments');
export const getAllSpecialities = () => publicApi.get('/api/v1/riee/specialities');
export const registerDentist = (data) => publicApi.post('/api/v1/riee/dentists', data);
export { api, publicApi };
