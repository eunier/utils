import { propToString } from '.';

describe(propToString.name, () => {
  test('should return `prop` from object with a prop named `prop`', () => {
    const obj = { prop: 'val' };
    expect(propToString(() => obj.prop)).toEqual('prop');
  });

  test(
    'should return `prop` from object with a prop named `prop` ' +
      'using `<typeof obj>`',
    () => {
      const obj = { prop: 'val' };
      expect(propToString<typeof obj>(t => t.prop)).toEqual('prop');
    }
  );

  test(
    'should return `prop` from type with a prop named `prop` ' +
      'using `<Type>`',
    () => {
      type SomeType = {
        prop: string;
      };

      expect(propToString<SomeType>(t => t.prop)).toEqual('prop');
    }
  );

  // TODO ['prop'] 
});
