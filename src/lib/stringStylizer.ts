import { stylize } from './stylize';

export function stringStylizer(styles: Record<string, string>) {
  return function stylizeTo(classes: string) {
    return stylize(styles, classes);
  };
}
