import { propsToStrArr } from '.';
import { FunctionExpression } from './types';

export const cln = <T>(expression: FunctionExpression<T>): string => {
  return propsToStrArr<T>(expression).join('');
};
