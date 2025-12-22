import React from 'react';
import type { CalendarDay } from '../types';

interface CalendarGridProps {
  days: CalendarDay[];
  onDayClick: (day: CalendarDay) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid: React.FC<CalendarGridProps> = ({ days, onDayClick }) => {
  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-gray-100 dark:border-zinc-800">
        {WEEKDAYS.map((day, index) => (
          <div 
            key={day} 
            className={`py-3 text-center text-xs font-semibold uppercase tracking-wider ${
              index === 0 || index === 6 ? 'text-red-500' : 'text-gray-400 dark:text-zinc-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 auto-rows-fr flex-1 bg-white dark:bg-zinc-900">
        {days.map((day, index) => {
          // Priority for labels: Festival > Term > Lunar Day
          const bottomText = day.festivals[0] || day.term || day.lunarDay;
          const isFestival = day.festivals.length > 0;
          const isTerm = !!day.term;
          const isWeekend = index % 7 === 0 || index % 7 === 6;

          return (
            <button
              key={`${day.year}-${day.month}-${day.day}`}
              onClick={() => onDayClick(day)}
              className={`
                relative min-h-[80px] flex flex-col items-center justify-start py-2 border-b border-r border-gray-50 dark:border-zinc-800/50 outline-none
                ${!day.isCurrentMonth ? 'bg-gray-50/50 dark:bg-zinc-900/50 opacity-40' : 'bg-white dark:bg-zinc-900'}
                ${day.isToday ? 'bg-blue-50 dark:bg-blue-900/10' : ''}
                active:bg-gray-100 dark:active:bg-zinc-800 transition-colors
              `}
            >
              {/* Solar Day */}
              <span className={`
                text-lg font-medium mb-0.5
                ${day.isToday 
                  ? 'w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-sm' 
                  : isWeekend 
                    ? 'text-gray-800 dark:text-gray-200' 
                    : 'text-gray-900 dark:text-white'
                }
              `}>
                {day.day}
              </span>

              {/* Lunar/Festival Text */}
              <span className={`
                text-[10px] transform scale-90 font-medium truncate w-full px-1 text-center
                ${isFestival ? 'text-red-500' : isTerm ? 'text-indigo-500' : 'text-gray-400 dark:text-zinc-500'}
              `}>
                {bottomText}
              </span>

              {/* Work/Holiday Badge */}
              {day.isWorkDay === true && (
                <span className="absolute top-1 right-1 text-[8px] bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 px-1 rounded">班</span>
              )}
              {day.isHoliday === true && (
                <span className="absolute top-1 right-1 text-[8px] bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-1 rounded">休</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
