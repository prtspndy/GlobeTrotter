export className Constants {
  static API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
}

export const CATEGORIES = ['sightseeing', 'culture', 'food', 'relaxation', 'adventure', 'shopping'];
export const EXPENSE_CATEGORIES = ['transport', 'accommodation', 'activity', 'meal', 'other'];
export const VISIBILITY_OPTIONS = ['private', 'public'];
