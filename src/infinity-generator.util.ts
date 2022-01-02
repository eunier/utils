export function* createInfinityGenerator() {
  let i = 1;

  while (true) {
    yield i++;
  }
}