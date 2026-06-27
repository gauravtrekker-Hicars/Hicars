export interface TestimonialItem {
  name: string;
  city: string;
  avatar: string;
  rating: number;
  text: string;
  route: string;
}

export const defaultTestimonials: TestimonialItem[] = [
  {
    name: 'Priya Sharma',
    city: 'Delhi',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: 5,
    text: 'HIcars made my Delhi to Manali trip absolutely unforgettable! Found a friendly driver, split costs, and discovered the most amazing mountain roads I\'d never have seen otherwise.',
    route: 'Delhi → Manali',
  },
  {
    name: 'Rohit Mehra',
    city: 'Pune',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: 5,
    text: 'I drive Pune to Mumbai every weekend. HIcars helps me find passengers, cover my fuel costs, and great company on the highway. Highly recommend for regular commuters!',
    route: 'Pune → Mumbai',
  },
  {
    name: 'Ananya Bose',
    city: 'Bengaluru',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: 5,
    text: 'Super affordable, safe, and always on time. I\'ve used HIcars 15+ times this year alone. The verified profiles give me total peace of mind traveling solo.',
    route: 'Bengaluru → Mysuru',
  },
  {
    name: 'Amit Joshi',
    city: 'Chandigarh',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: 5,
    text: 'The Chandigarh to Shimla carpool was incredible. Paid a little money, got there on time in full AC comfort. Knowing the driver is verified makes all the difference.',
    route: 'Chandigarh → Shimla',
  },
];

export const TESTIMONIALS_STORAGE_KEY = 'hicars:testimonials:v2';

export async function loadStoredTestimonials() {
  try {
    const response = await fetch('/api/testimonials', { cache: 'no-store' });

    if (response.ok) {
      const parsed = (await response.json()) as unknown;

      if (Array.isArray(parsed)) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(parsed));
        }

        return parsed as TestimonialItem[];
      }
    }
  } catch {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(TESTIMONIALS_STORAGE_KEY);

        if (saved !== null) {
          const parsed = JSON.parse(saved) as TestimonialItem[];
          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      } catch {
        // Fall through to the defaults below.
      }
    }
  }

  return defaultTestimonials;
}

export async function saveStoredTestimonials(items: TestimonialItem[]) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(items));
  }

  try {
    await fetch('/api/testimonials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    });
  } catch {
    // Keep the local cache if the server write fails.
  }
}
