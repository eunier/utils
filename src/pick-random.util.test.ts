import { range } from 'ramda';
import { pickRandom } from './pick-random.util';

describe(pickRandom.name, () => {
  test('should always return a value from the array', () => {
    range(0, 99).forEach(() =>
      [range(0, 2), range(0, 9), range(0, 99)]
        .map(r => r.map(() => true))
        .forEach(arr => expect(arr).not.toBe(undefined))
    );
  });
});
