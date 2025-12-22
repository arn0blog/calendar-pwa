import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onYearChange,
  onMonthChange,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
      <button 
        onClick={onPrevMonth}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-600 dark:text-gray-300"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-2">
        <select 
          value={year}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="text-xl font-bold bg-transparent text-gray-900 dark:text-white border-none focus:ring-0 cursor-pointer appearance-none text-center"
        >
          {Array.from({ length: 20 }, (_, i) => year - 10 + i).map(y => (
            <option key={y} value={y}>{y}年</option>
          ))}
        </select>
        
        <select 
          value={month}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          className="text-xl font-bold bg-transparent text-gray-900 dark:text-white border-none focus:ring-0 cursor-pointer appearance-none text-center"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
            <option key={m} value={m}>{m}月</option>
          ))}
        </select>
      </div>

      <button 
        onClick={onNextMonth}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-600 dark:text-gray-300"
        aria-label="Next month"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CalendarHeader;
