import { IChartView } from "@/components/ChartView";

type LineType = [number, number];
type GraphDataType = LineType[];

export const normalize = (value: number, min: number, max: number): number =>
  Math.abs((value - min) / (max - min));

export const dataToArea = (
  data: number[],
  area: IChartView,
  maxY: number = area.height
): GraphDataType => {
  if (data.length) {
    const xInterval = area.width / data.length;
    return data.map((val, i) => [
      xInterval * i++,
      normalize(val, 0, maxY) * area.height,
    ]);
  }
  return [];
};
