import { describe, it, expect } from 'vitest';

import { stylize } from '../stylize';
import { styledClasses } from '../styledClasses';
import { classesStylizer } from '../classesStylizer';
import { stringStylizer } from '../stringStylizer';

const mockStyles: Record<string, string> = {
  checkbox: 'checkbox___Q9Xfp',
  checkbox_active: 'checkbox_active___7qjkJ',
  button: 'button___Abc12',
  button_primary: 'button_primary___Def34'
};

describe('stylize', () => {
  it('стилизует строку классов через CSS-модули', () => {
    const result = stylize(mockStyles, 'checkbox checkbox_active');

    expect(result).toBe('checkbox___Q9Xfp checkbox_active___7qjkJ');
  });

  it('возвращает оригинальный класс, если его нет в styles', () => {
    const result = stylize(mockStyles, 'checkbox unknown-class');

    expect(result).toBe('checkbox___Q9Xfp unknown-class');
  });

  it('возвращает пустую строку для пустой строки', () => {
    const result = stylize(mockStyles, '');

    expect(result).toBe('');
  });

  it('возвращает пустую строку для не-строки', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = stylize(mockStyles, 123 as any);

    expect(result).toBe('');
  });

  it('обрабатывает один класс', () => {
    const result = stylize(mockStyles, 'button');

    expect(result).toBe('button___Abc12');
  });
});

describe('styledClasses', () => {
  it('строит классы и стилизует их', () => {
    const result = styledClasses(mockStyles, {
      checkbox: {
        mod: { active: true }
      }
    });

    expect(result).toBe('checkbox___Q9Xfp checkbox_active___7qjkJ');
  });

  it('возвращает пустую строку без аргументов классов', () => {
    const result = styledClasses(mockStyles);

    expect(result).toBe('');
  });

  it('оставляет класс как есть, если его нет в styles', () => {
    const result = styledClasses(mockStyles, 'unknown');

    expect(result).toBe('unknown');
  });

  it('стилизует строковые аргументы', () => {
    const result = styledClasses(mockStyles, 'checkbox', 'button');

    expect(result).toBe('checkbox___Q9Xfp button___Abc12');
  });

  it('стилизует массив строк', () => {
    const result = styledClasses(mockStyles, ['checkbox', 'button']);

    expect(result).toBe('checkbox___Q9Xfp button___Abc12');
  });
});

describe('classesStylizer', () => {
  it('возвращает функцию с инжектированными стилями', () => {
    const styled = classesStylizer(mockStyles);

    expect(typeof styled).toBe('function');
  });

  it('инжектированная функция стилизует классы', () => {
    const styled = classesStylizer(mockStyles);
    const result = styled({
      checkbox: {
        mod: { active: true }
      }
    });

    expect(result).toBe('checkbox___Q9Xfp checkbox_active___7qjkJ');
  });

  it('инжектированная функция стилизует строковые аргументы', () => {
    const styled = classesStylizer(mockStyles);
    const result = styled('checkbox', 'button');

    expect(result).toBe('checkbox___Q9Xfp button___Abc12');
  });

  it('инжектированная функция возвращает пустую строку без аргументов', () => {
    const styled = classesStylizer(mockStyles);
    const result = styled();

    expect(result).toBe('');
  });
});

describe('stringStylizer', () => {
  it('возвращает функцию с инжектированными стилями', () => {
    const styled = stringStylizer(mockStyles);

    expect(typeof styled).toBe('function');
  });

  it('инжектированная функция стилизует строку классов', () => {
    const styled = stringStylizer(mockStyles);
    const result = styled('checkbox checkbox_active');

    expect(result).toBe('checkbox___Q9Xfp checkbox_active___7qjkJ');
  });

  it('инжектированная функция возвращает пустую строку для пустой строки', () => {
    const styled = stringStylizer(mockStyles);
    const result = styled('');

    expect(result).toBe('');
  });

  it('оставляет класс как есть, если его нет в styles', () => {
    const styled = stringStylizer(mockStyles);
    const result = styled('checkbox missing');

    expect(result).toBe('checkbox___Q9Xfp missing');
  });
});
