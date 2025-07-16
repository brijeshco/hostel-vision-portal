import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Building2, 
  Calendar, 
  CreditCard, 
  Users, 
  Settings,
  BookOpen,
  BarChart3,
  Bell
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  roles: ('admin' | 'student')[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['admin', 'student']
  },
  {
    label: 'Room Management',
    href: '/rooms',
    icon: Building2,
    roles: ['admin']
  },
  {
    label: 'Bookings',
    href: '/bookings',
    icon: Calendar,
    roles: ['admin', 'student']
  },
  {
    label: 'Payments',
    href: '/payments',
    icon: CreditCard,
    roles: ['admin', 'student']
  },
  {
    label: 'Students',
    href: '/students',
    icon: Users,
    roles: ['admin']
  },
  {
    label: 'My Profile',
    href: '/profile',
    icon: Users,
    roles: ['student']
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['admin']
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: Bell,
    roles: ['admin', 'student']
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin', 'student']
  }
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-card border-r border-border shadow-card">
      <div className="p-6">
        <Logo />
      </div>
      
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-primary rounded-lg p-4 text-white text-sm">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4" />
            <span className="font-medium">Quick Guide</span>
          </div>
          <p className="text-white/90 text-xs">
            Welcome to HostelPortal! Navigate through the sections to manage your hostel efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};