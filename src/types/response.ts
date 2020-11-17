export type Items = { [key: string]: string };

export interface ResponseChart {
  columns: (number | string)[][];
  types: Items;
  names: Items;
  colors: Items;
}
