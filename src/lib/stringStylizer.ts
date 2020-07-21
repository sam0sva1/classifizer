import { stylize } from './stylize';

export function stringStylizer(styles: Record<string, string>): ((classes: string) => string) {
  return function stylizeTo(classes: string): string {
    return stylize(styles, classes);
  };
}
