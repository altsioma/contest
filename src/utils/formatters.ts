const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (
  inDate: number,
  showWeekday: boolean,
  showDay: boolean
): string => {
  const result = [];
  const date: Date = new Date(inDate);
  if (showWeekday) {
    result.push(WEEKDAYS[date.getDay()], ", ");
  }
  result.push(MONTHS[date.getMonth()]);
  if (showDay) {
    result.push(" ", date.getDate());
  }
  return result.join("");
};

export const formatNumber = (n: number, shorten: boolean): string => {
  if (shorten) {
    if (n >= 1000000) {
      return Math.floor(n / 100000) / 10 + "M";
    }
    if (n >= 1000) {
      return Math.floor(n / 100) / 10 + "K";
    }
  }
  return n.toLocaleString();
};
