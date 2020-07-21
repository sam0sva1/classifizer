export type TModifier = {
  readonly [key: string]: any;
};

export type TRule = {
  readonly [key: string]:
    | TRule
    | boolean
    | string
    | number
    | null
    | undefined
    | false;
};

export type TClasses =
  | (TRule | string)[]
  | TRule
  | string
  | null
  | undefined
  | false;
