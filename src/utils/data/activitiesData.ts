
import { Activity, ActivityDataPoint } from "./types";

export const activities: Activity[] = [
  {
    id: "act001",
    schoolId: "sch001",
    date: "2023-05-12",
    gamesPlayed: 45,
    activeUsers: 120,
    gamesCreated: 8
  },
  {
    id: "act002",
    schoolId: "sch002",
    date: "2023-05-11",
    gamesPlayed: 32,
    activeUsers: 95,
    gamesCreated: 5
  },
  {
    id: "act003",
    schoolId: "sch003",
    date: "2023-05-10",
    gamesPlayed: 18,
    activeUsers: 60,
    gamesCreated: 3
  },
  {
    id: "act004",
    schoolId: "sch004",
    date: "2023-05-09",
    gamesPlayed: 0,
    activeUsers: 0,
    gamesCreated: 0
  },
  {
    id: "act005",
    schoolId: "sch005",
    date: "2023-05-08",
    gamesPlayed: 28,
    activeUsers: 78,
    gamesCreated: 4
  }
];

// Activity-related utility functions
export const getTotalGamesPlayed = (): number => {
  return activities.reduce((total, activity) => total + activity.gamesPlayed, 0);
};

export const getActivityChartData = (): ActivityDataPoint[] => {
  const today = new Date();
  const data: ActivityDataPoint[] = [];
  
  // Generate activity data for the past 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Random data for demonstration
    data.push({
      date: dateString,
      gamesCreated: Math.floor(Math.random() * 10) + 1,
      gamesPlayed: Math.floor(Math.random() * 50) + 10,
      activeUsers: Math.floor(Math.random() * 100) + 30
    });
  }
  
  return data;
};

export const getRecentActivities = () => {
  return activities.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, 5); // Return only the 5 most recent activities
};
