import { ReactElement } from 'react';

export const getClassName = (reactElement: ReactElement): string => {
  return reactElement.props.className;
};
