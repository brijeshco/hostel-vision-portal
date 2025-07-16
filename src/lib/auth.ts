// Authentication system for hostel management portal
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Pre-defined users
export const USERS: Record<string, User & { password: string }> = {
  'admin@hostel.com': {
    id: 'admin-1',
    email: 'admin@hostel.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: '/placeholder.svg'
  },
  'student@hostel.com': {
    id: 'student-1',
    email: 'student@hostel.com',
    password: 'student123',
    name: 'John Doe',
    role: 'student',
    avatar: '/placeholder.svg'
  }
};

export const authenticate = (credentials: LoginCredentials): User | null => {
  const user = USERS[credentials.email];
  if (user && user.password === credentials.password) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('hostel-user');
  return userJson ? JSON.parse(userJson) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('hostel-user', JSON.stringify(user));
  } else {
    localStorage.removeItem('hostel-user');
  }
};

export const logout = (): void => {
  localStorage.removeItem('hostel-user');
};