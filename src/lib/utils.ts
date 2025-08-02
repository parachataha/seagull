import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * @function cn Cleans up (tailwind) classNames 
 * @param inputs 
 * @returns A clean and neat string of classNames without conflicts
*/

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
