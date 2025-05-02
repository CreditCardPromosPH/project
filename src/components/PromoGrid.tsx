import React from 'react';
import PromoCard from './PromoCard';
import { usePromos } from '../context/PromoContext';

interface PromoGridProps {
  featured?: boolean;
  maxItems?: number;
}

const PromoGrid: React.FC<PromoGridProps> = ({ featured = false, maxItems }) => {
  const { filteredPromos } = usePromos();
  
  // If featured is true, show only featured promos
  // Otherwise, show all promos that match the filters
  let promosToShow = featured 
    ? filteredPromos.filter(promo => promo.featured)
    : filteredPromos;
    
  // If maxItems is provided, limit the number of promos to show
  if (maxItems && maxItems > 0) {
    promosToShow = promosToShow.slice(0, maxItems);
  }
  
  if (promosToShow.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">No promotions found matching your criteria.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {promosToShow.map((promo) => (
        <PromoCard key={promo.id} promo={promo} featured={featured || promo.featured} />
      ))}
    </div>
  );
};

export default PromoGrid;