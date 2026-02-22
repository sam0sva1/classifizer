import { TRule } from '../types';

export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);
export const isObject = (value: unknown): value is TRule =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
