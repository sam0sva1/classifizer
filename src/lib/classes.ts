/*
classes(
  undefined,
  null,
  {
    one: false,
    two: true,
    three: 3,
    four: () => {},
    five: { use: true },
    six: {
      use: true,
      mod: 'one',
    },
    eight: {
      elem: 'two',
      mod: {
        'active': true,
        'main': true,
      },
    },

    // use: true  | duplicate: true | independent: true,
    // nine__label nine__label_light label label_light
    nine: {
      elem: {
        'label': {
          use: true,
          independent: true,
          duplicate: true,
          mod: {
            'light': true,
          }
        },
      }
    }

  },
  ['seven', 'eleven'],
);
*/

import { classBuilder } from './classBuilder';
import { TClasses } from '../types';

export function classes(...args: TClasses[]) {
  if (!args.length) {
    return '';
  }

  const classSet = classBuilder(...args);

  return classSet.join(' ');
}
