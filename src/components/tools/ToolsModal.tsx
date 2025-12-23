import React, { useState } from 'react';
import AuspiciousPicker from './AuspiciousPicker';
import ZodiacFortune from './ZodiacFortune';
// import ProData from './ProData'; // Removed ProData import
import type { CalendarDay } from '../../types';

interface ToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentYear: number;
  currentMonth: number;
  days: CalendarDay[]; // All days of the current month
  // selectedDay: CalendarDay | null; // Removed as it's no longer used by child components
  onSelectDayFromTool: (day: CalendarDay) => void;
}

type ToolType = 'auspicious' | 'zodiac'; // Removed 'prodata'

const ToolsModal: React.FC<ToolsModalProps> = ({
  isOpen,
  onClose,
  currentYear,
  currentMonth,
  days,
  // selectedDay, // Removed from destructuring
  onSelectDayFromTool,
}) => {
  const [activeTool, setActiveTool] = useState<ToolType>('auspicious'); // Default to 'auspicious'

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full h-[90vh] max-h-screen bg-white dark:bg-zinc-900 rounded-t-3xl p-6 shadow-xl animate-in slide-in-from-bottom duration-300
                   md:h-full md:w-80 md:rounded-l-3xl md:rounded-t-none md:fixed md:right-0 md:top-0 md:slide-in-from-right overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">工具箱 (Toolbox)</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close tools"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-around border-b border-gray-200 dark:border-zinc-700 mb-4">
          <button
            className={`py-2 px-4 text-center text-sm font-medium ${
              activeTool === 'auspicious'
                ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTool('auspicious')}
          >
            择吉日
          </button>
          <button
            className={`py-2 px-4 text-center text-sm font-medium ${
              activeTool === 'zodiac'
                ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTool('zodiac')}
          >
            生肖运势
          </button>
          {/* Removed Professional Data Tab */}
          {/* {activeTool === 'prodata' && (
            <ProData
              selectedDay={selectedDay}
              currentYear={currentYear}
              currentMonth={currentMonth}
            />
          )} */}
        </div>

        {/* Tool Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTool === 'auspicious' && (
            <AuspiciousPicker
              currentYear={currentYear}
              currentMonth={currentMonth}
              days={days}
              onSelectDay={onSelectDayFromTool}
              onClose={onClose}
            />
          )}
          {activeTool === 'zodiac' && (
            <ZodiacFortune
              // selectedDay={selectedDay} // Removed selectedDay prop
              days={days} // Pass days prop to ZodiacFortune for monthly overview
              onSelectDay={onSelectDayFromTool}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsModal;
