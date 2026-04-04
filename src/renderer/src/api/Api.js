import axios from 'axios';
import {
    clearStoredSession,
    getAuthorizationHeader,
    setAuthNotice
} from '../services/authStorage';

const baseURL = "http://localhost:8080";
const REQUEST_TIMEOUT = 10000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const AUTH_ERROR_MESSAGES = {
    TOKEN_EXPIRED: 'Tu sesion expiro. Inicia sesion nuevamente.',
    TOKEN_INVALID: 'Tu sesion ya no es valida. Inicia sesion nuevamente.',
    TOKEN_MISSING: 'Debes iniciar sesion para continuar.'
};

const attachAuthorizationHeader = (config) => {
    const authorizationHeader = getAuthorizationHeader();

    if (authorizationHeader) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = authorizationHeader;
    }

    return config;
};

const resolveAuthNotice = (error) => {
    const authErrorCode = error.response?.data?.errors?.[0];

    if (authErrorCode && AUTH_ERROR_MESSAGES[authErrorCode]) {
        return AUTH_ERROR_MESSAGES[authErrorCode];
    }

    return 'Tu sesion expiro. Inicia sesion nuevamente.';
};

const clearAuthSession = (noticeMessage) => {
    clearStoredSession();
    delete api.defaults.headers.common.Authorization;

    if (typeof window !== 'undefined') {
        if (noticeMessage) {
            setAuthNotice(noticeMessage);
        }

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

const api = axios.create({
    baseURL: baseURL,
    responseType: 'json',
    timeout: REQUEST_TIMEOUT
});

api.interceptors.request.use(
    (config) => {
        return attachAuthorizationHeader(config);
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const backendUnavailable = !error.response || [502, 503, 504].includes(status);

        if (status === 401) {
            const authNotice = resolveAuthNotice(error);
            clearAuthSession(authNotice);
            console.log(authNotice);
        } else if (backendUnavailable) {
            clearAuthSession();
            console.log('Backend no disponible, cerrando sesion');
        }
        return Promise.reject(error);
    }
);

const publicApi = axios.create({
    baseURL: baseURL,
    responseType: 'json',
    timeout: REQUEST_TIMEOUT
});

attachRetryInterceptor(api);
attachRetryInterceptor(publicApi);

export const syncApiAuthToken = () => {
    const authorizationHeader = getAuthorizationHeader();

    if (authorizationHeader) {
        api.defaults.headers.common.Authorization = authorizationHeader;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
};

syncApiAuthToken();

export const getAuthConfig = () => {
    const authorizationHeader = getAuthorizationHeader();
    const headers = {};

    if (authorizationHeader) {
        headers.Authorization = authorizationHeader;
    }

    return Object.keys(headers).length > 0 ? { headers } : {};
};

export const registerPatient = (data) => api.post('/api/v1/riee/patients', data, getAuthConfig());
export const registerPatientQuestionnaire = (patientId, data) =>
    api.post(`/api/v1/riee/patients/${patientId}/questionnaire`, data, getAuthConfig());
export const registerPatientClinicalInfo = (patientId, data) =>
    api.post(`/api/v1/riee/patients/${patientId}/clinical-info`, data, getAuthConfig());
export const getPatientWithPagination = (pageNumber) => api.get(`/api/pacientes/all/${pageNumber}`, getAuthConfig());
export const getAllPatients = () => api.get('/api/v1/riee/patients', getAuthConfig());
export const getAllTreatments = () => api.get('/api/v1/riee/treatments', getAuthConfig());
export const registerTreatment = (data) => api.post('/api/v1/riee/treatments', data, getAuthConfig());
export const registerAppointment = (data) => api.post('/api/v1/riee/appointments', data, getAuthConfig());
export const getAllAppointments = () => api.get('/api/v1/riee/appointments', getAuthConfig());
export const getAllSpecialities = () => publicApi.get('/api/v1/riee/specialities');
export const registerDentist = (data) => publicApi.post('/api/v1/riee/dentists', data);
export { api, publicApi };
