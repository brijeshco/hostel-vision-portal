import React from 'react';
import { TemporaryPage } from '@/components/TemporaryPage';
import { CreditCard } from 'lucide-react';

const Payments: React.FC = () => {
  return (
    <TemporaryPage
      title="Payment Management"
      description="Track payments, generate invoices, and manage financial records"
      icon={CreditCard}
    />
  );
};

export default Payments;