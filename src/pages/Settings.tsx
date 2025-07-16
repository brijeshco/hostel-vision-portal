import React from 'react';
import { TemporaryPage } from '@/components/TemporaryPage';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <TemporaryPage
      title="Settings"
      description="Configure application settings and preferences"
      icon={SettingsIcon}
    />
  );
};

export default Settings;