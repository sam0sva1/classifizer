import { TClasses } from '../types';
import { classBuilder } from './classBuilder';

export function styledClasses(styles: Record<string, string>, ...args: TClasses[]): string {
  if (!args.length) {
    return '';
  }

  const classSet = classBuilder(...args);

  const styled = styles
    ? classSet.map((oneClass: string) => styles[oneClass] || oneClass)
    : classSet;

  const joined = styled.join(' ');

  return joined;
}
