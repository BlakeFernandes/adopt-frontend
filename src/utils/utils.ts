import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
