import { random } from 'lodash';
import { ArrayFilterPredicate } from './types/array-filter-predicate.type';

export const pickRandom = <T>(
  source: T[],
  { filterFn }: { filterFn?: ArrayFilterPredicate<T> }
): T => {
  if (filterFn) source.filter(filterFn);
  return source[random(0, source.length - 1)];
};

type SomeType = { a: string };
let arr: Array<SomeType> = [{ a: 'a' }];
let a: Parameters<Array<SomeType>['filter']>[0] = () => true;
arr.filter(a);
