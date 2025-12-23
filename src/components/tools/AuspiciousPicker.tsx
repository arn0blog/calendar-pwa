import React, { useState, useMemo } from 'react';
import type { CalendarDay } from '../../types';

interface AuspiciousPickerProps {
  currentYear: number;
  currentMonth: number;
  days: CalendarDay[];
  onSelectDay: (day: CalendarDay) => void;
  onClose: () => void;
}

const AuspiciousActivities = [
  '嫁娶', '出行', '搬家', '开业', '祭祀', '祈福', '安床', '修造', '动土', '交易', '立券', '纳财', '入宅', '移徙', '解除', '破土', '启钻', '安葬', '订盟', '纳采'
];

// Keyword Mapping Strategy
const ActivityKeywordMap: { [key: string]: string[] } = {
  '搬家': ['移徙', '入宅'],
  '开业': ['开市', '开业'],
  '嫁娶': ['嫁娶', '结婚'],
  // For other activities, the user-selected activity is the keyword itself
};

const AuspiciousPicker: React.FC<AuspiciousPickerProps> = ({ days, onSelectDay, onClose }) => {
  const [selectedActivity, setSelectedActivity] = useState(AuspiciousActivities[0]);

  const auspiciousDays = useMemo(() => {
    if (!selectedActivity) return [];

    const targetKeywords = ActivityKeywordMap[selectedActivity] || [selectedActivity];

    return days.filter(day => {
      const lunarRecommends = day.lunar.getRecommends().map(t => t.getName());
      // Check if any of the target keywords are present in lunarRecommends
      return targetKeywords.some(keyword => lunarRecommends.includes(keyword));
    });
  }, [days, selectedActivity]);

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">择吉日 (Auspicious Date Picker)</h3>

      <div className="mb-4">
        <label htmlFor="activity-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">选择活动:</label>
        <select
          id="activity-select"
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-100"
        >
          {AuspiciousActivities.map(activity => (
            <option key={activity} value={activity}>{activity}</option>
          ))}
        </select>
      </div>

      <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
        {selectedActivity ? `${selectedActivity} 的吉日` : '请选择活动'}
      </h4>

      <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
        {auspiciousDays.length > 0 ? (
          auspiciousDays.map(day => (
            <button
              key={`${day.year}-${day.month}-${day.day}`}
              onClick={() => {
                onSelectDay(day);
                onClose();
              }}
              className="flex flex-col items-center p-3 border rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors
                         border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10"
            >
              <span className="text-lg font-bold text-green-700 dark:text-green-300">
                {day.month}月{day.day}日
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {day.lunarMonth}{day.lunarDay}
              </span>
            </button>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500 dark:text-gray-400">
            {selectedActivity ? `本月没有适合${selectedActivity}的吉日` : '请选择一个活动来查找吉日'}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuspiciousPicker;