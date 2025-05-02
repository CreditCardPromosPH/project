import React from 'react';
import { CreditCard } from 'lucide-react';

interface BankLogoProps {
  bank: string;
  size?: 'sm' | 'md' | 'lg';
}

// Placeholder bank logo URLs - replace these with actual logo URLs
const bankLogos: Record<string, string> = {
  'BDO': '/bank-logos/bdo.png',
  'BPI': '/bank-logos/bpi.png',
  'RCBC': '/bank-logos/rcbc.png',
  'Chinabank': '/bank-logos/chinabank.png',
  'Eastwest': '/bank-logos/eastwest.png',
  'Security Bank': '/bank-logos/securitybank.png',
  'Bank of Commerce': '/bank-logos/bankofcommerce.png',
  'Metrobank': '/bank-logos/metrobank.png',
  'UnionBank': '/bank-logos/unionbank.png',
  'PNB': '/bank-logos/pnb.png',
  'Default': '/bank-logos/default.png' // Default fallback logo
};

const BankLogo: React.FC<BankLogoProps> = ({ bank, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  // If no logo URL is found, use a default credit card icon
  const hasLogo = bankLogos[bank] || bankLogos['Default'];
  
  if (!hasLogo) {
    return (
      <div 
        className={`${sizeClasses[size]} bg-slate-100 text-slate-600 rounded-full flex items-center justify-center shadow-sm`}
        title={bank}
      >
        <CreditCard className="w-1/2 h-1/2" />
      </div>
    );
  }

  return (
    <div 
      className={`${sizeClasses[size]} relative rounded-full shadow-sm overflow-hidden bg-white`}
      title={bank}
    >
      <img
        src={bankLogos[bank] || bankLogos['Default']}
        alt={`${bank} logo`}
        className="w-full h-full object-contain p-1"
        onError={(e) => {
          // If image fails to load, replace with credit card icon
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement?.classList.add('bg-slate-100');
          const icon = document.createElement('div');
          icon.className = 'absolute inset-0 flex items-center justify-center text-slate-600';
          icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`;
          target.parentElement?.appendChild(icon);
        }}
      />
    </div>
  );
};

export default BankLogo;