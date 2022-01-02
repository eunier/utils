export const randomNumArray = (arrLength = 10, max = 10, unique = false) => {
  let array: number[] = [];

  for (let i = 0; i < arrLength; i++) {
    let randNum = Math.floor(Math.random() * max + 0);

    if (unique) {
      if (!array.includes(randNum)) {
        array[i] = randNum;
      } else {
        i -= 1;
      }
    } else {
      array[i] = randNum;
    }
  }

  return array;
};
