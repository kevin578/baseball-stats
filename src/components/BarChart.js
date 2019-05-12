import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  XYPlot,
  XAxis,
  YAxis,
  Hint,
  VerticalBarSeries,
  makeWidthFlexible
} from 'react-vis';
import stats from '../data/ranked_stats.json';
import '../../node_modules/react-vis/dist/style.css';
import { ChartContainer, styles } from '../style';
const FlexibleXYPlot = makeWidthFlexible(XYPlot);

const HintContainer = styled.div`
  background: #eaf7ed;
  padding: 1px 10px;
  border-radius: 4px;
  color: #474747;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const BarChart = ({ currentDataProperties }) => {
  const [hintValue, setHintValue] = useState();
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  function getData() {
    const { criteria, order } = currentDataProperties;
    return stats[criteria][order].map(player => {
      return { x: player.full_name, y: player[criteria] };
    });
  }

  function formatYAxis(t, i) {
    function convertDecimals() {
      if (i === 0)
        return (
          <tspan x="0" dy="0">
            .000
          </tspan>
        );
      const str = (t * 1000).toString().split('');
      const insertSpot = str.length - 3;
      str.splice(insertSpot, 0, '.');
      return (
        <tspan x="0" dy="0">
          {str.join('')}
        </tspan>
      );
    }

    if (
      currentDataProperties.criteria === 'avg' ||
      currentDataProperties.criteria === 'ops'
    ) {
      return convertDecimals();
    }

    return (
      <tspan x="0" dy="0">
        {t}
      </tspan>
    );
  }

  function mouseOver(event) {
    setHoveredPlayer(event.x);
    setHintValue(event);
  }

  function mouseExit() {
    setHoveredPlayer(null);
    setHintValue();
  }

  return (
    <ChartContainer>
      <FlexibleXYPlot
        height={styles.chartHeight}
        xType="ordinal"
        margin={{ left: 50, bottom: 150 }}
        onMouseLeave={mouseExit}
      >
        <VerticalBarSeries
          // animation={{ stiffness: 50 }}
          data={getData()}
          onValueMouseOver={mouseOver}
          colorType="literal"
          getColor={id =>
            id.x === hoveredPlayer ? '#8fa8b7' : styles.barColor
          }
        />
        <XAxis
          tickLabelAngle={-90}
          tickSize={styles.tickSize}
          style={styles.axisStyle}
        />
        <YAxis
          tickFormat={formatYAxis}
          style={styles.axisStyle}
          tickSize={styles.tickSize}
        />
        {hintValue && (
          <Hint value={hintValue}>
            <HintContainer>
              <p>{hintValue.x}</p>
              <p>{hintValue.y}</p>
            </HintContainer>
          </Hint>
        )}
      </FlexibleXYPlot>
    </ChartContainer>
  );
};

BarChart.defaultProps = {
  currentDataProperties: {
    criteria: 'avg',
    order: 'descending'
  }
};

BarChart.propTypes = {
  currentDataProperties: PropTypes.shape({
    criteria: PropTypes.string,
    order: PropTypes.string
  })
};

export default BarChart;
