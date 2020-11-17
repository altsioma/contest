export type Collection = {
  points: number[];
  name: string;
  color: string;
};

export interface LineChart {
  x: number[];
  maxY: number;
  collection: Collection[];
  togglers: { [key: string]: boolean };
}
