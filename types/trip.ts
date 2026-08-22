export type ActivityCategory = 
  | 'SIGHTSEEING'
  | 'CULTURE'
  | 'FOOD'
  | 'ADVENTURE'
  | 'NATURE'
  | 'SHOPPING'
  | 'SPIRITUAL'
  | 'NIGHTLIFE'
  | 'OTHER';

export type ExpenseCategory = 
  | 'TRANSPORTATION'
  | 'ACCOMMODATION'
  | 'ACTIVITIES'
  | 'MEALS'
  | 'OTHER';

export interface Activity {
  id: string;
  stopId: string;
  title: string;
  description?: string;
  category: ActivityCategory;
  startTime?: string;
  durationMinutes: number;
  cost: number;
  locationName?: string;
  completed: boolean;
  image?: string;
  order: number;
}

export interface Stop {
  id: string;
  tripId: string;
  cityName: string;
  country: string;
  image?: string;
  startDate: string;
  endDate: string;
  order: number;
  latitude?: number;
  longitude?: number;
  activities: Activity[];
}

export interface Expense {
  id: string;
  tripId: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  notes?: string;
}

export interface Trip {
  id: string;
  userId: string;
  title: string;
  description?: string;
  coverImage?: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  visibility: 'PRIVATE' | 'PUBLIC';
  shareId: string;
  createdAt: string;
  updatedAt: string;
  stops: Stop[];
  expenses: Expense[];
}

export interface BudgetBreakdown {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  dailyAverage: number;
  tripDays: number;
  byCategory: {
    category: ExpenseCategory;
    amount: number;
    percentage: number;
  }[];
  isOverBudget: boolean;
}
