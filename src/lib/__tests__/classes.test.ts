import test from 'ava';

import { classes } from '../classes';

test('работает правильно', t => {
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

  t.is(
    result,
    'zoo apartment not-house house house_red house_green house__cat house__cat_big house__cat_black cat cat_big cat_black house__dog house__dog_small house__dog_white dog dog_small dog_white'
  );
});

test('принимает массив', t => {
  const result = classes(['seven', 'eleven']);

  t.is(result, 'seven eleven');
});

test('принимает строки', t => {
  const result = classes('seven', 'eleven');

  t.is(result, 'seven eleven');
});

test('принимает пустой объект и возвращает строку', t => {
  const result = classes({});

  t.is(result, '');
});

test('поле объекта делается классом, если его значение truthy', t => {
  const result = classes({
    one: true
  });

  t.is(result, 'one');
});

test('поле объекта не делается классом, если будет пустым объектом', t => {
  const result = classes({
    one: {}
  });

  t.is(result, '');
});

test('поле объекта делается классом, если мы указываем необходимость в объекте', t => {
  const result = classes({
    one: {
      use: true
    }
  });

  t.is(result, 'one');
});

test('значение поля elem добавляется к классу, как элемент, если оно строка', t => {
  const result = classes({
    one: {
      elem: 'two'
    }
  });

  t.is(result, 'one__two');
});

test('значение поля mod добавляется к классу, как модификатор, если оно строка', t => {
  const result = classes({
    one: {
      mod: 'three'
    }
  });

  t.is(result, 'one_three');
});

test('не добавялет к блоку модификатор, если его значение — пустой объект', t => {
  const result = classes({
    one: {
      mod: {}
    }
  });

  t.is(result, '');
});

test('поле объекта модификатора присоединяется к блоку, если его значение truthy', t => {
  const result = classes({
    one: {
      mod: {
        two: true
      }
    }
  });

  t.is(result, 'one_two');
});

test('модификаторов у объекта может быть несколько', t => {
  const result = classes({
    one: {
      mod: {
        two: true,
        three: true
      }
    }
  });

  t.is(result, 'one_two one_three');
});

test('добавляет элемент и модификатор одновременно', t => {
  const result = classes({
    one: {
      elem: 'two',
      mod: 'three'
    }
  });

  t.is(result, 'one_three one__two');
});

test('элемент не добавляется, если он пустой объект', t => {
  const result = classes({
    one: {
      elem: {}
    }
  });

  t.is(result, '');
});

test('ничего не присоединяется к объекту, если поля элемента и модификатора являются пустыми объектами', t => {
  const result = classes({
    one: {
      elem: {},
      mod: {}
    }
  });

  t.is(result, '');
});

test('поля объекта elem становятся элементами, если их значения truthy', t => {
  const result = classes({
    one: {
      elem: {
        two: true
      }
    }
  });

  t.is(result, 'one__two');
});

test('добавляются несколько элементов', t => {
  const result = classes({
    one: {
      elem: {
        two: true,
        three: true,
        four: true
      }
    }
  });

  t.is(result, 'one__two one__three one__four');
});

test('к блоку добавляется несколько элементов и несколько модификаторов', t => {
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

  t.is(result, 'one_four one_five one__two one__three');
});

test('поле объекта elem не присоединится, как элемент, если оно — пустой объект', t => {
  const result = classes({
    one: {
      elem: {
        two: {}
      }
    }
  });

  t.is(result, '');
});

test('поле объекта elem присоединится, как элемент, если указать необходимость', t => {
  const result = classes({
    one: {
      elem: {
        two: {
          use: true
        }
      }
    }
  });

  t.is(result, 'one__two');
});

test('поле объекта elem будет продублировано отдельным элементом, если указать необходимость', t => {
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

  t.is(result, 'one__two two');
});

test('поле объекта elem может содержать в себе модификаторы', t => {
  const result = classes({
    one: {
      elem: {
        two: {
          mod: 'three'
        }
      }
    }
  });

  t.is(result, 'one__two_three');
});

test('блок-элемент + блоки-элемент-модификатор могут выводиться одновременно, если указать', t => {
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

  t.is(result, 'one__two one__two_three');
});

test('отделяет элемент, как отдельный независимый блок блок', t => {
  const result = classes({
    one: {
      elem: {
        two: {
          independent: true
        }
      }
    }
  });

  t.is(result, 'two');
});

test('создаёт независимый элемент с указанным модификатором', t => {
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

  t.is(result, 'two two_three');
});

test('дублирует модификатор с независимого элемента на отблоковый элемент', t => {
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

  t.is(result, 'one__two one__two_three two two_three');
});

test('дублирует модификтор даже без указания чистого отблокового элемента', t => {
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

  t.is(result, 'one__two_three two two_three');
});

test('модификатор не добавляется, если его значение — пустой объект', t => {
  const result = classes({
    one: {
      elem: {
        two: {
          mod: {}
        }
      }
    }
  });

  t.is(result, '');
});

test('поле объекта модификатора присоединяется к отобъектному элементу, если его значение truthy', t => {
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

  t.is(result, 'one__two_three');
});

test('модификаторов для элемента может быть несколько', t => {
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

  t.is(result, 'one__two_three one__two_four');
});

test('добавляет два модификатора к независимому элементу', t => {
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

  t.is(result, 'two two_three two_four');
});

test('дублирует множесто модификаторов с независимого элемента на отобъектный элемент', t => {
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

  t.is(result, 'one__two_three one__two_four two two_three two_four');
});

test('добавляет два элемента с парами модификаторов', t => {
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

  t.is(result, 'one__two_three one__two_four one__six_seven one__six_eight');
});

test('делает несколько указанных элементов независимыми', t => {
  const result = classes({
    one: {
      elem: {
        two: {
          mod: {
            three: true,
            four: true
          },
          independent: true
        },
        six: {
          mod: {
            seven: true,
            eight: true
          },
          independent: true
        }
      }
    }
  });

  t.is(result, 'two two_three two_four six six_seven six_eight');
});

test('дублирует модификаторы от нескольких независимых элементов на несколько отблочных', t => {
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
        },
        six: {
          mod: {
            seven: true,
            eight: true
          },
          independent: true,
          duplicate: true
        }
      }
    }
  });

  t.is(
    result,
    'one__two_three one__two_four two two_three two_four one__six_seven one__six_eight six six_seven six_eight'
  );
});
