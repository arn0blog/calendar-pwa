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
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-3xl p-6 pb-10 shadow-xl animate-in slide-in-from-bottom duration-300 overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-2 bg-gray-300 dark:bg-zinc-700 rounded-full" />
        </div>

        {/* Header Section */}
        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-400 text-base mb-1">
            {solarDateDisplay}
          </p>
          <h2 className="text-red-600 dark:text-red-500 text-4xl font-bold mb-1">
            {lunarDateDisplay}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {ganZhiDisplay}
          </p>
        </div>

        {/* Activities Section (Yi & Ji) */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full text-xs font-bold">宜</span>
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">宜事</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              {recommends.length > 0 ? recommends.join('、') : '诸事皆宜'}
            </p>
          </div>

          <div className="flex-1 p-3 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full text-xs font-bold">忌</span>
              <h3 className="font-semibold text-red-700 dark:text-red-400">忌事</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              {avoids.length > 0 ? avoids.join('、') : '无所禁忌'}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="border border-amber-200 dark:border-amber-700 rounded-lg overflow-hidden text-gray-800 dark:text-gray-100 mb-6">
          {/* Row 1 */}
          <div className="grid grid-cols-3 border-b border-amber-200 dark:border-amber-700">
            <div className="p-3 border-r border-amber-200 dark:border-amber-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">纳音</p>
              <p className="text-base font-medium">{naYin || '未知'}</p>
            </div>
            <div className="p-3 border-r border-amber-200 dark:border-amber-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">冲煞</p>
              <p className="text-base font-medium">{chongSha || '未知'}</p>
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">值神</p>
              <p className="text-base font-medium">{zhiShen || '未知'}</p>
            </div>
          </div>

          {/* Row 2: Hourly Luck */}
          <div className="grid grid-cols-[auto_1fr] border-b border-amber-200 dark:border-amber-700">
            <div className="p-3 flex items-center justify-center border-r border-amber-200 dark:border-amber-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 [writing-mode:vertical-lr] tracking-wide">时辰吉凶</p>
            </div>
            <div className="grid grid-cols-4 gap-x-2 gap-y-1 p-2">
              {hourlyLuckData.map((hour, i) => (
                <div key={i} className="text-center text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-300">{hour.branch}</p>
                  <p className={`text-xs ${hour.luck === '吉' ? 'text-green-600' : 'text-red-600'}`}>{hour.luck}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Gods & Positions */}
          <div className="grid grid-cols-[auto_1fr_auto] border-b border-amber-200 dark:border-amber-700">
            {/* JianChu */}
            <div className="p-3 flex items-center justify-center border-r border-amber-200 dark:border-amber-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 [writing-mode:vertical-lr] tracking-wide">建除十二神</p>
              <p className="text-lg font-bold text-amber-800 dark:text-amber-300 ml-2">{jianChu || '未知'}</p>
            </div>

            {/* Middle Area (Gods) */}
            <div className="p-3 border-r border-amber-200 dark:border-amber-700 flex flex-col justify-center">
              <div className="mb-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">吉神宜趋</p>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">{goodGods || '无'}</p>
              </div>
              <div className="mb-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">今日胎神</p>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300">{fetusGod || '未知'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">凶神宜忌</p>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">{badGods || '无'}</p>
              </div>
            </div>

            {/* 28 Stars */}
            <div className="p-3 flex items-center justify-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 [writing-mode:vertical-lr] tracking-wide">二十八星宿</p>
              <p className="text-lg font-bold text-amber-800 dark:text-amber-300 ml-2">{twentyEightStars || '未知'}</p>
            </div>
          </div>

          {/* Row 4: PengZu */}
          <div className="p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">彭祖百忌</p>
            <p className="text-base font-medium">{pengZuGan || '未知'}</p>
            <p className="text-base font-medium">{pengZuZhi || '未知'}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-8 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
        >
          关闭
        </button>
      </div>
    </div>
  );
};

export default DayDetail;
