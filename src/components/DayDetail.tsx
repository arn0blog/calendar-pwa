import React from 'react';
import { SolarDay } from 'tyme4ts'; // Only SolarDay is consistently exported and used
// LunarHour is not used as getLunarHours is not available on LunarDay

import type { CalendarDay } from '../types';

interface DayDetailProps {
  day: CalendarDay | null;
  onClose: () => void;
}

const DayDetail: React.FC<DayDetailProps> = ({ day, onClose }) => {
  if (!day) return null;

  // Re-fetch basic details from tyme4ts
  const solar = SolarDay.fromYmd(day.year, day.month, day.day);
  const lunar = solar.getLunarDay(); // This is the accessible LunarDay object

  // Helper to safely get name, returning empty string if null/undefined
  const getNameSafely = (obj: any) => obj ? obj.getName() : ''; // Still useful for existing working methods

  // Header Data
  const dayOfWeekNames = ['日', '一', '二', '三', '四', '五', '六'];
  const solarDateDisplay = `${day.year}年${day.month}月${day.day}日 星期${dayOfWeekNames[day.date.getDay()]}`;
  const lunarDateDisplay = `${lunar.getLunarMonth().getName()}${lunar.getName()}`;
  
  // Only Day GanZhi is reliably available from lunar.getSixtyCycle().getName()
  const dayGanZhi = getNameSafely(lunar.getSixtyCycle());
  // Mocking Year/Month GanZhi and Zodiac for header as actual API is missing.
  const mockYearGanZhi = '甲辰'; // Example
  const mockYearZodiac = '龙'; // Example
  const mockMonthGanZhi = '戊辰'; // Example
  const ganZhiDisplay = `${mockYearGanZhi}(${mockYearZodiac})年 ${mockMonthGanZhi}月 ${dayGanZhi}日`; // TODO: Connect to real API for Year/Month GanZhi and Zodiac

  // Yi & Ji Activities - these methods are available on LunarDay
  const recommends = lunar.getRecommends().map((t: any) => t.getName());
  const avoids = lunar.getAvoids().map((t: any) => t.getName());

  // Info Grid Data - All mocked as actual API is missing for LunarDay
  const naYin = '炉中火'; // TODO: Connect to real API for NaYin
  const chongSha = '冲猴 煞北'; // TODO: Connect to real API for ChongSha
  const zhiShen = '白虎(凶)'; // TODO: Connect to real API for ZhiShen
  const jianChu = '满'; // TODO: Connect to real API for JianChu
  const twentyEightStars = '室火猪 吉'; // TODO: Connect to real API for 28 Stars
  const fetusGod = '厨灶炉 外正南'; // TODO: Connect to real API for Fetus God
  const goodGods = '月空 天恩'; // TODO: Connect to real API for Good Gods
  const badGods = '五虚 归忌'; // TODO: Connect to real API for Bad Gods
  const pengZuGan = '丙不修灶'; // TODO: Connect to real API for PengZuGan
  const pengZuZhi = '寅不祭祀'; // TODO: Connect to real API for PengZuZhi

  // Hourly Luck (时辰吉凶) - Mocked as API is missing
  // TODO: Connect to real API for Hourly Luck
  const hourlyLuckData: { branch: string; luck: string; time: string }[] = [];
  const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const hourRanges = [
    '23:00-00:59', '01:00-02:59', '03:00-04:59', '05:00-06:59',
    '07:00-08:59', '09:00-10:59', '11:00-12:59', '13:00-14:59',
    '15:00-16:59', '17:00-18:59', '19:00-20:59', '21:00-22:59'
  ];
  for (let i = 0; i < 12; i++) {
      hourlyLuckData.push({
          branch: earthlyBranches[i],
          luck: i % 2 === 0 ? '吉' : '凶', // Alternating mock luck
          time: hourRanges[i]
      });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-3xl p-6 pb-12 shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-y-auto max-h-[95vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-2 bg-gray-400 dark:bg-zinc-600 rounded-full" />
        </div>

        {/* Header Section */}
        <div className="text-center mb-8 space-y-2">
          <p className="text-gray-900 dark:text-gray-100 text-lg font-bold">
            {solarDateDisplay}
          </p>
          <div className="flex items-center justify-center gap-4">
             <span className="text-red-600 dark:text-red-500 text-7xl font-black">{day.day}</span>
             <div className="text-left">
                <h2 className="text-red-600 dark:text-red-500 text-3xl font-black leading-tight">
                  {lunarDateDisplay}
                </h2>
                <p className="text-gray-900 dark:text-gray-100 text-lg font-bold">
                  {ganZhiDisplay}
                </p>
             </div>
          </div>
        </div>

        {/* Activities Section (Yi & Ji) */}
        <div className="flex flex-col gap-5 mb-8">
          <div className="p-4 rounded-xl border-2 border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full text-xl font-black shadow-md">宜</span>
              <h3 className="text-2xl font-black text-blue-800 dark:text-blue-300">宜事</h3>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-50 leading-relaxed tracking-wide">
              {recommends.length > 0 ? recommends.join(' · ') : '诸事皆宜'}
            </p>
          </div>

          <div className="p-4 rounded-xl border-2 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full text-xl font-black shadow-md">忌</span>
              <h3 className="text-2xl font-black text-red-800 dark:text-red-300">忌事</h3>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-50 leading-relaxed tracking-wide">
              {avoids.length > 0 ? avoids.join(' · ') : '无所禁忌'}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="border-2 border-amber-300 dark:border-amber-700 rounded-xl overflow-hidden text-gray-900 dark:text-gray-50 mb-8 shadow-sm">
          {/* Row 1 */}
          <div className="grid grid-cols-3 border-b-2 border-amber-300 dark:border-amber-700 bg-amber-50/30 dark:bg-zinc-800/50">
            <div className="p-4 border-r-2 border-amber-300 dark:border-amber-700 text-center">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">纳音</p>
              <p className="text-lg font-black">{naYin || '未知'}</p>
            </div>
            <div className="p-4 border-r-2 border-amber-300 dark:border-amber-700 text-center">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">冲煞</p>
              <p className="text-lg font-black">{chongSha || '未知'}</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">值神</p>
              <p className="text-lg font-black">{zhiShen || '未知'}</p>
            </div>
          </div>

          {/* Row 2: Hourly Luck */}
          <div className="grid grid-cols-[auto_1fr] border-b-2 border-amber-300 dark:border-amber-700">
            <div className="p-4 flex items-center justify-center border-r-2 border-amber-300 dark:border-amber-700 bg-amber-100/50 dark:bg-zinc-800">
              <p className="text-sm font-black text-amber-900 dark:text-amber-200 [writing-mode:vertical-lr] tracking-widest py-2">时辰吉凶</p>
            </div>
            <div className="grid grid-cols-4 gap-2 p-3 bg-white dark:bg-zinc-900">
              {hourlyLuckData.map((hour, i) => (
                <div key={i} className="text-center py-1">
                  <p className="text-lg font-black text-amber-800 dark:text-amber-400 leading-tight">{hour.branch}</p>
                  <p className={`text-base font-black ${hour.luck === '吉' ? 'text-green-700 dark:text-green-500' : 'text-red-700 dark:text-red-500'}`}>{hour.luck}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Gods & Positions */}
          <div className="grid grid-cols-[auto_1fr_auto] border-b-2 border-amber-300 dark:border-amber-700">
            {/* JianChu */}
            <div className="p-4 flex items-center justify-center border-r-2 border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-zinc-800/30">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400 [writing-mode:vertical-lr] tracking-wide mb-2">十二神</p>
              <p className="text-3xl font-black text-amber-900 dark:text-amber-200 ml-1">{jianChu || '未知'}</p>
            </div>

            {/* Middle Area (Gods) */}
            <div className="p-4 border-r-2 border-amber-300 dark:border-amber-700 flex flex-col justify-center space-y-4 bg-white dark:bg-zinc-900">
              <div>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">吉神宜趋</p>
                <p className="text-lg font-black text-green-700 dark:text-green-400 leading-snug">{goodGods || '无'}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">今日胎神</p>
                <p className="text-lg font-black text-amber-900 dark:text-amber-300 leading-snug">{fetusGod || '未知'}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">凶神宜忌</p>
                <p className="text-lg font-black text-red-700 dark:text-red-400 leading-snug">{badGods || '无'}</p>
              </div>
            </div>

            {/* 28 Stars */}
            <div className="p-4 flex items-center justify-center bg-amber-50/50 dark:bg-zinc-800/30">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400 [writing-mode:vertical-lr] tracking-wide mb-2">廿八星宿</p>
              <p className="text-2xl font-black text-amber-900 dark:text-amber-200 ml-1">{twentyEightStars.substring(0, 1)}</p>
            </div>
          </div>

          {/* Row 4: PengZu */}
          <div className="p-5 text-center bg-amber-50/20 dark:bg-zinc-800/40">
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">彭祖百忌</p>
            <p className="text-xl font-black mb-1">{pengZuGan || '未知'}</p>
            <p className="text-xl font-black">{pengZuZhi || '未知'}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-5 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl text-2xl font-black shadow-lg hover:bg-black dark:hover:bg-white transition-all active:scale-95"
        >
          我知道了
        </button>
      </div>
    </div>
  );
};

export default DayDetail;