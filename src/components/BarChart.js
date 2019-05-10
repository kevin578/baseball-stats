import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  Crosshair,
  VerticalGridLines,
  VerticalBarSeries
} from 'react-vis';
import stats from '../data/ranked_stats.json';

const BarChart = ({ currentDataProperties }) => {
  
    const getData = () => {
    const { criteria, order } = currentDataProperties;
    return stats[criteria][order].reverse().map(player => {
      return { x: player.full_name, y: player[criteria] };
    });
  };

  function formatYAxis(t, i) {
    if (
      currentDataProperties.criteria === 'avg' ||
      currentDataProperties.criteria === 'ops'
    ) {
      if (i === 0)
        return (
          <tspan x="0" dy="0">
            .000
          </tspan>
        );
      const str = (t * 1000).toString();
      return <tspan x="0" dy="0">{`.${str}`}</tspan>;
    }
    return (
      <tspan x="0" dy="0">
        {t}
      </tspan>
    );
  }

  return (
    <div>
      <XYPlot width={500} height={300} xType="ordinal" margin={{ left: 50 }}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <HorizontalGridLines />
        <VerticalBarSeries animation={{ stiffness: 50 }} data={getData()} />
        <XAxis />
        <YAxis tickFormat={formatYAxis} />
      </XYPlot>
    </div>
  );
};

export default BarChart;
