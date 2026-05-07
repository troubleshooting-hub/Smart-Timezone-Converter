import { DateTime } from 'luxon';

export interface TimezoneInfo {
  id: string;
  label: string;
  abbreviation: string;
}

export const COMMON_TIMEZONES: TimezoneInfo[] = [
  { id: 'Asia/Kolkata', label: 'India Standard Time (IST)', abbreviation: 'IST' },
  { id: 'America/New_York', label: 'Eastern Time (EST/EDT)', abbreviation: 'ET' },
  { id: 'America/Chicago', label: 'Central Time (CST/CDT)', abbreviation: 'CT' },
  { id: 'America/Denver', label: 'Mountain Time (MST/MDT)', abbreviation: 'MT' },
  { id: 'America/Los_Angeles', label: 'Pacific Time (PST/PDT)', abbreviation: 'PT' },
  { id: 'Europe/London', label: 'London (GMT/BST)', abbreviation: 'UK' },
  { id: 'Europe/Paris', label: 'Central European Time (CET/CEST)', abbreviation: 'CET' },
  { id: 'Asia/Tokyo', label: 'Japan Standard Time (JST)', abbreviation: 'JST' },
  { id: 'Asia/Singapore', label: 'Singapore Standard Time (SGT)', abbreviation: 'SGT' },
  { id: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)', abbreviation: 'AET' },
  { id: 'Pacific/Auckland', label: 'New Zealand (NZST/NZDT)', abbreviation: 'NZT' },
  { id: 'Etc/GMT', label: 'Greenwich Mean Time (GMT)', abbreviation: 'GMT' },
];

export interface ConversionResult {
  source: {
    date: string;
    time: string;
    zone: string;
    isDST: boolean;
    offset: string;
    abbreviation: string;
  };
  target: {
    date: string;
    time: string;
    zone: string;
    isDST: boolean;
    offset: string;
    abbreviation: string;
  };
}

export function convertTime(
  sourceZone: string,
  targetZone: string,
  date: Date,
  timeStr: string // "HH:mm"
): ConversionResult {
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  // 1. Capture inputs & Create Source DateTime
  let sourceDT = DateTime.fromJSDate(date).setZone(sourceZone);
  sourceDT = sourceDT.set({ hour: hours, minute: minutes });

  // 2. Target DateTime conversion (Luxon handles the UTC baseline internally)
  const targetDT = sourceDT.setZone(targetZone);

  return {
    source: {
      date: sourceDT.toLocaleString(DateTime.DATE_HUGE),
      time: sourceDT.toLocaleString(DateTime.TIME_SIMPLE),
      zone: sourceZone,
      isDST: sourceDT.isInDST,
      offset: sourceDT.offsetNameLong || '',
      abbreviation: sourceDT.offsetNameShort || '',
    },
    target: {
      date: targetDT.toLocaleString(DateTime.DATE_HUGE),
      time: targetDT.toLocaleString(DateTime.TIME_SIMPLE),
      zone: targetZone,
      isDST: targetDT.isInDST,
      offset: targetDT.offsetNameLong || '',
      abbreviation: targetDT.offsetNameShort || '',
    }
  };
}
