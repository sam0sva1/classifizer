import { describe, it, expect } from 'vitest';

import { classBuilder } from '../classBuilder';

describe('classBuilder', () => {
  it('работает корректно', () => {
    const result = classBuilder(['zoo', 'apartment'], {
      'not-house': true,
      house: {
        use: true,
        mod: {
          red: true,
          green: true
        },
        elem: {
          cat: {
            use: true,
            mod: {
              big: true,
              black: true
            },
            independent: true,
            duplicate: true
          },
          dog: {
            use: true,
            mod: {
              small: true,
              white: true
            },
            independent: true,
            duplicate: true
          }
        }
      }
    });

    expect(result).toEqual([
      'zoo',
      'apartment',
      'not-house',
      'house',
      'house_red',
      'house_green',
      'house__cat',
      'house__cat_big',
      'house__cat_black',
      'cat',
      'cat_big',
      'cat_black',
      'house__dog',
      'house__dog_small',
      'house__dog_white',
      'dog',
      'dog_small',
      'dog_white'
    ]);
  });

  it('возвращает пустой массив, если передать falsy аргументы', () => {
    const result = classBuilder(false, undefined, null, '');

    expect(result).toEqual([]);
  });
});
