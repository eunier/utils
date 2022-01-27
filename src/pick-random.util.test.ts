import { range } from 'ramda';
import { pickRandom } from './pick-random.util';

describe(pickRandom.name, () => {
  test('should always return random a value from the array', () => {
    range(0, 99).forEach(() =>
      [2, 9, 99]
        .map(num => range(0, num))
        .map(r => r.map(() => true))
        .forEach(arr => expect(pickRandom(arr)).not.toBe(undefined))
    );
  });
});
