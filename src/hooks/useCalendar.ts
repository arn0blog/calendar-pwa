import { useState, useEffect } from 'react';
import { SolarDay } from 'tyme4ts';
import type { CalendarDay } from '../types';

export const useCalendar = (year: number, month: number) => {
  const [days, setDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    const generateCalendar = () => {
      try {
        const calendarDays: CalendarDay[] = [];
        
        // month is 1-12 in our input, convert to 0-11 for Date
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const dayOfWeek = firstDayOfMonth.getDay(); // 0 (Sunday) - 6 (Saturday)
        
        // Calculate start date (first cell of the 6x7 grid)
        const startDate = new Date(firstDayOfMonth);
        startDate.setDate(startDate.getDate() - dayOfWeek);

        const today = new Date();

        for (let i = 0; i < 42; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          
          const currentY = currentDate.getFullYear();
          const currentM = currentDate.getMonth() + 1; // 1-12
          const currentD = currentDate.getDate();

          // Tyme4ts initialization
          // Using SolarDay as verified in d.ts. If runtime fails, check console.
          const solar = SolarDay.fromYmd(currentY, currentM, currentD);
          const lunar = solar.getLunarDay();
          
          let termName: string | null = null;
          const term = solar.getTerm();
          if (term.getJulianDay().getDay() === solar.getJulianDay().getDay()) {
             termName = term.getName();
          }

          const festivals: string[] = [];
          
          const solarFest = solar.getFestival();
          if (solarFest) {
            festivals.push(solarFest.getName());
          }

          const lunarFest = lunar.getFestival();
          if (lunarFest) {
            festivals.push(lunarFest.getName());
          }

          const legalHoliday = solar.getLegalHoliday();
          const isHoliday = legalHoliday ? !legalHoliday.isWork() : undefined;
          const isWorkDay = legalHoliday ? legalHoliday.isWork() : undefined;

          calendarDays.push({
            date: currentDate,
            year: currentY,
            month: currentM,
            day: currentD,
            isCurrentMonth: currentM === month,
            isToday: 
              currentY === today.getFullYear() && 
              currentM === (today.getMonth() + 1) && 
              currentD === today.getDate(),
            lunarDay: lunar.getName(),
            lunarMonth: lunar.getLunarMonth().getName(),
            ganZhi: lunar.getSixtyCycle().getName(),
            term: termName,
            festivals,
            isHoliday,
            isWorkDay
          });
        }
        
        setDays(calendarDays);
      } catch (e) {
        console.error("Error generating calendar:", e);
      }
    };

    generateCalendar();
  }, [year, month]);

  return days;
};
