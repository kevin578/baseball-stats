import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalBarSeries, makeWidthFlexible } from 'react-vis';
import stats from '../data/ranked_stats.json';
import { ChartContainer, styles } from '../style';
const FlexibleXYPlot = makeWidthFlexible(XYPlot); 

const Histogram = () => {
  function distributeHomeRuns() {
    const players = stats.hr.descending;
    const hrDistribution = {};
    players.forEach(player => {
      if (hrDistribution[player.hr]) {
        hrDistribution[player.hr] += 1;
      } else {
        hrDistribution[player.hr] = 1;
      }
    });
    return hrDistribution;
  }

  function filterForMultipleHomeRuns(hrDistribution) {
    const filtered = [];
    Object.keys(hrDistribution).forEach(hrs => {
      if (hrDistribution[hrs] > 1) {
        filtered.push({
          x: parseInt(hrs, 10),
          y: hrDistribution[hrs]
        });
      }
    });
    return filtered;
  }

  function getData() {
    const hrDistribution = distributeHomeRuns();
    return filterForMultipleHomeRuns(hrDistribution);
  }



  return (
    <ChartContainer>
      <FlexibleXYPlot height={styles.chartHeight}>
        <VerticalBarSeries data={getData()} color={styles.barColor} />
        <XAxis tickSize={styles.tickSize} style={styles.axisStyle} />
        <YAxis
          style={styles.axisStyle}
          left = {1}
          tickSize={styles.tickSize}
          tickTotal={getData().sort((a, b) => b.y - a.y)[0].y}
          
        />
      </FlexibleXYPlot>
    </ChartContainer>
  );
};

export default Histogram;
