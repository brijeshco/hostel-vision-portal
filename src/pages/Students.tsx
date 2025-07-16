import React from 'react';
import { TemporaryPage } from '@/components/TemporaryPage';
import { Users } from 'lucide-react';

const Students: React.FC = () => {
  return (
    <TemporaryPage
      title="Student Management"
      description="Manage student profiles, registrations, and hostel information"
      icon={Users}
    />
  );
};

export default Students;