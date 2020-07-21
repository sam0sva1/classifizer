import test from 'ava';

import { classBuilder } from '../classBuilder';

test('classBuilder | работает корректно', t => {
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

  t.deepEqual(result, [
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

test('classBuilder | возвращает пустой массив, если передать falsy аргументы', t => {
  const result = classBuilder(false, undefined, null, '');

  t.deepEqual(result, []);
});
