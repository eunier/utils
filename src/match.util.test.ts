import { match } from './match.util';

describe(match.name, () => {
  it('should return `2`', () => {
    const res = match(2, {
      pattern: [
        [() => 1, () => '1'],
        [() => 2, () => '2'],
      ],
      default: () => 'not found',
    });

    expect(res).toBe('2');
  });

  it('should return `found in group`', () => {
    const res = match(3, {
      pattern: [
        [() => 1, () => '1'],
        [() => 2, () => '2'],
        [() => [3, 4, 5], () => 'found in group'],
      ],
      default: () => 'not found',
    });

    expect(res).toBe('found in group');
  });

  it('should return `not found`', () => {
    const res = match(6, {
      pattern: [
        [() => 1, () => '1'],
        [() => 2, () => '2'],
        [() => [3, 4, 5], () => 'found in group'],
      ],
      default: () => 'not found',
    });

    expect(res).toBe('not found');
  });
});
