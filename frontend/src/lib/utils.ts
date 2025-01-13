import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { GuestStatus } from '@/types/guest';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: GuestStatus): string {
  switch (status) {
    case 'checked_in':
      return 'border-green-500 text-green-700 bg-green-50';
    case 'checked_out':
      return 'border-blue-500 text-blue-700 bg-blue-50';
    case 'pending':
      return 'border-yellow-500 text-yellow-700 bg-yellow-50';
    case 'cancelled':
      return 'border-red-500 text-red-700 bg-red-50';
    default:
      return '';
  }
}