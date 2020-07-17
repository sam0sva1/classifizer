# classifizer

> 

[![NPM](https://img.shields.io/npm/v/classifizer.svg)](https://www.npmjs.com/package/classifizer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save classifizer

or

yarn add classifizer
```

## Usage

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

      <div className={stylizeString(cl('checkbox', isChecked && 'checkbox_active'))}>

      <div className={stylizeString('checkbox checkbox_active')}>

      <div className={stylizeClasses(checkbox: { use: true, mod: { active: isChecked } })}>
    </>
  );
}

export default Example;
```

### More examples of using inner classBuilder you can find in tests

## License

MIT © [sam0sva1](https://github.com/sam0sva1)
