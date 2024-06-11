import { differenceInDays, formatDistance, parseISO } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);

/* 
  parseISO is used as the first parameter because,
  formatDistance expects date in DateType or string
*/
export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

/* Supabase expects an ISO date string. However, that string will be different for every render because the MS or SEC has changed. So we use this trick to remove any time */
export const getToday = (options = {}) => {
  const today = new Date();

  /* This is needed when we want to compare the date with earlier dates */
  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString();
};
