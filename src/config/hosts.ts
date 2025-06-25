// Configuration globale des environnements et endpoints API

export type Environment = 'development' | 'production';

// Configuration centralisée - changez cette variable pour basculer d'environnement
export const CURRENT_ENVIRONMENT: Environment = 'development' as Environment;

// Configuration des hosts par environnement
export const HOSTS = {
  development: {
    api: 'http://localhost:3000',
    app: 'http://localhost:5173'
  },
  production: {
    api: 'http://kahoot.nos-apps.com',
    app: 'https://yourapp.com'
  }
} as const;

// Récupération de la configuration actuelle
export const getCurrentConfig = () => HOSTS[CURRENT_ENVIRONMENT];

// Endpoints API pré-configurés
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/api/login-admin',
    logout: '/api/logout',
    refresh: '/api/refresh-token'
  },
  
  // Schools
  schools: {
    list: '/api/ecoles/',
    create: '/api/ecoles',
    update: (id: string) => `/api/ecoles/${id}`,
    delete: (id: string) => `/api/ecoles/${id}`,
    detail: (id: string) => `/api/ecoles/${id}`
  },
  
  // Users
  users: {
    list: '/api/users/',
    create: '/api/users',
    update: (id: string) => `/api/users/${id}`,
    delete: (id: string) => `/api/users/${id}`,
    profile: '/api/users/profile'
  },
  
  // Subscriptions
  subscriptions: {
    list: '/api/subscriptions/',
    create: '/api/subscriptions',
    update: (id: string) => `/api/subscriptions/${id}`,
    delete: (id: string) => `/api/subscriptions/${id}`
  }
} as const;

// Fonctions utilitaires pour construire des URLs

/**
 * Construit une URL complète pour l'API
 * @param endpoint - Le endpoint API (ex: '/api/ecoles/')
 * @returns URL complète
 */
export const buildApiUrl = (endpoint: string): string => {
  const config = getCurrentConfig();
  return `${config.api}${endpoint}`;
};

/**
 * Construit une URL complète pour l'application
 * @param path - Le chemin dans l'application (ex: '/dashboard')
 * @returns URL complète
 */
export const buildAppUrl = (path: string): string => {
  const config = getCurrentConfig();
  return `${config.app}${path}`;
};

/**
 * Récupère l'URL de base de l'API pour l'environnement actuel
 * @returns URL de base de l'API
 */
export const getApiBaseUrl = (): string => {
  return getCurrentConfig().api;
};

/**
 * Récupère l'URL de base de l'application pour l'environnement actuel
 * @returns URL de base de l'application
 */
export const getAppBaseUrl = (): string => {
  return getCurrentConfig().app;
};

/**
 * Vérifie si on est en mode développement
 * @returns true si en développement
 */
export const isDevelopment = (): boolean => {
  return CURRENT_ENVIRONMENT === 'development';
};

/**
 * Vérifie si on est en mode production
 * @returns true si en production
 */
export const isProduction = (): boolean => {
  return CURRENT_ENVIRONMENT === 'production';
};

// Export des URLs fréquemment utilisées pour un accès rapide
export const QUICK_URLS = {
  // URLs d'API complètes
  loginApi: buildApiUrl(API_ENDPOINTS.auth.login),
  schoolsApi: buildApiUrl(API_ENDPOINTS.schools.list),
  usersApi: buildApiUrl(API_ENDPOINTS.users.list),
  subscriptionsApi: buildApiUrl(API_ENDPOINTS.subscriptions.list),
  
  // URLs d'application
  dashboard: buildAppUrl('/'),
  schools: buildAppUrl('/schools'),
  users: buildAppUrl('/users'),
  settings: buildAppUrl('/settings')
} as const;
