import { getClassName } from '.';

describe(getClassName.name, () => {
  test('should return className `bg-blue-500`', () => {
    const el = <span className="bg-blue-500"></span>;
    expect(getClassName(el)).toBe('bg-blue-500');
  });
});
