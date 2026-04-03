const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const AUTH_NOTICE_KEY = 'auth_notice';

const normalizeToken = (token) => {
  if (!token || typeof token !== 'string') {
    return '';
  }

  return token.replace(/^Bearer\s+/i, '').trim();
};

export const getStoredToken = () => normalizeToken(localStorage.getItem(TOKEN_KEY));

export const getAuthorizationHeader = () => {
  const token = getStoredToken();
  return token ? `Bearer ${token}` : null;
};

export const setStoredSession = ({ token, user }) => {
  const normalizedToken = normalizeToken(token);

  if (normalizedToken) {
    localStorage.setItem(TOKEN_KEY, normalizedToken);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  return normalizedToken;
};

export const clearStoredSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const setAuthNotice = (message) => {
  if (typeof window === 'undefined' || !message) {
    return;
  }

  sessionStorage.setItem(AUTH_NOTICE_KEY, message);
};

export const consumeAuthNotice = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  const message = sessionStorage.getItem(AUTH_NOTICE_KEY) || '';

  if (message) {
    sessionStorage.removeItem(AUTH_NOTICE_KEY);
  }

  return message;
};

export const getStoredUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    return { username: storedUser };
  }
};
