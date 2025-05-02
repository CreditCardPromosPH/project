import React, { useState } from 'react';
import { Filter, ArrowUp } from 'lucide-react';
import { usePromos } from '../context/PromoContext';
import FeaturedPromoSection from '../components/FeaturedPromoSection';
import PromoGrid from '../components/PromoGrid';
import BankFilter from '../components/BankFilter';
import CategoryFilter from '../components/CategoryFilter';
import SkeletonLoader from '../components/SkeletonLoader';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  const { loading } = usePromos();
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <section className="mb-12">
        <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Never Miss a Credit Card Deal Again
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-6">
              Discover the best promotions from all major banks in one place.
              Updated daily so you always have the latest offers.
            </p>
            <a 
              href="#promos"
              className="inline-block bg-white text-primary-800 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              Explore Promotions
            </a>
          </div>
        </div>
      </section>
      
      <FeaturedPromoSection />
      
      <section id="promos" className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-col gap-4 flex-grow">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">All Promotions</h2>
            <SearchBar />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Filter size={18} />
            <span>Filter Promotions</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BankFilter />
              <CategoryFilter />
            </div>
          </div>
        )}
        
        {loading ? <SkeletonLoader /> : <PromoGrid />}
      </section>
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all text-primary-600 hover:text-primary-800"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default HomePage;