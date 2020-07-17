export type TModifier = {
  [key: string]: any;
};

export type TRule = {
  [key: string]: TRule | boolean | string | number | null | undefined | false;
};

export type TClasses = (TRule | string)[] | TRule | string | null | undefined | false;
