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

      // <div class="checkbox checkbox_active">
      <div className={classes({ checkbox: { use: false, elem: { checker: { mod: { active: isChecked } } } } })} />

      // <div class="checkbox checkbox_active">
      <div className={classes({ checkbox: { mod: { active: isChecked } } })} />

      // <div class="checkbox_active">
      <div className={classes({ checkbox: { use: false, mod: { active: isChecked } } })} />
    </>
  );
}
```

### classes

```jsx
import React from 'react'
import {
  classes,
  styledClasses,
  stringStylizer,
} from 'classifizer';

import * as styles from './Example.css';

const stylizeString = stringStylizer(styles);
const stylizeClasses = classesStylizer(styles);

export function Example({ isChecked }) {
  return (
    <>
      <div className={classes(styles['checkbox'], isChecked && styles['checkbox_active'])}>

      <div className={styledClasses(styles, 'checkbox', isChecked && 'checkbox_active')}>

      <div className={stylizeString(classes('checkbox', isChecked && 'checkbox_active'))}>

      <div className={stylizeString('checkbox checkbox_active')}>

      <div className={stylizeClasses(checkbox: { use: true, mod: { active: isChecked } })}>
    </>
  );
}
```

### More examples of using inner classBuilder you can find in tests

## License

MIT © [sam0sva1](https://github.com/sam0sva1)
