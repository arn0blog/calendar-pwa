import { useState } from 'react';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import DayDetail from './components/DayDetail';
import ReloadPrompt from './components/ReloadPrompt';
import { useCalendar } from './hooks/useCalendar';
import type { CalendarDay } from './types';

function App() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1); // 1-12
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const days = useCalendar(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      <ReloadPrompt />
      <CalendarHeader
        year={currentYear}
        month={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onYearChange={setCurrentYear}
        onMonthChange={setCurrentMonth}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <CalendarGrid 
          days={days} 
          onDayClick={setSelectedDay}
        />
      </main>

      <DayDetail 
        day={selectedDay} 
        onClose={() => setSelectedDay(null)} 
      />
    </div>
  );
}

export default App;