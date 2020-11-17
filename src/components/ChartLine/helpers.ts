import { IChartView } from "@/components/ChartView";

type LineType = [number, number];
type GraphDataType = LineType[];

export const normalize = (value: number, min: number, max: number): number =>
  Math.abs((value - min) / (max - min));

export const dataToArea = (
  data: number[],
  area: IChartView,
  offset = 0,
  maxY: number
): GraphDataType => {
  if (area.width && data.length) {
    const xInterval = (area.width - offset) / data.length;
    return [...data].map((val, i) => [
      xInterval * i++ + offset,
      normalize(val, 0, maxY) * (area.height ? area.height : 1),
    ]);
  }
  return [];
};
