export type FilterFlags<TBase, TCondition> = {
  [key in keyof TBase]: TBase[key] extends TCondition ? key : never;
};
