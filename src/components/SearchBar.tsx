import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { usePromos } from '../context/PromoContext';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setFilters } = usePromos();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, searchTerm }));
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    setFilters(prev => ({ ...prev, searchTerm: '' }));
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-slate-400" />
        </div>
        <input
          type="search"
          className="block w-full pl-10 pr-10 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white transition-all"
          placeholder="Search promos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            type="button"
            className="absolute inset-y-0 right-12 flex items-center pr-2"
            onClick={clearSearch}
          >
            <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-0 inset-y-0 flex items-center pr-3 text-primary-600 hover:text-primary-800"
        >
          <span className="text-sm font-medium">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;