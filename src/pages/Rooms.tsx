import React from 'react';
import { TemporaryPage } from '@/components/TemporaryPage';
import { Building2 } from 'lucide-react';

const Rooms: React.FC = () => {
  return (
    <TemporaryPage
      title="Room Management"
      description="Manage room availability, allocations, and maintenance status"
      icon={Building2}
    />
  );
};

export default Rooms;