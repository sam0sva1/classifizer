# classifizer
### Build complex conditional classes and stylize them with injected css-modules

> 

[![NPM](https://img.shields.io/npm/v/classifizer.svg)](https://www.npmjs.com/package/classifizer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save classifizer

or

yarn add classifizer
```

## Usage

### classes
A function that accepts strings, arrays, objects.
Omits empty strings, null and undefined.

```jsx
import React from 'react'
import { classes } from 'classifizer';

export function Example({ isChecked }) {
  const isChecked = true;

  return (
    <>
      // <div class="checkbox checkbox_active">
      <div className={classes('checkbox', isChecked && 'checkbox_active')} />

      // <div class="checkbox__checker checkbox__checker_active">
      <div className={classes({ checkbox: { elem: { checker: { mod: { active: isChecked } } } } })} />

      // <div class="checkbox checkbox_active">
      <div className={classes({ checkbox: { mod: { active: isChecked } } })} />

      // <div class="checkbox_active">
      <div className={classes({ checkbox: { use: false, mod: { active: isChecked } } })} />
    </>
  );
}
```

### styledClasses
Before a list of class drafts accepts a cssModule object

```jsx
import React from 'react'
import { styledClasses } from 'classifizer';

import * as styles from './Example.css';

export function Example({ isChecked }) {
  return (
    // <div class="Example__checkbox___Q9Xfp Example__checkbox_active___7qjkJ">
    <div className={styledClasses(styles, 'checkbox', isChecked && 'checkbox_active')}>
  );
}
```

### classesStylizer
Allows to inject a cssModule object to the classes function

```jsx
import React from 'react'
import { classesStylizer } from 'classifizer';

import * as styles from './Example.css';

const stylizeClasses = classesStylizer(styles);

export function Example({ isChecked }) {
  return (
    <div className={stylizeClasses({ checkbox: { mod: { active: isChecked } } })}>
  );
}
```

### stringStylizer
Allows to stylize a list of classes in one string

```jsx
import React from 'react'
import { stringStylizer } from 'classifizer';

import * as styles from './Example.css';

const stylizeString = stringStylizer(styles);

export function Example({ isChecked }) {
  return (
    <>
      // <div class="Example__checkbox___Q9Xfp Example__checkbox_active___7qjkJ">
      <div className={stylizeString(classes('checkbox', isChecked && 'checkbox_active'))}>

      // <div class="Example__checkbox___Q9Xfp Example__checkbox_active___7qjkJ">
      <div className={stylizeString('checkbox checkbox_active')}>
    </>
  );
}
```

### More examples of using inner classBuilder you can find in tests

## License

MIT © [sam0sva1](https://github.com/sam0sva1)
