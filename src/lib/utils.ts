import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import  db from "./db"
import { useCanvasStore } from "@/app/lib/store/canvasStore"
import { useShallow } from "zustand/react/shallow"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


  





