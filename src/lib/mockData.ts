// Mock data for hostel management portal

export interface Room {
  id: string;
  number: string;
  type: 'single' | 'double' | 'triple' | 'quad';
  floor: number;
  capacity: number;
  occupied: number;
  status: 'available' | 'occupied' | 'maintenance';
  facilities: string[];
  monthlyRent: number;
  description: string;
}

export interface Booking {
  id: string;
  studentId: string;
  studentName: string;
  roomId: string;
  roomNumber: string;
  checkIn: Date;
  checkOut?: Date;
  status: 'pending' | 'approved' | 'rejected' | 'active';
  monthlyRent: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'partial' | 'paid';
}

export interface Payment {
  id: string;
  bookingId: string;
  studentId: string;
  amount: number;
  date: Date;
  method: 'cash' | 'card' | 'online';
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  emergency: string;
  address: string;
  course: string;
  year: number;
  roomId?: string;
  avatar?: string;
}

export const ROOMS: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'single',
    floor: 1,
    capacity: 1,
    occupied: 1,
    status: 'occupied',
    facilities: ['Wi-Fi', 'AC', 'Study Table', 'Wardrobe'],
    monthlyRent: 5000,
    description: 'Spacious single room with modern amenities'
  },
  {
    id: '2',
    number: '102',
    type: 'double',
    floor: 1,
    capacity: 2,
    occupied: 0,
    status: 'available',
    facilities: ['Wi-Fi', 'Fan', 'Study Table', 'Wardrobe'],
    monthlyRent: 4000,
    description: 'Comfortable double sharing room'
  },
  {
    id: '3',
    number: '103',
    type: 'triple',
    floor: 1,
    capacity: 3,
    occupied: 2,
    status: 'occupied',
    facilities: ['Wi-Fi', 'Fan', 'Study Table', 'Wardrobe'],
    monthlyRent: 3500,
    description: 'Triple sharing room with good ventilation'
  },
  {
    id: '4',
    number: '201',
    type: 'single',
    floor: 2,
    capacity: 1,
    occupied: 0,
    status: 'maintenance',
    facilities: ['Wi-Fi', 'AC', 'Study Table', 'Wardrobe'],
    monthlyRent: 5000,
    description: 'Premium single room under maintenance'
  },
  {
    id: '5',
    number: '202',
    type: 'double',
    floor: 2,
    capacity: 2,
    occupied: 0,
    status: 'available',
    facilities: ['Wi-Fi', 'AC', 'Study Table', 'Wardrobe', 'Balcony'],
    monthlyRent: 4500,
    description: 'Double room with balcony and AC'
  }
];

export const STUDENTS: Student[] = [
  {
    id: 'student-1',
    name: 'John Doe',
    email: 'student@hostel.com',
    phone: '+91 9876543210',
    emergency: '+91 9876543211',
    address: '123 Main St, City',
    course: 'Computer Science',
    year: 2,
    roomId: '1'
  },
  {
    id: 'student-2',
    name: 'Jane Smith',
    email: 'jane@hostel.com',
    phone: '+91 9876543220',
    emergency: '+91 9876543221',
    address: '456 Oak Ave, City',
    course: 'Mechanical Engineering',
    year: 3,
    roomId: '3'
  },
  {
    id: 'student-3',
    name: 'Bob Wilson',
    email: 'bob@hostel.com',
    phone: '+91 9876543230',
    emergency: '+91 9876543231',
    address: '789 Pine St, City',
    course: 'Electrical Engineering',
    year: 1
  }
];

export const BOOKINGS: Booking[] = [
  {
    id: 'booking-1',
    studentId: 'student-1',
    studentName: 'John Doe',
    roomId: '1',
    roomNumber: '101',
    checkIn: new Date('2024-01-01'),
    status: 'active',
    monthlyRent: 5000,
    totalAmount: 5000,
    paymentStatus: 'paid'
  },
  {
    id: 'booking-2',
    studentId: 'student-2',
    studentName: 'Jane Smith',
    roomId: '3',
    roomNumber: '103',
    checkIn: new Date('2024-01-15'),
    status: 'active',
    monthlyRent: 3500,
    totalAmount: 3500,
    paymentStatus: 'partial'
  },
  {
    id: 'booking-3',
    studentId: 'student-3',
    studentName: 'Bob Wilson',
    roomId: '2',
    roomNumber: '102',
    checkIn: new Date('2024-02-01'),
    status: 'pending',
    monthlyRent: 4000,
    totalAmount: 4000,
    paymentStatus: 'pending'
  }
];

export const PAYMENTS: Payment[] = [
  {
    id: 'payment-1',
    bookingId: 'booking-1',
    studentId: 'student-1',
    amount: 5000,
    date: new Date('2024-01-01'),
    method: 'online',
    status: 'completed',
    description: 'January 2024 Rent'
  },
  {
    id: 'payment-2',
    bookingId: 'booking-2',
    studentId: 'student-2',
    amount: 2000,
    date: new Date('2024-01-15'),
    method: 'cash',
    status: 'completed',
    description: 'Partial Payment - January 2024'
  }
];

export const getAvailableRooms = () => ROOMS.filter(room => room.status === 'available');
export const getOccupiedRooms = () => ROOMS.filter(room => room.status === 'occupied');
export const getMaintenanceRooms = () => ROOMS.filter(room => room.status === 'maintenance');

export const getStudentBookings = (studentId: string) => 
  BOOKINGS.filter(booking => booking.studentId === studentId);

export const getStudentPayments = (studentId: string) => 
  PAYMENTS.filter(payment => payment.studentId === studentId);

export const getTotalOccupancy = () => {
  const totalCapacity = ROOMS.reduce((sum, room) => sum + room.capacity, 0);
  const totalOccupied = ROOMS.reduce((sum, room) => sum + room.occupied, 0);
  return { totalCapacity, totalOccupied, occupancyRate: (totalOccupied / totalCapacity) * 100 };
};

export const getMonthlyRevenue = () => {
  return PAYMENTS
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);
};