import { random } from 'lodash';

export const pickRandom = <T>(source: T[]): T => {
  return source[random(0, source.length - 1)];
};

type SomeType = { a: string };
let arr: Array<SomeType> = [{ a: 'a' }];
let a: Parameters<Array<SomeType>['filter']>[0] = () => true;
arr.filter(a);
