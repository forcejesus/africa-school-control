
// Main export file that re-exports everything from the data modules

// Export all types
export * from './types';

// Export all data arrays
export { schools } from './schoolsData';
export { subscriptions } from './subscriptionsData';
export { users } from './usersData';
export { activities } from './activitiesData';

// Export all utility functions
export { 
  getTotalSchools,
  getTotalActiveSchools,
  getTotalStudents,
  getTotalTeachers
} from './schoolsData';

export { getExpiringSubscriptions } from './subscriptionsData';

export { 
  getTotalGamesPlayed,
  getActivityChartData,
  getRecentActivities
} from './activitiesData';
