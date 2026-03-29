const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

const defaultApiBaseUrl = 'http://localhost:8000';
const rawApiBaseUrl = process.env.REACT_APP_API_BASE_URL || defaultApiBaseUrl;

export const API_BASE_URL = trimTrailingSlash(rawApiBaseUrl);

const derivedWsBaseUrl = API_BASE_URL.startsWith('https://')
  ? API_BASE_URL.replace('https://', 'wss://')
  : API_BASE_URL.replace('http://', 'ws://');

const rawWsBaseUrl = process.env.REACT_APP_WS_BASE_URL || derivedWsBaseUrl;
export const WS_BASE_URL = trimTrailingSlash(rawWsBaseUrl);

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const wsUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${WS_BASE_URL}${normalizedPath}`;
};
