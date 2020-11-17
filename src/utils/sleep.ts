export const sleep = (x: number): Promise<void> =>
  new Promise((r) => setTimeout(r, x));
