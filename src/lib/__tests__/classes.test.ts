import { describe, it, expect } from 'vitest';

import { classes } from '../classes';

describe('classes', () => {
  it('работает правильно', () => {
    const result = classes(['zoo', 'apartment'], {
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

    expect(result).toBe(
      'zoo apartment not-house house house_red house_green house__cat house__cat_big house__cat_black cat cat_big cat_black house__dog house__dog_small house__dog_white dog dog_small dog_white'
    );
  });

  it('возвращает пустую строку, если не предоставить аргументов', () => {
    const result = classes();

    expect(result).toBe('');
  });

  it('возвращает пустую строку, если передать falsy аргументы', () => {
    const result = classes(false, undefined, null, '');

    expect(result).toBe('');
  });

  it('принимает массив', () => {
    const result = classes(['seven', 'eleven']);

    expect(result).toBe('seven eleven');
  });

  it('принимает строки', () => {
    const result = classes('seven', 'eleven');

    expect(result).toBe('seven eleven');
  });

  it('принимает пустой объект и возвращает строку', () => {
    const result = classes({});

    expect(result).toBe('');
  });

  it('поле объекта делается классом, если его значение truthy', () => {
    const result = classes({
      one: true
    });

    expect(result).toBe('one');
  });

  it('поле объекта делается классом, если мы указываем необходимость в объекте', () => {
    const result = classes({
      one: {
        use: true
      }
    });

    expect(result).toBe('one');
  });

  it('значение поля elem добавляется к классу, как элемент, если оно строка', () => {
    const result = classes({
      one: {
        elem: 'two'
      }
    });

    expect(result).toBe('one__two');
  });

  it('значение поля mod добавляется к классу, как модификатор, если оно строка', () => {
    const result = classes({
      one: {
        mod: 'three'
      }
    });

    expect(result).toBe('one one_three');
  });

  it('не добавялет к блоку модификатор, если его значение — пустой объект', () => {
    const result = classes({
      one: {
        mod: {}
      }
    });

    expect(result).toBe('one');
  });

  it('поле объекта модификатора присоединяется к блоку, если его значение truthy', () => {
    const result = classes({
      one: {
        mod: {
          two: true
        }
      }
    });

    expect(result).toBe('one one_two');
  });

  it('модификаторов у объекта может быть несколько', () => {
    const result = classes({
      one: {
        mod: {
          two: true,
          three: true
        }
      }
    });

    expect(result).toBe('one one_two one_three');
  });

  it('добавляет элемент и модификатор одновременно', () => {
    const result = classes({
      one: {
        elem: 'two',
        mod: 'three'
      }
    });

    expect(result).toBe('one_three one__two');
  });

  it('элемент не добавляется, если он пустой объект', () => {
    const result = classes({
      one: {
        elem: {}
      }
    });

    expect(result).toBe('');
  });

  it('ничего не присоединяется к объекту, если поля элемента и модификатора являются пустыми объектами', () => {
    const result = classes({
      one: {
        elem: {},
        mod: {}
      }
    });

    expect(result).toBe('');
  });

  it('поля объекта elem становятся элементами, если их значения truthy', () => {
    const result = classes({
      one: {
        elem: {
          two: true
        }
      }
    });

    expect(result).toBe('one__two');
  });

  it('добавляются несколько элементов', () => {
    const result = classes({
      one: {
        elem: {
          two: true,
          three: true,
          four: true
        }
      }
    });

    expect(result).toBe('one__two one__three one__four');
  });

  it('к блоку добавляется несколько элементов и несколько модификаторов', () => {
    const result = classes({
      one: {
        elem: {
          two: true,
          three: true
        },
        mod: {
          four: true,
          five: true
        }
      }
    });

    expect(result).toBe('one_four one_five one__two one__three');
  });

  it('поле объекта elem присоединится, как элемент, если указать необходимость', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            use: true
          }
        }
      }
    });

    expect(result).toBe('one__two');
  });

  it('поле объекта elem будет продублировано отдельным элементом, если указать необходимость', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            use: true,
            independent: true
          }
        }
      }
    });

    expect(result).toBe('one__two two');
  });

  it('поле объекта elem может содержать в себе модификаторы', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            mod: 'three'
          }
        }
      }
    });

    expect(result).toBe('one__two one__two_three');
  });

  it('блок-элемент + блоки-элемент-модификатор могут выводиться одновременно, если указать', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            use: true,
            mod: 'three'
          }
        }
      }
    });

    expect(result).toBe('one__two one__two_three');
  });

  it('отделяет элемент, как отдельный независимый блок блок', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            independent: true
          }
        }
      }
    });

    expect(result).toBe('two');
  });

  it('создаёт независимый элемент с указанным модификатором', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            mod: 'three',
            independent: true
          }
        }
      }
    });

    expect(result).toBe('two two_three');
  });

  it('дублирует модификатор с независимого элемента на отблоковый элемент', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            use: true,
            mod: 'three',
            independent: true,
            duplicate: true
          }
        }
      }
    });

    expect(result).toBe('one__two one__two_three two two_three');
  });

  it('дублирует модификтор даже без указания чистого отблокового элемента', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            mod: 'three',
            independent: true,
            duplicate: true
          }
        }
      }
    });

    expect(result).toBe('one__two one__two_three two two_three');
  });

  it('модификатор не добавляется к элементу, если его значение — пустой объект', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            mod: {}
          }
        }
      }
    });

    expect(result).toBe('one__two');
  });

  it('поле объекта модификатора присоединяется к отобъектному элементу, если его значение truthy', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            mod: {
              three: true
            }
          }
        }
      }
    });

    expect(result).toBe('one__two one__two_three');
  });

  it('модификаторов для элемента может быть несколько', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            mod: {
              three: true,
              four: true
            }
          }
        }
      }
    });

    expect(result).toBe('one__two one__two_three one__two_four');
  });

  it('добавляет два модификатора к независимому элементу', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            independent: true,
            mod: {
              three: true,
              four: true
            }
          }
        }
      }
    });

    expect(result).toBe('two two_three two_four');
  });

  it('дублирует множесто модификаторов с независимого элемента на отобъектный элемент', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            mod: {
              three: true,
              four: true
            },
            independent: true,
            duplicate: true
          }
        }
      }
    });

    expect(result).toBe(
      'one__two one__two_three one__two_four two two_three two_four'
    );
  });

  it('добавляет два элемента с парами модификаторов', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            mod: {
              three: true,
              four: true
            }
          },
          six: {
            mod: {
              seven: true,
              eight: true
            }
          }
        }
      }
    });

    expect(result).toBe(
      'one__two one__two_three one__two_four one__six one__six_seven one__six_eight'
    );
  });

  it('делает несколько указанных элементов независимыми', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            independent: true,
            mod: {
              three: true,
              four: true
            }
          },
          six: {
            independent: true,
            mod: {
              seven: true,
              eight: true
            }
          }
        }
      }
    });

    expect(result).toBe('two two_three two_four six six_seven six_eight');
  });

  it('дублирует модификаторы от нескольких независимых элементов на несколько отблочных', () => {
    const result = classes({
      one: {
        elem: {
          two: {
            independent: true,
            duplicate: true,
            mod: {
              three: true,
              four: true
            }
          },
          six: {
            independent: true,
            duplicate: true,
            mod: {
              seven: true,
              eight: true
            }
          }
        }
      }
    });

    expect(result).toBe(
      'one__two one__two_three one__two_four two two_three two_four one__six one__six_seven one__six_eight six six_seven six_eight'
    );
  });
});
