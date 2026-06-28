import { useEffect, useRef } from 'react';
import { Star, MapPin, Users, Phone, MessageSquare } from 'lucide-react';

export interface Ride {
  id: string;
  driverName: string;
  avatar: string;
  rating: number;
  reviews: number;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance: string;
  availableSeats: number;
  pricePerSeat: number;
  totalPrice: number;
  carModel: string;
  carNumber: string;
  carColor: string;
  amenities: string[];
  stops: string[];
}

const mockRides: Ride[] = [
  {
    id: '0',
    driverName: 'Arjun Singh',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: 4.9,
    reviews: 143,
    from: 'Delhi',
    to: 'Dehradun',
    departureTime: '06:30 AM',
    arrivalTime: '01:00 PM',
    duration: '6h 30m',
    distance: '249 km',
    availableSeats: 4,
    pricePerSeat: 620,
    totalPrice: 2480,
    carModel: 'Hyundai Creta',
    carNumber: 'DL 08 JK 2468',
    carColor: 'White',
    amenities: ['AC', 'WiFi', 'Charging', 'Water'],
    stops: ['Meerut', 'Saharanpur'],
  },
  {
    id: '0b',
    driverName: 'Neha Verma',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: 4.8,
    reviews: 88,
    from: 'Delhi',
    to: 'Dehradun',
    departureTime: '09:15 AM',
    arrivalTime: '03:45 PM',
    duration: '6h 30m',
    distance: '249 km',
    availableSeats: 2,
    pricePerSeat: 590,
    totalPrice: 1180,
    carModel: 'Kia Seltos',
    carNumber: 'HR 26 MN 7722',
    carColor: 'Silver',
    amenities: ['AC', 'Music', 'USB Charger'],
    stops: ['Modinagar', 'Roorkee'],
  },
  {
    id: '1',
    driverName: 'Priya Sharma',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: 4.9,
    reviews: 128,
    from: 'Delhi',
    to: 'Jaipur',
    departureTime: '06:00 AM',
    arrivalTime: '10:30 AM',
    duration: '4h 30m',
    distance: '238 km',
    availableSeats: 3,
    pricePerSeat: 450,
    totalPrice: 1350,
    carModel: 'Maruti Swift',
    carNumber: 'DL 01 AB 1234',
    carColor: 'Silver',
    amenities: ['AC', 'WiFi', 'Charging', 'Music'],
    stops: ['Gurgaon', 'Alwar'],
  },
  {
    id: '2',
    driverName: 'Rohit Mehra',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: 4.8,
    reviews: 95,
    from: 'Delhi',
    to: 'Jaipur',
    departureTime: '07:00 AM',
    arrivalTime: '11:15 AM',
    duration: '4h 15m',
    distance: '238 km',
    availableSeats: 2,
    pricePerSeat: 480,
    totalPrice: 960,
    carModel: 'Hyundai i20',
    carNumber: 'DL 02 CD 5678',
    carColor: 'White',
    amenities: ['AC', 'Water', 'Snacks'],
    stops: ['Manesar'],
  },
  {
    id: '3',
    driverName: 'Ananya Bose',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: 5.0,
    reviews: 156,
    from: 'Delhi',
    to: 'Jaipur',
    departureTime: '05:30 AM',
    arrivalTime: '09:45 AM',
    duration: '4h 15m',
    distance: '238 km',
    availableSeats: 4,
    pricePerSeat: 420,
    totalPrice: 1680,
    carModel: 'Tata Nexon',
    carNumber: 'HR 26 EF 9012',
    carColor: 'Black',
    amenities: ['AC', 'USB Charger', 'Aux Cable', 'Extra Legroom'],
    stops: ['Gurgaon'],
  },
  {
    id: '4',
    driverName: 'Amit Joshi',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: 4.7,
    reviews: 82,
    from: 'Delhi',
    to: 'Jaipur',
    departureTime: '08:00 AM',
    arrivalTime: '12:30 PM',
    duration: '4h 30m',
    distance: '238 km',
    availableSeats: 1,
    pricePerSeat: 490,
    totalPrice: 490,
    carModel: 'Honda City',
    carNumber: 'DL 03 GH 3456',
    carColor: 'Blue',
    amenities: ['AC', 'WiFi', 'Music System'],
    stops: ['Gurgaon', 'Bawal'],
  },
];

interface RideCardProps {
  ride: Ride;
  selectedSeats: number;
}

export function RideCard({ ride, selectedSeats }: RideCardProps) {
  const totalPrice = ride.pricePerSeat * selectedSeats;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="section-reveal bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-4">
        {/* Driver Info */}
        <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={ride.avatar}
              alt={ride.driverName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-200"
            />
            <div>
              <h3 className="font-bold text-gray-900">{ride.driverName}</h3>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < Math.floor(ride.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-1">
                  {ride.rating} ({ride.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Car</p>
            <p className="text-xs font-semibold text-gray-700">{ride.carModel}</p>
            <p className="text-xs text-gray-500">{ride.carNumber}</p>
          </div>
        </div>

        {/* Route & Time */}
        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100">
          <div>
            <p className="text-sm font-black text-gray-900">{ride.departureTime}</p>
            <p className="text-xs text-gray-500">{ride.from}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500 mb-2">{ride.duration}</p>
            <div className="flex items-center gap-1 w-full">
              <div className="h-px bg-gray-300 flex-1" />
              <MapPin size={14} className="text-gray-400" />
              <div className="h-px bg-gray-300 flex-1" />
            </div>
            <p className="text-xs text-gray-500 mt-2">{ride.distance}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-black text-gray-900">{ride.arrivalTime}</p>
            <p className="text-xs text-gray-500">{ride.to}</p>
          </div>
        </div>

        {/* Amenities & Stops */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Stops</p>
          <div className="flex items-center gap-2 flex-wrap">
            {ride.stops.map((s) => (
              <span key={s} className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">{s}</span>
            ))}
          </div>
        </div>

        {/* Seats & Price */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-gray-900">
              {ride.availableSeats} seats available
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">₹{ride.pricePerSeat} per seat</p>
            <p className="text-lg font-black text-blue-600">₹{totalPrice}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button className="flex-1 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm">
            Book Now
          </button>
          <button className="px-3 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors">
            <Phone size={18} className="text-gray-600" />
          </button>
          <button className="px-3 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors">
            <MessageSquare size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function getRidesBySearch(from: string, to: string, date: string, seats: number): Ride[] {
  // In a real app, this would call an API
  // For now, return mock rides filtered by availability
  return mockRides.filter((ride) =>
    ride.from.toLowerCase() === from.toLowerCase() &&
    ride.to.toLowerCase() === to.toLowerCase() &&
    ride.availableSeats >= seats
  );
}
