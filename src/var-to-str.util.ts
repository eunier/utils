import { WORD } from '../constants';

export const varToStr = (expression: () => void): string => {
  const codeStr = expression.toString();
  const match = codeStr.match(WORD);

  if (!match) {
    throw Error(`Invalid expression '${codeStr}'.`);
  }

  const word = match.slice(-1)[0];

  return word;
};

const aVar = 'abc';

console.log(varToStr(() => aVar)); // => abc
