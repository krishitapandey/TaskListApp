import { useState, useEffect } from 'react';

export default function TaskFilter({ currentFilter, onFilterChange, onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const filters = ['All', 'Active', 'Completed'];

  // Custom debouncing logic: delay search update by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearchChange]);

  return (
    <div className="flex flex-col gap-4 mb-6 border-b border-slate-200 dark:border-[#1e2f47] pb-4">
      {/* Debounced Search Input */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search tasks by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#070e17] text-[#070e17] dark:text-slate-100 border border-slate-300 dark:border-[#1e2d42] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs font-medium cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Category Tabs */}
      <div className="flex gap-2">
        {filters.map((filter) => {
          const isActive = currentFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-200 dark:bg-[#0e1a2b] text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-[#15263d] border border-slate-300 dark:border-[#1e2d42]'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}