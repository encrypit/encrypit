import { capitalize } from 'src/utils';

export const API_URL = import.meta.env.VITE_API_URL || '';
export const APP_NAME = capitalize(import.meta.env.VITE_APP_NAME) || 'Encrypit';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION;
export const DEV = import.meta.env.DEV;
