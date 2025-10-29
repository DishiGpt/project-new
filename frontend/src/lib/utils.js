import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Convert salary number (in rupee) to LPA (lakhs per annum) string.
 * Example: 140000 -> "1.4 LPA"
 */
export function formatSalaryToLPA(salary){
  if(salary === null || salary === undefined || salary === "") return "";
  const n = Number(salary);
  if(isNaN(n)) return "";
  const lpa = n / 100000;
  // show one decimal unless it's an integer
  const formatted = (Math.abs(lpa % 1) < 0.05) ? lpa.toFixed(0) : lpa.toFixed(1);
  return `${formatted} LPA`;
}
