import React from 'react';
import { Tag } from 'lucide-react';
import { usePromos } from '../context/PromoContext';

const CategoryFilter: React.FC = () => {
  const { filters, setFilters } = usePromos();

  // ✅ Define fixed categories here
  const fixedCategories = [
    'Dining',
    'Shopping',
    'Travel & Leisure',
    'Health & Wellness',
    'Installments & Financing',
    'Online',
    'Welcome Gift',
    'Others',
  ];

  const handleCategoryClick = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? null : category
    }));
  };

  const getCategoryColor = (category: string): string => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-red-100 text-red-800',
      'bg-orange-100 text-orange-800',
    ];
    const index = category.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-slate-800">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {fixedCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`
              group flex items-center px-3 py-2 rounded-lg border transition-all
              ${filters.category === category 
                ? getCategoryColor(category) + ' border-current opacity-100' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 opacity-90 hover:opacity-100'
              }
            `}
          >
            <Tag size={14} className="mr-1.5" />
            <span className="text-sm font-medium">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;