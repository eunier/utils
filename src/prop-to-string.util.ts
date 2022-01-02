export const propToString = <T>(expression: (model: T) => unknown): string => {
  const expStr = expression.toString();
  const expSplitOnReturn = expStr.split('return');
  const expSplitOnDot = expSplitOnReturn.slice(-1)[0].split('.');
  const propArr = expSplitOnDot.slice(-1)[0].split(';');
  const prop = propArr[0];
  return prop;
};
