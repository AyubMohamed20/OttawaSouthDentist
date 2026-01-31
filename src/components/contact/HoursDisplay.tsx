'use client';

import { useMemo } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface HoursEntry {
  day: string;
  hours: string;
  isOpen: boolean;
}

interface HoursDisplayProps {
  hours: HoursEntry[];
  holidayNotice?: string;
  className?: string;
}

function getCurrentDayIndex(): number {
  // JavaScript getDay() returns 0 for Sunday, 1 for Monday, etc.
  // We want Monday = 0, Sunday = 6 to match our hours array
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

function isCurrentlyOpen(currentHours: string): { isOpen: boolean; closingSoon: boolean } {
  if (currentHours === 'Closed') {
    return { isOpen: false, closingSoon: false };
  }

  // Parse hours string like "9:00 AM – 6:00 PM"
  const match = currentHours.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) {
    return { isOpen: false, closingSoon: false };
  }

  // eslint-disable-next-line no-unused-vars
  const [_, oH, oM, oP, cH, cM, cP] = match;
  const openHour = oH as string;
  const openMin = oM as string;
  const openPeriod = oP as string;
  const closeHour = cH as string;
  const closeMin = cM as string;
  const closePeriod = cP as string;

  // Convert to 24-hour format
  const toMinutes = (hour: string, min: string, period: string): number => {
    let h = parseInt(hour, 10);
    const m = parseInt(min, 10);
    if (period.toUpperCase() === 'PM' && h !== 12) h += 12;
    if (period.toUpperCase() === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  };

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = toMinutes(openHour, openMin, openPeriod);
  const closeMinutes = toMinutes(closeHour, closeMin, closePeriod);

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  const closingSoon = isOpen && (closeMinutes - currentMinutes) <= 60; // Within 1 hour of closing

  return { isOpen, closingSoon };
}

export function HoursDisplay({ hours, holidayNotice, className = '' }: HoursDisplayProps) {
  const currentDayIndex = useMemo(() => getCurrentDayIndex(), []);

  const todayHours = hours[currentDayIndex];
  const { isOpen, closingSoon } = useMemo(
    () => isCurrentlyOpen(todayHours?.hours || 'Closed'),
    [todayHours]
  );

  return (
    <div className={className}>
      {/* Header with current status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#722F37]" />
          </div>
          <h3 className="font-semibold text-lg text-neutral-900">Hours of Operation</h3>
        </div>

        {/* Open/Closed Status Badge */}
        <div
          className={[
            'px-3 py-1.5 rounded-full text-sm font-medium',
            isOpen
              ? closingSoon
                ? 'bg-secondary-100 text-secondary-800'
                : 'bg-green-100 text-green-800'
              : 'bg-neutral-100 text-neutral-600',
          ].join(' ')}
        >
          {isOpen ? (closingSoon ? 'Closing Soon' : 'Open Now') : 'Closed'}
        </div>
      </div>

      {/* Holiday Notice */}
      {holidayNotice && (
        <div className="flex items-start gap-3 p-4 bg-secondary-50 border border-secondary-200 rounded-xl mb-4">
          <AlertCircle className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
          <p className="text-secondary-800 text-sm">{holidayNotice}</p>
        </div>
      )}

      {/* Hours List */}
      <dl className="space-y-2">
        {hours.map((entry, index) => {
          const isToday = index === currentDayIndex;

          return (
            <div
              key={entry.day}
              className={[
                'flex justify-between items-center py-2 px-3 rounded-lg transition-colors',
                isToday ? 'bg-[#722F37]/5 -mx-3' : '',
              ].join(' ')}
            >
              <dt
                className={[
                  'font-medium',
                  isToday ? 'text-[#722F37]' : 'text-neutral-700',
                ].join(' ')}
              >
                {entry.day}
                {isToday && (
                  <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-[#722F37]">
                    Today
                  </span>
                )}
              </dt>
              <dd
                className={[
                  entry.isOpen ? 'text-neutral-900' : 'text-neutral-400',
                  isToday ? 'font-semibold' : '',
                ].join(' ')}
              >
                {entry.hours}
              </dd>
            </div>
          );
        })}
      </dl>

      {/* Note about extended hours */}
      <p className="mt-4 text-sm text-neutral-500">
        We offer extended hours for emergencies. Call us for same-day appointments.
      </p>
    </div>
  );
}
