import React, { createContext, useContext, useState, useEffect } from 'react';
import { Promo, PromoFilters } from '../types';
import { fetchPromosFromGoogleSheets } from '../services/googleSheetsService';

interface PromoContextType {
  promos: Promo[];
  filteredPromos: Promo[];
  loading: boolean;
  error: string | null;
  banks: string[];
  categories: string[];
  filters: PromoFilters;
  setFilters: React.Dispatch<React.SetStateAction<PromoFilters>>;
}

const PromoContext = createContext<PromoContextType | undefined>(undefined);

export const PromoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PromoFilters>({
    searchTerm: '',
    bank: null,
    category: null,
  });
  
  useEffect(() => {
    console.log('PromoProvider: useEffect triggered');
    const loadPromos = async () => {
      try {
        console.log('PromoProvider: Starting to fetch promos');
        setLoading(true);
        const data = await fetchPromosFromGoogleSheets();
        console.log('PromoProvider: Successfully fetched promos:', data);
        setPromos(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching promos:', err);
        setError('Failed to load promotions. Please try again later.');
        // Load mock data in dev environment
        if (import.meta.env.DEV) {
          console.log('PromoProvider: Falling back to mock data');
          import('../mockData').then(module => {
            setPromos(module.mockPromos);
            setError(null);
          });
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadPromos();
  }, []);
  
  // Extract unique banks and categories from promos
  const banks = [...new Set(promos.map(promo => promo.bank))].sort();
  const categories = [...new Set(promos.map(promo => promo.category))].sort();
  
  // Apply filters to promos
  const filteredPromos = promos.filter(promo => {
    // Apply search filter
    if (filters.searchTerm && !promo.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !promo.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !promo.bank.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !promo.category.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply bank filter
    if (filters.bank && promo.bank !== filters.bank) {
      return false;
    }
    
    // Apply category filter
    if (filters.category && promo.category !== filters.category) {
      return false;
    }
    
    return true;
  });
  
  return (
    <PromoContext.Provider value={{
      promos,
      filteredPromos,
      loading,
      error,
      banks,
      categories,
      filters,
      setFilters,
    }}>
      {children}
    </PromoContext.Provider>
  );
};

export const usePromos = () => {
  const context = useContext(PromoContext);
  if (context === undefined) {
    throw new Error('usePromos must be used within a PromoProvider');
  }
  return context;
};