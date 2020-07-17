import { isArray, isObject } from './heplers';
import { TClasses, TRule } from '../types';

export function classBuilder(...args: readonly TClasses[]) {
  const classSet: string[] = [];

  args.forEach((rule: TClasses) => {
    if (!rule) {
      return;
    }

    const ruleType = typeof rule;
    if (ruleType === 'string') {
      classSet.push(rule as string);

      return;
    }

    if (isObject(rule)) {
      Object.keys(rule).forEach((key) => {
        const value = (rule as any)[key];

        if (typeof value === 'object') {
          if (value.use) {
            classSet.push(key);
          }

          // mod
          if (value.mod) {
            if (isObject(value.mod)) {
              Object.keys(value.mod).forEach((curMod) => {
                if (value.mod[curMod]) {
                  classSet.push(`${key}_${curMod}`);
                }
              });
            } else {
              classSet.push(`${key}_${value.mod}`);
            }
          }

          // elem
          if (value.elem) {
            if (isObject(value.elem)) {
              Object.keys(value.elem).forEach((curElem) => {
                const element = value.elem[curElem];

                if (isObject(element)) {
                  if (element.use) {
                    classSet.push(`${key}__${curElem}`);
                  }

                  if (element.independent) {
                    if (element.mod) {
                      const { mod } = element;

                      if (element.duplicate) {
                        if (element.mod) {
                          const { mod: elemMod } = element;

                          if (isObject(elemMod)) {
                            Object.keys(elemMod).forEach((curMod) => {
                              if (elemMod[curMod]) {
                                classSet.push(`${key}__${curElem}_${curMod}`);
                              }
                            });
                          } else {
                            classSet.push(`${key}__${curElem}_${elemMod}`);
                          }
                        }
                      }

                      classSet.push(curElem);

                      if (isObject(mod)) {
                        Object.keys(mod).forEach((curMod) => {
                          if (mod[curMod]) {
                            classSet.push(`${curElem}_${curMod}`);
                          }
                        });
                      } else {
                        classSet.push(`${curElem}_${mod}`);
                      }
                    } else {
                      classSet.push(curElem);
                    }
                  } else if (element.mod) {
                    const { mod } = element;

                    if (isObject(mod)) {
                      Object.keys(mod).forEach((curMod) => {
                        if (mod[curMod]) {
                          classSet.push(`${key}__${curElem}_${curMod}`);
                        }
                      });
                    } else {
                      classSet.push(`${key}__${curElem}_${mod}`);
                    }
                  }
                } else {
                  classSet.push(`${key}__${curElem}`);
                }
              });
            } else {
              classSet.push(`${key}__${value.elem}`);
            }
          }
        } else if (value) {
          classSet.push(key);
        }
      });

      return;
    }

    if (isArray(rule)) {
      const result = classBuilder(...rule as (string | TRule)[]);
      classSet.push(...result);
    }
  });

  return classSet.filter(Boolean);
}
