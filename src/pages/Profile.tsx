import React from 'react';
import { TemporaryPage } from '@/components/TemporaryPage';
import { User } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <TemporaryPage
      title="Profile Management"
      description="Update your personal information and account settings"
      icon={User}
    />
  );
};

export default Profile;