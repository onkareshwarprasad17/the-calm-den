import { formatDistance, parseISO } from "date-fns";
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
