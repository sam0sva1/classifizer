import { classBuilder } from './classBuilder';
import { TClasses } from '../types';

export function classes(...args: TClasses[]): string {
  if (!args.length) {
    return '';
  }

  const classSet = classBuilder(...args);

  return classSet.join(' ');
}
