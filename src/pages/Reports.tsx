import React from 'react';
import { TemporaryPage } from '@/components/TemporaryPage';
import { BarChart3 } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <TemporaryPage
      title="Reports & Analytics"
      description="View detailed reports on occupancy, revenue, and hostel performance"
      icon={BarChart3}
    />
  );
};

export default Reports;