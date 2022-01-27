import { random } from 'lodash';

export const pickRandom = <T>(source: T[]): T => {
  return source[random(0, source.length - 1)];
};
