import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function initials(text: string) {
    return text.split(" ").map((word) => `${word.charAt(0)}.`).join("");
}