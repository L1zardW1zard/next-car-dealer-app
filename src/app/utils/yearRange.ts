import { SelectItemType } from "./types";

export function generateYearRange(startYear: number = 2015): SelectItemType[] {
  const currentYear = new Date().getFullYear();
  const years: SelectItemType[] = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push({ value: year, name: year.toString() });
  }
  return years;
}
