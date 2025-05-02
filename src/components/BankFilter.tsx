import React from 'react';
import { usePromos } from '../context/PromoContext';
import BankLogo from './BankLogo';

// Fixed list of banks
const BANKS = [
  'BDO',
  'BPI',
  'RCBC',
  'Chinabank',
  'Eastwest',
  'Security Bank',
  'Bank of Commerce',
  'Metrobank',
  'UnionBank',
  'PNB'
];

const BankFilter: React.FC = () => {
  const { filters, setFilters } = usePromos();
  
  const handleBankClick = (bank: string) => {
    setFilters(prev => ({
      ...prev,
      bank: prev.bank === bank ? null : bank
    }));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-slate-800">Banks</h3>
      <div className="flex flex-wrap gap-2">
        {BANKS.map((bank) => (
          <button
            key={bank}
            onClick={() => handleBankClick(bank)}
            className={`
              flex items-center px-3 py-2 rounded-lg border transition-all
              ${filters.bank === bank 
                ? 'bg-primary-50 border-primary-200 text-primary-700' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }
            `}
          >
            <BankLogo bank={bank} size="sm" />
            <span className="ml-2 text-sm font-medium">{bank}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BankFilter;