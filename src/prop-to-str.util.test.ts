import { propToStr } from '.';

describe.skip(propToStr.name, () => {
  test('should return `prop` from object with a prop named `prop`', () => {
    const obj = { prop: 'val' };
    expect(propToStr(() => obj.prop)).toEqual('prop');
  });

  test(
    'should return `prop` from object with a prop named `prop` ' +
      'using `<typeof obj>`',
    () => {
      const obj = { prop: 'val' };
      expect(propToStr<typeof obj>(t => t.prop)).toEqual('prop');
    }
  );

  test(
    'should return `prop` from type with a prop named `prop` ' +
      'using `<Type>`',
    () => {
      type SomeType = {
        prop: string;
      };

      expect(propToStr<SomeType>(t => t.prop)).toEqual('prop');
    }
  );

  // TODO ['prop']
});
