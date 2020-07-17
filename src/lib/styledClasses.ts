import { TClasses } from '../types/types';
import { classBuilder } from './classBuilder';

export function styledClasses(styles: Record<string, string>, ...args: TClasses[]) {
  if (!args.length) {
    return '';
  }

  const classSet = classBuilder(...args);
  let styled: string[];

  if (styles) {
    styled = classSet.map((oneClass: string) => styles[oneClass] || oneClass);
  } else {
    styled = classSet;
  }

  const joined = styled.join(' ');

  return joined;
}
