
export interface TranslationKeys {
  // Navigation
  nav: {
    dashboard: string;
    schools: string;
    subscriptions: string;
    analytics: string;
    users: string;
    settings: string;
    notifications: string;
  };
  
  // Authentication
  auth: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    rememberMe: string;
    forgotPassword: string;
    signIn: string;
    signingIn: string;
    connectionInProgress: string;
    loginSuccess: string;
    welcomeMessage: string;
    loginError: string;
    checkCredentials: string;
    logout: string;
  };
  
  // Common
  common: {
    loading: string;
    search: string;
    add: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    confirm: string;
    yes: string;
    no: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    completed: string;
  };
  
  // Dashboard
  dashboard: {
    title: string;
    welcome: string;
    overview: string;
    activeSubscriptions: string;
    totalSchools: string;
    totalGameSessions: string;
    totalGamesCreated: string;
    quickActions: string;
    manageSchools: string;
    addSchool: string;
    schoolsList: string;
    gamesCreatedBySchool: string;
    planificationsCreated: string;
    school: string;
    game: string;
    activeSessions: string;
    totalSessions: string;
    planification: string;
    status: string;
    active: string;
    completed: string;
    pending: string;
    nonExpiredSessions: string;
    totalPlanifications: string;
  };
  
  // Schools
  schools: {
    title: string;
    description: string;
    addNew: string;
    editSchool: string;
    management: string;
  };
  
  // Subscriptions
  subscriptions: {
    title: string;
    description: string;
    management: string;
    plan: string;
    status: string;
    price: string;
    active: string;
    pending: string;
    expired: string;
    autoRenew: string;
    startDate: string;
    endDate: string;
    expiryDate: string;
    update: string;
  };
  
  // Users
  users: {
    title: string;
    description: string;
    management: string;
  };
  
  // Settings
  settings: {
    title: string;
    description: string;
    general: string;
    notifications: string;
    subscriptions: string;
    appearance: string;
    security: string;
    faq: string;
    language: string;
    
    // General settings
    generalInfo: string;
    personalInfo: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    
    // Notifications
    notificationPrefs: string;
    emailNotifications: string;
    emailNotificationsDesc: string;
    systemAlerts: string;
    systemAlertsDesc: string;
    subscriptionAlerts: string;
    subscriptionAlertsDesc: string;
    
    // Appearance
    appearanceSettings: string;
    theme: string;
    customizeAppearance: string;
    
    // Security
    securitySettings: string;
    updateSecurity: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    changePassword: string;
    
    // FAQ
    faqManagement: string;
    faqDescription: string;
    existingFAQs: string;
    addNewFAQ: string;
    question: string;
    answer: string;
    enterQuestion: string;
    enterAnswer: string;
    addFAQ: string;
  };
  
  // Alerts and messages
  alerts: {
    success: string;
    error: string;
    warning: string;
    info: string;
  };
}

export type Language = 'fr' | 'en';

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
