import { Apod } from '../model/Models';
export const getOldMonth = (oldestDate: Date): string => {
  const dateLimit = new Date('1995-06-16Z');
  let [year, month, day]: number[] = oldestDate.toString().split('-').map(Number);
  month -= 1;
  if (month === 0) {
    month = 12;
    year -= 1;
  }
  day = 1;
  let newStartDate = [year, month, day].map((element) => String(element).padStart(2, '0')).join('-');
  let earliestDate: string | Date = new Date(newStartDate + 'Z');
  if (earliestDate < dateLimit) {
    newStartDate = '2021-06-16';
  }
  return newStartDate;
};

export const getNewMonth = (newestDate: Date): string => {
  let dateLimit: Date = new Date();
  let [year, month, day]: number[] = newestDate.toString().split('-').map(Number);
  month += 1;
  if (month === 13) {
    month = 1;
    year += 1;
  }
  day = 1;
  let newDate = [year, month, day].map(String).join('-');
  let earliestDate: string | Date = new Date(newDate + 'Z');
  if (dateLimit < earliestDate) {
    newDate = dateLimit.toISOString().split('T')[0];
  }
  return newDate;
};

export const isTodaysDate = (allApod: Apod[]): boolean => {
  let today = new Date();
  let todayString = today.toISOString().split('T')[0];
  return allApod[allApod.length - 1].date.toString() === todayString;
};
