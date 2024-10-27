import { User } from '@prisma/client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input))
}

export function generateName(user: User) {
  const { username, name, surname } = user
  return (surname && name) ? surname + name : username
}
