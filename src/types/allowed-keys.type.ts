import { FilterFlags } from '.';

export type AllowedKeys<TBase, TCondition> = FilterFlags<
  TBase,
  TCondition
>[keyof TBase];
