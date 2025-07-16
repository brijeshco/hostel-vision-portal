import React from 'react';
import { TemporaryPage } from '@/components/TemporaryPage';
import { Calendar } from 'lucide-react';

const Bookings: React.FC = () => {
  return (
    <TemporaryPage
      title="Booking Management"
      description="View and manage room bookings, approvals, and reservations"
      icon={Calendar}
    />
  );
};

export default Bookings;