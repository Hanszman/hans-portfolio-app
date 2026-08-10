import { AppLocale } from '../translation/translation.types';

export type AppDateDisplayFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY';

interface ParsedCalendarDate {
  day: number;
  month: number;
  year: number;
}

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})/;

const parseCalendarDate = (value: string): ParsedCalendarDate | null => {
  const match = ISO_DATE_PATTERN.exec(value.trim());

  if (match) {
    const [, year, month, day] = match;
    return { day: Number(day), month: Number(month), year: Number(year) };
  }

  return null;
};

const padDatePart = (value: number): string => String(value).padStart(2, '0');

export const resolveDatePickerFormat = (locale: AppLocale): AppDateDisplayFormat =>
  locale === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';

export const formatAppDate = (
  value: string | null | undefined,
  locale: AppLocale,
  fallback = '',
): string => {
  if (!value) return fallback;

  const date = parseCalendarDate(value);
  if (!date) return value;

  const day = padDatePart(date.day);
  const month = padDatePart(date.month);
  const year = String(date.year).padStart(4, '0');

  return locale === 'en-us' ? `${month}/${day}/${year}` : `${day}/${month}/${year}`;
};

export const formatAppDateRange = (
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  locale: AppLocale,
  openEndedLabel = '',
): string => {
  const start = formatAppDate(startDate, locale);
  const end = formatAppDate(endDate, locale, openEndedLabel);

  return [start, end].filter(Boolean).join(' - ');
};
