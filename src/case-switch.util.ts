import { CAMEL_CASE } from "./constants";


export const camelCaseToUnderscoreCase = (str: string) => {
  return str.replace(CAMEL_CASE, '$1-$2').toLowerCase();
};
