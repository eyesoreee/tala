const SHORT_MONTHS = [
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

const FULL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatPeso(value: number): string {
  const rounded = Math.round(value);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `₱${formatted}`;
}

export function formatShortDate(iso: string): string {
  const date = new Date(iso);
  return `${SHORT_MONTHS[date.getMonth()]} ${date.getDate()}`;
}

export function formatFullDate(date: Date): string {
  return `${FULL_MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function currentMonthLabel(): string {
  return `${FULL_MONTHS[new Date().getMonth()]} Snapshot`;
}

export function getInitials(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}
