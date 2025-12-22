export interface CalendarDay {
  date: Date;
  year: number;
  month: number;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  lunarDay: string;      // e.g. 初一
  lunarMonth: string;    // e.g. 正月
  ganZhi: string;        // Day GanZhi e.g. 甲子
  term: string | null;   // Solar Term e.g. 清明
  festivals: string[];   // Combined list of Solar/Lunar festivals
  isWorkDay?: boolean;   // For legal holidays
  isHoliday?: boolean;   // For legal holidays
}
