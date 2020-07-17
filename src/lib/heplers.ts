import { TClasses } from '../types/types';

export const isArray = (rule: TClasses) => Array.isArray(rule);
export const isObject = (rule: TClasses) => typeof rule === 'object' && !isArray(rule);
