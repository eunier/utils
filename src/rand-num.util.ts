export const randomNum = (min = 1, max = 9): number => {
  return Math.floor(Math.random() * max) + min;
};
