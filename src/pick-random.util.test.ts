import { range } from 'ramda';
import { pickRandom } from './pick-random.util';

describe(pickRandom.name, () => {
  test('should always return random a value from an array', () => {
    const twoDArr = [2, 9, 99]
      .map(num => range(0, num))
      .map(r => r.map(() => true));

    range(0, 99).forEach(() =>
      twoDArr.forEach(arr => expect(pickRandom(arr)).not.toBe(undefined))
    );
  });
});
