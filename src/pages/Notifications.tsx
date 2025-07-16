import React from 'react';
import { TemporaryPage } from '@/components/TemporaryPage';
import { Bell } from 'lucide-react';

const Notifications: React.FC = () => {
  return (
    <TemporaryPage
      title="Notifications"
      description="Manage announcements, alerts, and communication with users"
      icon={Bell}
    />
  );
};

export default Notifications;