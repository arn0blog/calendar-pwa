import React, { useState, useMemo } from 'react';
import type { CalendarDay } from '../../types';

interface ZodiacFortuneProps {
  days: CalendarDay[]; // All days of the current month
  onSelectDay: (day: CalendarDay) => void;
  onClose: () => void;
}

const ZodiacAnimals = [
  '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'
];

// Earthly Branches (地支) mapping to Zodiac Animals (生肖)
const ZodiacToEarthlyBranch: { [key: string]: string } = {
  '鼠': '子', '牛': '丑', '虎': '寅', '兔': '卯', '龙': '辰', '蛇': '巳',
  '马': '午', '未': '羊', '申': '申', '酉': '酉', '戌': '戌', '猪': '亥' // Fixed '猴' to '申' and added missing
};

// Earthly Branch to Zodiac Animal for display
const EarthlyBranchToZodiac: { [key: string]: string } = {
  '子': '鼠', '丑': '牛', '寅': '虎', '卯': '兔', '辰': '龙', '巳': '蛇',
  '午': '马', '未': '羊', '申': '猴', '酉': '鸡', '戌': '狗', '亥': '猪'
};

// Zodiac Relationships based on Earthly Branches
const ZodiacRelations: {
  六合: { [key: string]: string };
  三合: { [key: string]: string[] };
  六冲: { [key: string]: string };
  六害: { [key: string]: string };
} = {
  // Six Harmonies (六合) - 大吉 (Great Luck)
  '六合': {
    '子': '丑', '丑': '子', '寅': '亥', '卯': '戌', '辰': '酉', '巳': '申',
    '午': '未', '未': '午', '申': '巳', '酉': '辰', '戌': '卯', '亥': '寅'
  },
  // Three Harmonies (三合) - 吉 (Good Luck)
  '三合': {
    '申': ['子', '辰'], '子': ['申', '辰'], '辰': ['申', '子'],
    '亥': ['卯', '未'], '卯': ['亥', '未'], '未': ['亥', '卯'],
    '寅': ['午', '戌'], '午': ['寅', '戌'], '戌': ['寅', '午'],
    '巳': ['酉', '丑'], '酉': ['巳', '丑'], '丑': ['巳', '酉']
  },
  // Six Clashes (六冲) - 冲 (Clash) - 凶 (Bad)
  '六冲': {
    '子': '午', '丑': '未', '寅': '申', '卯': '酉', '辰': '戌', '巳': '亥',
    '午': '子', '未': '丑', '申': '寅', '酉': '卯', '戌': '辰', '亥': '巳'
  },
  // Six Harms (六害) - 害 (Harm) - 凶 (Bad)
  '六害': {
    '子': '未', '丑': '午', '寅': '巳', '卯': '辰', '辰': '卯', '巳': '寅', // Note: 辰-卯 and 卯-辰 are reciprocal
    '午': '丑', '未': '子', '申': '亥', '酉': '戌', '戌': '酉', '亥': '申' // Note: 酉-戌 and 戌-酉 are reciprocal
  },
};


const ZodiacFortune: React.FC<ZodiacFortuneProps> = ({ days, onSelectDay, onClose }) => {
  const [userZodiac, setUserZodiac] = useState(ZodiacAnimals[0]);

  const monthlyFortune = useMemo(() => {
    const luckyDays: { day: CalendarDay; reason: string }[] = [];
    const cautionDays: { day: CalendarDay; reason: string }[] = [];

    const userBranch = ZodiacToEarthlyBranch[userZodiac];
    if (!userBranch) return { luckyDays, cautionDays };

    days.forEach(day => {
      const dayBranch = day.lunar.getSixtyCycle().getName().substring(1, 2);

      let fortuneType: '大吉' | '吉' | '冲' | '害' | '平' = '平';
      let reason = '平稳';

      // Check Six Harmonies (六合) - 大吉
      if (ZodiacRelations['六合'][userBranch] === dayBranch) {
        fortuneType = '大吉';
        reason = `六合 (${EarthlyBranchToZodiac[dayBranch]})`;
      }
      // Check Three Harmonies (三合) - 吉
      else if (ZodiacRelations['三合'][userBranch]?.includes(dayBranch)) {
        fortuneType = '吉';
        reason = `三合 (${EarthlyBranchToZodiac[dayBranch]})`;
      }
      // Check Six Clashes (六冲) - 冲
      else if (ZodiacRelations['六冲'][userBranch] === dayBranch) {
        fortuneType = '冲';
        reason = `六冲 (${EarthlyBranchToZodiac[dayBranch]})`;
      }
      // Check Six Harms (六害) - 害
      else if (ZodiacRelations['六害'][userBranch] === dayBranch) {
        fortuneType = '害';
        reason = `六害 (${EarthlyBranchToZodiac[dayBranch]})`;
      }

      if (fortuneType === '大吉' || fortuneType === '吉') {
        luckyDays.push({ day, reason });
      } else if (fortuneType === '冲' || fortuneType === '害') {
        cautionDays.push({ day, reason });
      }
    });

    return { luckyDays, cautionDays };
  }, [days, userZodiac]);


  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">生肖运势 (Zodiac Fortune)</h3>

      <div className="mb-4">
        <label htmlFor="user-zodiac-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          您的生肖:
        </label>
        <select
          id="user-zodiac-select"
          value={userZodiac}
          onChange={(e) => setUserZodiac(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-100"
        >
          {ZodiacAnimals.map(zodiac => (
            <option key={zodiac} value={zodiac}>{zodiac}</option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {/* Lucky Days */}
        <div>
          <h4 className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">✨ 吉日 (Lucky Days)</h4>
          {monthlyFortune.luckyDays.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2">
              {monthlyFortune.luckyDays.map(({ day, reason }) => (
                <button
                  key={`${day.year}-${day.month}-${day.day}`}
                  onClick={() => { onSelectDay(day); onClose(); }}
                  className="flex flex-col items-center p-2 border rounded-lg border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors"
                >
                  <span className="text-base font-bold text-green-700 dark:text-green-300">
                    {day.month}月{day.day}日
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {reason}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">本月没有特别吉利的日期。</p>
          )}
        </div>

        {/* Caution Days */}
        <div>
          <h4 className="text-lg font-medium mb-2 text-red-600 dark:text-red-400">⚠️ 凶日 (Caution Days)</h4>
          {monthlyFortune.cautionDays.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2">
              {monthlyFortune.cautionDays.map(({ day, reason }) => (
                <button
                  key={`${day.year}-${day.month}-${day.day}`}
                  onClick={() => { onSelectDay(day); onClose(); }}
                  className="flex flex-col items-center p-2 border rounded-lg border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                >
                  <span className="text-base font-bold text-red-700 dark:text-red-300">
                    {day.month}月{day.day}日
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {reason}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">本月没有特别需要注意的日期。</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZodiacFortune;