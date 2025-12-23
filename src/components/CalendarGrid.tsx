import React, { useState, useRef, useEffect } from 'react';
import type { CalendarDay } from '../types';

interface CalendarGridProps {
  days: CalendarDay[];
  onDayClick: (day: CalendarDay) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const COOLDOWN_TIME = 500; // milliseconds
const SWIPE_THRESHOLD = 50; // pixels

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  onDayClick,
  onPrevMonth,
  onNextMonth,
}) => {
  const [lastActionTime, setLastActionTime] = useState(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null); // Create a ref for the container

  const handleAction = (action: () => void) => {
    const now = Date.now();
    if (now - lastActionTime < COOLDOWN_TIME) {
      return; // Ignore action during cooldown
    }
    action();
    setLastActionTime(now);
  };

  // Modified handleWheel to accept native WheelEvent
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault(); // Prevent page scrolling
    if (e.deltaY > 0) {
      handleAction(onNextMonth);
    } else if (e.deltaY < 0) {
      handleAction(onPrevMonth);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;

    if (deltaY > SWIPE_THRESHOLD) {
      // Swiped down (Prev Month)
      handleAction(onPrevMonth);
    } else if (deltaY < -SWIPE_THRESHOLD) {
      // Swiped up (Next Month)
      handleAction(onNextMonth);
    }
  };

  // useEffect to manually attach wheel event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [handleWheel]); // Depend on handleWheel to ensure latest version is used

  return (
    <div
      ref={containerRef} // Attach the ref to the container div
      className="w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-lg p-4 transition-all duration-300 ease-in-out touch-none" // Added touch-none
      // Removed onWheel prop from here
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((day, index) => (
          <div
            key={day}
            className={`text-center text-xs font-medium tracking-wide ${
              index === 0 || index === 6 ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
        {days.map((day, index) => {
          // Priority for content: Festival > Term > Lunar Day
          const contentText = day.festivals[0] || day.term || day.lunarDay;
          const lunarInfo = `${contentText} ${day.ganZhi}`;

          // Visual States
          const isWeekend = index % 7 === 0 || index % 7 === 6;

          // Background Styles
          let containerClass = 'bg-transparent';
          if (day.isToday) {
            containerClass = 'bg-[#5e5ce6] shadow-md shadow-indigo-200 dark:shadow-none';
          } else if (day.isHoliday) {
            containerClass = 'bg-red-50 dark:bg-red-900/10';
          }

          // Text Colors
          const solarTextColor = day.isToday
            ? 'text-white'
            : isWeekend
            ? 'text-red-500'
            : 'text-gray-900 dark:text-gray-100';

          const infoTextColor = day.isToday
            ? 'text-white/90'
            : 'text-gray-400';

          return (
            <button
              key={`${day.year}-${day.month}-${day.day}`}
              onClick={() => onDayClick(day)}
              className={`
                relative flex flex-col items-center justify-center
                h-16 w-full
                rounded-2xl
                transition-all duration-200
                outline-none
                ${containerClass}
                ${!day.isCurrentMonth ? 'opacity-30' : ''}
              `}
            >
              {/* Badges (Absolute positioning) */}
              {day.isToday && (
                <span className="absolute top-1 right-1 text-[10px] leading-none font-bold text-white/90">
                  今
                </span>
              )}
              {!day.isToday && day.isHoliday && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] leading-none bg-red-100 text-red-500 rounded-md">
                  休
                </span>
              )}
              {!day.isToday && day.isWorkDay && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] leading-none bg-gray-200 text-gray-500 rounded-md">
                  班
                </span>
              )}

              {/* Solar Date */}
              <span className={`text-2xl font-medium leading-none mb-1 ${solarTextColor}`}>
                {day.day}
              </span>

              {/* Lunar / Info Text */}
              <span className={`text-[10px] leading-none transform scale-90 whitespace-nowrap overflow-hidden max-w-full px-0.5 ${infoTextColor}`}>
                {lunarInfo}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;