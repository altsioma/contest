import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { formatNumber, formatDate } from "@/utils/formatters";
import { IChartView } from "@/components/ChartView";

export const ChartGridContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

export const ChartGridLine = styled.div`
  position: absolute;
  height: 1px;
  width: 100%;
  background: rgba(176, 193, 204, 0.3);
`;

export const ChartAxisX = styled.div`
  color: #96a2aa;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  height: 35px;
`;

export const ChartLabel = styled.div`
  position: absolute;
  text-align: center;
  color: #96a2aa;
  font-size: 12px;
`;

interface IGrid {
  area: IChartView;
  xAxis: (string | number)[];
  maxX?: number;
  maxY?: number;
}

export const ChartGrid: React.FC<IGrid> = ({
  area,
  maxY = area.height,
  xAxis,
}) => {
  const LinesCharts: JSX.Element[][] = [];
  const numOfChartLines = 5;
  const yStep = area.height / numOfChartLines;
  const yLabelStep = maxY / numOfChartLines;
  let i = 0;
  for (let step = 0; step <= area.height; step = step + yStep) {
    LinesCharts.push([
      <Fragment key={`y_${step}`}>
        <ChartGridLine style={{ bottom: step, opacity: 1 }} />
        <ChartLabel style={{ bottom: step, opacity: 1 }}>
          {formatNumber(yLabelStep * i, true)}
        </ChartLabel>
      </Fragment>,
    ]);
    i++;
  }

  const xLables: JSX.Element[] = [];
  let labelIndex = 0;
  const labelWidth = 100;
  const stepWidth = area.width / labelWidth;
  const labelStep = Math.floor(xAxis.length / stepWidth);
  for (let step = 0; step < area.width; step = step + labelWidth) {
    xLables.push(
      <ChartLabel
        key={`x_${step}`}
        style={{ left: step, top: 5, width: labelWidth }}
      >
        {formatDate(parseFloat(xAxis[labelIndex] as string), false, true)}
      </ChartLabel>
    );
    labelIndex += labelStep;
  }
  return (
    <>
      <ChartGridContainer>{LinesCharts}</ChartGridContainer>
      <ChartAxisX>{xLables}</ChartAxisX>
    </>
  );
};
