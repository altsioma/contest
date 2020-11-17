import { ResponseChart, LineChart, RangePosititon } from "@/types";
import { IChartView } from "@/components/ChartView";

type ChartAvaiable = "line";

export const convertCharts = (
  data: ResponseChart[],
  typeOfChart: ChartAvaiable = "line"
): LineChart[] =>
  data.map((chart: ResponseChart) => {
    const Chart: LineChart = {
      x: [],
      collection: [],
      maxY: 0,
      togglers: {},
    };
    let maxY = 0;
    Object.keys(chart.types).map((type) => {
      let points: number[] = [];
      for (let j = 0; j < chart.columns.length; j++) {
        if (chart.columns[j][0] === type) {
          points = chart.columns[j].slice(1) as number[];
        }
      }
      if (chart.types[type] === "x") {
        Chart.x = points;
      } else if (chart.types[type] === typeOfChart) {
        const name = chart.names[type];
        Chart.collection.push({
          points: points,
          name,
          color: chart.colors[type],
        });
        maxY = Math.max(maxY, ...points);
        Chart.togglers[name] = true;
      }
      Chart.maxY = maxY;
    });
    return Chart;
  });

export const calcTransformRange = (
  range: RangePosititon,
  area: IChartView
): RangePosititon => {
  return {
    left: range.left / area.width,
    right: (area.width - range.right) / area.width,
  };
};

export const filterByRange = (
  array: (number | string)[],
  range: RangePosititon
): (number | string)[] => {
  if (range.left !== range.right) {
    return array.slice(
      Math.floor(array.length * range.left),
      Math.floor(array.length * range.right)
    );
  }
  return array;
};
