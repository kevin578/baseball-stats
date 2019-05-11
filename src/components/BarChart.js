import React, { useState } from 'react';
import styled from 'styled-components';
import {
  XYPlot,
  XAxis,
  YAxis,
  Hint,
  VerticalBarSeries
} from 'react-vis';
import stats from '../data/ranked_stats.json';
import '../../node_modules/react-vis/dist/style.css';


const BarChartContainer = styled.div`
    padding: 20px;
    background: #eaf7ed;
    border-radius: 4px;
`;

const axisStyle = {
  line: { stroke: '#545F66' },
  text: {fill: '#545F66'}
};

const BarChart = ({ currentDataProperties }) => {
  const [hintValue, setHintValue] = useState(null);

  const getData = () => {
    const { criteria, order } = currentDataProperties;
    return stats[criteria][order].map(player => {
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

  function mouseOver(e, i) {
    setHintValue(e);
  }

  return (
    <BarChartContainer>
      <XYPlot
        width={500}
        height={400}
        xType="ordinal"
        margin={{ left: 50, bottom: 150 }}
        onMouseLeave={() => setHintValue(null)}
      >
        <VerticalBarSeries
          animation={{ stiffness: 50 }}
          data={getData()}
          onValueMouseOver={mouseOver}
          onValueMouseOut={() => setHintValue()}
          color="#545F66"
        />
        <XAxis tickLabelAngle={-90} tickSize={2} style={axisStyle} />
        <YAxis tickFormat={formatYAxis} style = {axisStyle}/>
        {hintValue && (
          <Hint value={hintValue}>
            <div style={{ background: 'black' }}>
              <p>{hintValue.x}</p>
              <p>{hintValue.y}</p>
            </div>
          </Hint>
        )}
      </XYPlot>
    </BarChartContainer>
  );
};

export default BarChart;
