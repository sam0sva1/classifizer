export type TModifier = {
  readonly [key: string]: unknown;
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
