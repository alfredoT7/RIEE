import axios from 'axios';
const baseURL = "http://localhost:8080";
const api = axios.create({
    baseURL: baseURL,
    responseType: 'json',
    //withCredentials: true,
    timeout: 10000
  });


export const registerPatient = (data) => api.post('/api/pacientes/create', data);
