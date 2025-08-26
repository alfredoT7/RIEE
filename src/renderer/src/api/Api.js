import axios from 'axios';

const baseURL = "http://localhost:8080";

console.log('Todas las variables de entorno:', import.meta.env);
const username = import.meta.env.VITE_API_USERNAME;
const password = import.meta.env.VITE_API_PASSWORD;

console.log('Credenciales cargadas:', {
  username: username,
  password: password ? '***' : 'NO_PASSWORD',
  fromEnv: {
    username: import.meta.env.VITE_API_USERNAME ? 'YES' : 'NO',
    password: import.meta.env.VITE_API_PASSWORD ? 'YES' : 'NO'
  }
});

const api = axios.create({
    baseURL: baseURL,
    responseType: 'json',
    timeout: 10000,
    auth: {
        username: username,
        password: password
    }
});

export const registerPatient = (data) => api.post('/api/v1/riee/patients', data);
export const getPatientWithPagination = (pageNumber) => api.get(`/api/pacientes/all/${pageNumber}`);
export const getAllPatients = () => api.get('/api/v1/riee/patients');
export const getAllTreatments = () => api.get('/api/v1/riee/treatments');
export const registerTreatment = (data) => api.post('/api/v1/riee/treatments', data);