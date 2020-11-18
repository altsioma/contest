import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStart } from "@/modules/Loader/";
import { AppState } from "@/store";
import { ChartView } from "@/components/ChartView";
import { ChartGrid } from "@/components/ChartGrid";
import { RangeSelector } from "@/components/RangeSelector";
import { Toggler, TogglerGroup } from "@/components/Toggler";
import { SVGContainer } from "@/components/SVGContainer";
import { ChartLine } from "@/components/ChartLine";
import { actions } from "./reducer";
import { filterByRange } from "./handlers";
import { Global, css } from "@emotion/core";

const mapStateToProps = (state: AppState) => ({
  loader: state.loader,
  app: state.app,
});

const mapDispatchToProps = {
  fetchStart,
  setChart: actions.setActiveChart,
  setPosition: actions.setPosition,
  toggleActive: actions.toggleActive,
  switchTheme: actions.switchTheme,
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const ChartComponent: React.FC<Props> = ({
  loader,
  fetchStart,
  app,
  setPosition,
  setChart,
  toggleActive,
  switchTheme,
}) => {
  const { loading, error } = loader;
  const { charts, activeChart } = app;

  useEffect(() => {
    fetchStart();
  }, [fetchStart]);

  return (
    <div>
      <Global
        styles={css`
          body {
            background-color: ${app.isNightMode ? `#242f3e` : `white`};
          }
        `}
      />
      <div style={{ textAlign: "right" }}>
        <Toggler
          onClick={(status: boolean) => {
            switchTheme(status);
          }}
          label={"Night mode"}
          color="rgb(16, 139, 227)"
          isActive={app.isNightMode}
        />
      </div>

      {loading && <span>Please wait</span>}
      {error && <span>{error}</span>}
      {charts && charts.length > 0 && (
        <ChartView area={app.area}>
          <SVGContainer>
            {charts[activeChart].collection.map((chart, index) => {
              return (
                <ChartLine
                  area={app.area}
                  maxY={charts[activeChart].maxY}
                  isActive={charts[activeChart].togglers[chart.name]}
                  key={index}
                  stroke={chart.color}
                  strokeWidth="2.2px"
                  data={filterByRange(chart.points, app.range) as number[]}
                  style={{ transition: "opacity 0.3s" }}
                />
              );
            })}
          </SVGContainer>
          <ChartGrid
            area={app.area}
            xAxis={filterByRange(charts[activeChart].x, app.range)}
            maxY={charts[activeChart].maxY}
          />

          <RangeSelector
            isNight={app.isNightMode}
            position={app.position}
            setPosition={setPosition}
          >
            <SVGContainer>
              {charts[activeChart].collection.map((chart, index) => (
                <ChartLine
                  area={{
                    width: app.area.width,
                    height: app.area.height * 0.13,
                  }}
                  maxY={charts[activeChart].maxY}
                  isActive={charts[activeChart].togglers[chart.name]}
                  key={index}
                  transform={"scale(1,0.8)"}
                  stroke={chart.color}
                  strokeWidth="1.2px"
                  data={chart.points}
                />
              ))}
            </SVGContainer>
          </RangeSelector>
          <TogglerGroup>
            {charts[activeChart].collection.map((chart, index) => (
              <Toggler
                onClick={(status: boolean) => {
                  toggleActive({ name: chart.name, status });
                }}
                key={index}
                label={chart.name}
                color={chart.color}
                isActive={charts[activeChart].togglers[chart.name]}
              />
            ))}
          </TogglerGroup>
          <TogglerGroup>
            {charts.map((n, index) => (
              <Toggler
                isActive={index === activeChart}
                color="#ff7a00"
                label={`Dataset: ${index + 1}`}
                onClick={() => setChart(index)}
                key={index}
              >
                {index}
              </Toggler>
            ))}
          </TogglerGroup>
        </ChartView>
      )}
    </div>
  );
};

export const Chart = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartComponent);
