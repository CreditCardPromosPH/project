import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PromoCard from './PromoCard';
import { usePromos } from '../context/PromoContext';

const FeaturedPromoSection: React.FC = () => {
  const { promos, loading } = usePromos();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const featuredPromos = promos.filter(promo => promo.featured);
  
  useEffect(() => {
    const checkScrollButtons = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
      }
    };
    
    checkScrollButtons();
    
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [featuredPromos]);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll 80% of visible width
      
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
        <div className="animate-pulse h-64 bg-slate-200 rounded"></div>
      </div>
    );
  }
  
  if (featuredPromos.length === 0) {
    return null;
  }

  return (
    <section id="featured" className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Featured Promotions</h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full ${
              canScrollLeft 
                ? 'bg-white text-slate-700 shadow-sm hover:bg-slate-50' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full ${
              canScrollRight 
                ? 'bg-white text-slate-700 shadow-sm hover:bg-slate-50' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex space-x-6">
          {featuredPromos.map((promo) => (
            <div key={promo.id} className="w-[280px] md:w-[320px] flex-shrink-0">
              <PromoCard promo={promo} featured={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPromoSection;