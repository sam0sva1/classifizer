import { TClasses } from '../types';
import { styledClasses } from './styledClasses';

export function classesStylizer(styles: Record<string, string>): ((...args: TClasses[]) => string) {
  return function stylizeTo(...args: TClasses[]): string {
    return styledClasses(styles, ...args);
  };
}
