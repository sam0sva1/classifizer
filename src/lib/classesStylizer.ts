import { TClasses } from '../types';
import { styledClasses } from './styledClasses';

export function classesStylizer(styles: Record<string, string>) {
  return function stylizeTo(...args: TClasses[]) {
    return styledClasses(styles, ...args);
  };
}
