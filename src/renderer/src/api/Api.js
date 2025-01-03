import axios from 'axios';
const baseURL = "http://localhost:8080";
const api = axios.create({
    baseURL: baseURL,
    responseType: 'json',
    //withCredentials: true,
    timeout: 10000
  });


export const registerPatient = (data) => api.post('/api/pacientes/create', data);
export const getPatientWithPagination = (pageNumber) => api.get(`/api/pacientes/all/${pageNumber}`);
export const getAllPatients = () => api.get('/api/pacientes/getAll');