import React from 'react';
import { SolarDay } from 'tyme4ts';
import type { CalendarDay } from '../types';

interface DayDetailProps {
  day: CalendarDay | null;
  onClose: () => void;
}

const DayDetail: React.FC<DayDetailProps> = ({ day, onClose }) => {
  if (!day) return null;

  // Re-fetch heavy details on render to keep the lightweight list fast
  const solar = SolarDay.fromYmd(day.year, day.month, day.day);
  const lunar = solar.getLunarDay();
  const recommends = lunar.getRecommends().map(t => t.getName());
  const avoids = lunar.getAvoids().map(t => t.getName());

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-2xl p-6 pb-10 shadow-xl animate-in slide-in-from-bottom duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-2">
           <div className="w-12 h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full" />
        </div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
              {day.day}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {day.year}年{day.month}月
            </div>
          </div>
          <div className="text-right">
             <div className="text-2xl font-semibold text-amber-600 dark:text-amber-500">
               {day.lunarMonth}{day.lunarDay}
             </div>
             <div className="text-gray-500 dark:text-gray-400 text-sm">
               {day.ganZhi}日
             </div>
          </div>
        </div>

        {/* Lucky / Unlucky Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full text-xs font-bold">宜</span>
              <h3 className="font-semibold text-green-700 dark:text-green-400">Suitable For</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {recommends.length > 0 ? recommends.slice(0, 6).join('、') : '诸事不宜'}
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full text-xs font-bold">忌</span>
              <h3 className="font-semibold text-red-700 dark:text-red-400">Avoid</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {avoids.length > 0 ? avoids.slice(0, 6).join('、') : '诸事无忌'}
            </p>
          </div>
        </div>
        
        {/* Festivals / Terms */}
        {(day.term || day.festivals.length > 0) && (
            <div className="flex flex-wrap gap-2">
                {day.term && (
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm rounded-full font-medium">
                        {day.term}
                    </span>
                )}
                {day.festivals.map((f, i) => (
                    <span key={i} className="px-3 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm rounded-full font-medium">
                        {f}
                    </span>
                ))}
            </div>
        )}

        <button 
            onClick={onClose} 
            className="w-full mt-8 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
        >
            Close
        </button>
      </div>
    </div>
  );
};

export default DayDetail;
