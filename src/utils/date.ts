import { startOfMonth, endOfMonth, isSameDay, isWithinInterval } from 'date-fns';

export function getFirstDayOfMonth(date: Date): Date {
  return startOfMonth(date);
}

export function getLastDayOfMonth(date: Date): Date {
  return endOfMonth(date);
}

export function isSameDayDate(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2);
}

export function isDateInRange(date: Date, from: Date, to: Date): boolean {
  return isWithinInterval(date, { start: from, end: to });
}



