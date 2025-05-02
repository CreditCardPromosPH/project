import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ExternalLink } from 'lucide-react';
import { Promo } from '../types';
import BankLogo from './BankLogo';

interface PromoCardProps {
  promo: Promo;
  featured?: boolean;
}

const PromoCard: React.FC<PromoCardProps> = ({ promo, featured = false }) => {
  const formattedDate = new Date(promo.validUntil).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  const isExpiringSoon = () => {
    const daysLeft = Math.ceil((new Date(promo.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 7 && daysLeft > 0;
  };

  return (
    <div 
      className={`relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full border border-slate-200 ${
        featured ? 'transform hover:-translate-y-1' : ''
      }`}
    >
      {promo.isNew && (
        <div className="absolute top-3 right-3 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          NEW
        </div>
      )}
      
      {isExpiringSoon() && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          ENDING SOON
        </div>
      )}
      
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={promo.image || 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg'} 
          alt={promo.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-0 left-0 p-3">
          <BankLogo bank={promo.bank} size="md" />
        </div>
      </div>
      
      <div className="flex-1 p-5">
        <div className="flex items-center space-x-2 mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-slate-100 text-slate-800">
            {promo.category}
          </span>
          {featured && (
            <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-primary-100 text-primary-800">
              Featured
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-bold mb-2 line-clamp-2 text-slate-800">{promo.title}</h3>
        
        <p className="text-slate-600 mb-4 line-clamp-2 text-sm">{promo.description}</p>
        
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-xs text-slate-500">
            <Calendar size={14} className="mr-1" />
            <span>Valid until {formattedDate}</span>
          </div>
          <div className="flex items-center text-xs text-slate-500">
            <Tag size={14} className="mr-1" />
            <span>{promo.bank} Card</span>
          </div>
        </div>
      </div>
      
      <div className="p-5 pt-0 flex justify-between items-center border-t border-slate-100 mt-auto">
        <Link 
          to={`/promo/${promo.id}`}
          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
        >
          View Details
        </Link>
        
        {promo.externalLink && (
          <a 
            href={promo.externalLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-700"
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default PromoCard;