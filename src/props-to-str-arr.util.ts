import { BREAK_LINE, OBJECT_PROPERTIES } from './constants';
import { FunctionExpression } from './types';

export const propsToStrArr = <T>(
  expression: FunctionExpression<T>,
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
    .replaceAll(BREAK_LINE, '')
    .replaceAll('"', "'")
    .replaceAll("['", '.')
    .replaceAll("']", '.');

  const match = codeStrFormatted.match(OBJECT_PROPERTIES);

  const path = codeStrFormatted
    .split('.')
    .slice(1)
    .map(str => str.trim());

  if (!match) {
    throw Error(`There is no properties on expression \'${codeStr}\'.`);
  }

  const propsStrArr = path
    .map(prop => prop.replaceAll('.', ''))
    .filter(prop => prop !== '');

  if (opts.maxLength >= propsStrArr.length) {
    return propsStrArr;
  } else if (opts.sliceAt === 'start') {
    return propsStrArr.slice(0, opts.maxLength);
  }

  return propsStrArr.slice(-opts.maxLength);
};
