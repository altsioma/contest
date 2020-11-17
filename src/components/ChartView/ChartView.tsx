import React from "react";
import styled from "@emotion/styled";

export interface IChartView {
  width: number;
  height: number;
}

interface IChartViewsProps {
  area: IChartView;
}

export const ChartViewContainer = styled.div`
  height: 430px;
  max-height: 75vh;
  position: relative;
`;

export const ChartView: React.FC<IChartViewsProps> = ({ area, children }) => (
  <ChartViewContainer style={{ width: area.width }}>
    {children}
  </ChartViewContainer>
);
