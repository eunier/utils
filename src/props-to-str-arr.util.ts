import { BREAK_LINE, OBJECT_PROPERTIES } from './constants';

export const propsToStrArr = <T>(
  expression: (object: T) => void,
  opts: { maxLength: number; sliceAt: 'start' | 'end' } = {
    maxLength: Infinity,
    sliceAt: 'start',
  }
): string[] => {
  if (opts.maxLength < 0) {
    throw Error('Max length must be greater than 0.');
  }

  const codeStr = expression.toString();

  const codeStrFormatted = codeStr
    .replace(BREAK_LINE, '')
    .replace("['", '.')
    .replace("']", '.');

  const match = codeStrFormatted.match(OBJECT_PROPERTIES);

  if (!match) {
    throw Error(`There is no properties on expression \'${codeStr}\'.`);
  }

  const propsStrArr = match.map(prop => prop.replace('.', ''));

  if (opts.maxLength >= propsStrArr.length) {
    return propsStrArr;
  } else if (opts.sliceAt === 'start') {
    return propsStrArr.slice(0, opts.maxLength);
  }

  return propsStrArr.slice(-opts.maxLength);
};
