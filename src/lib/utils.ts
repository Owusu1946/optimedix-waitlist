import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges multiple class names or class value arrays into a single string.
 * This function combines clsx for conditional classes and twMerge for Tailwind-specific class merging.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}