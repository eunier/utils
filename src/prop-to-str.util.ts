import { propsToStrArr } from '.';

export const propToStr = <T>(expression: (model: T) => unknown): string => {
  return propsToStrArr<T>(expression, { maxLength: 1, sliceAt: 'end' })[0];
};
