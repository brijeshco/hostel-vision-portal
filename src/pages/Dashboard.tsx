import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { StudentDashboard } from '@/components/dashboards/StudentDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />;
};

export default Dashboard;