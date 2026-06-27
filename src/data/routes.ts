export interface PopularRouteItem {
  from: string;
  to: string;
  price: string;
  time: string;
  seats: number;
}

export const defaultPopularRoutes: PopularRouteItem[] = [
  { from: 'Delhi', to: 'Manali', price: '₹850', time: '13 hrs', seats: 2 },
  { from: 'Pune', to: 'Mumbai', price: '₹280', time: '3 hrs', seats: 3 },
  { from: 'Bengaluru', to: 'Mysuru', price: '₹320', time: '3.5 hrs', seats: 1 },
  { from: 'Gurgaon', to: 'Jaipur', price: '₹550', time: '5 hrs', seats: 2 },
  { from: 'Chennai', to: 'Pondicherry', price: '₹360', time: '3 hrs', seats: 3 },
  { from: 'Chandigarh', to: 'Shimla', price: '₹420', time: '4.5 hrs', seats: 2 },
  { from: 'Nashik', to: 'Pune', price: '₹310', time: '2.5 hrs', seats: 4 },
  { from: 'Hyderabad', to: 'Vijayawada', price: '₹480', time: '5 hrs', seats: 2 },
  { from: 'Meerut', to: 'Delhi', price: '₹220', time: '1.5 hrs', seats: 3 },
  { from: 'Dehradun', to: 'Rishikesh', price: '₹180', time: '1.5 hrs', seats: 2 },
  { from: 'Srinagar', to: 'Leh', price: '₹1,200', time: '8 hrs', seats: 1 },
  { from: 'Kolkata', to: 'Asansol', price: '₹290', time: '3 hrs', seats: 3 },
];

export const POPULAR_ROUTES_STORAGE_KEY = 'hicars:popular-routes';

function routeKey(route: PopularRouteItem) {
  return `${route.from.trim().toLowerCase()}|${route.to.trim().toLowerCase()}`;
}

function dedupeRoutes(items: PopularRouteItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = routeKey(item);
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function loadStoredPopularRoutes() {
  if (typeof window === 'undefined') {
    return defaultPopularRoutes;
  }

  try {
    const saved = window.localStorage.getItem(POPULAR_ROUTES_STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved) as PopularRouteItem[];
      return Array.isArray(parsed) ? parsed : [];
    }

    window.localStorage.setItem(POPULAR_ROUTES_STORAGE_KEY, JSON.stringify(defaultPopularRoutes));
    return defaultPopularRoutes;
  } catch {
    return defaultPopularRoutes;
  }
}

export function saveStoredPopularRoutes(items: PopularRouteItem[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(POPULAR_ROUTES_STORAGE_KEY, JSON.stringify(dedupeRoutes(items)));
}