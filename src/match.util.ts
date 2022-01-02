export const match = <Target, Return>(
  target: Target,
  {
    pattern,
    default: _default,
  }: {
    pattern: [key: () => Target | Target[], val: () => Return | undefined][];
    default?: () => Return | undefined;
  }
): Return | undefined => {
  const patternMatch = pattern.find(([key]) => {
    const keyRes = key();
    return Array.isArray(keyRes) ? keyRes.includes(target) : keyRes === target;
  });

  return patternMatch ? patternMatch[1]() : _default && _default();
};
