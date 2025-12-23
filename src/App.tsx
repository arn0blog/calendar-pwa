import { useState } from 'react';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import DayDetail from './components/DayDetail';
import ReloadPrompt from './components/ReloadPrompt';
import ToolsModal from './components/tools/ToolsModal'; // Import ToolsModal
import { useCalendar } from './hooks/useCalendar';
import type { CalendarDay } from './types';

function App() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1); // 1-12
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [showToolsModal, setShowToolsModal] = useState(false); // New state for ToolsModal

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

  // Function to handle day click, which might also involve setting the selected date in ToolsModal later
  const handleDayClick = (day: CalendarDay) => {
    setSelectedDay(day);
    // Optionally, if the tools need the selected day immediately, pass it here
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
        onShowToolsModal={() => setShowToolsModal(true)} // Pass the function to open ToolsModal
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <CalendarGrid 
          days={days} 
          onDayClick={handleDayClick}
        />
      </main>

      <DayDetail 
        day={selectedDay} 
        onClose={() => setSelectedDay(null)} 
      />

      {/* Tools Modal */}
      <ToolsModal
        isOpen={showToolsModal}
        onClose={() => setShowToolsModal(false)}
        currentYear={currentYear} // Pass current context to tools modal
        currentMonth={currentMonth}
        days={days} // Pass current month's days for AuspiciousPicker
        // selectedDay={selectedDay} // Removed selectedDay prop as it's no longer used by ToolsModal children
        onSelectDayFromTool={setSelectedDay} // Allow tools to select a day
      />
    </div>
  );
}

export default App;