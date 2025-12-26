import React from 'react';

export function NewsSkeleton({ columns = 2, count = 6, small = false }: { columns?: number; count?: number; small?: boolean }) {
  const arr = Array.from({ length: count });
  // classes for responsive grid: if columns=2 we still rely on parent grid; skeleton items just mimic card
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {arr.map((_, i) => (
        <div key={i} className="border rounded-lg p-4 flex gap-4 animate-pulse">
          <div className={`w-[120px] ${small ? 'h-[60px]' : 'h-[84px]'} bg-gray-300 rounded`} />
          <div className="flex-1 space-y-3 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-3 bg-gray-300 rounded w-full" />
            {!small && <div className="h-3 bg-gray-300 rounded w-5/6" />}
            <div className="h-3 bg-gray-300 rounded w-1/4 mt-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
