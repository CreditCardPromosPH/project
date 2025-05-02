import React from 'react';

interface SkeletonProps {
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full border border-slate-200 animate-pulse">
          <div className="bg-slate-200 h-48 w-full"></div>
          <div className="p-5">
            <div className="flex space-x-2 mb-4">
              <div className="h-6 bg-slate-200 rounded w-24"></div>
              <div className="h-6 bg-slate-200 rounded w-20"></div>
            </div>
            <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-slate-200 rounded w-full mb-4"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          </div>
          <div className="p-5 pt-0 mt-auto">
            <div className="h-5 bg-slate-200 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;