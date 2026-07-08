export const BASE_URL = process.env.BASE_URL ?? 'https://mtindia-v2-admin.onrender.com';

export const categoryNames = [
  'Hotels',
  'Resorts',
  'Home Stays',
  'Camps & Tents',
] as const;

export type CategoryName = (typeof categoryNames)[number];

