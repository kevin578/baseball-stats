import React, { useState, useEffect } from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalRectSeries
} from 'react-vis';
import stats from '../data/ranked_stats.json';

const myData = [
  { x: 0, x0: 1, y: 10, y0: 0 },
  { x: 1, x0: 2, y: 5, y0: 0 },
  { x: 2, x0: 4, y: 15, y0: 0 }
];

const Histogram = ({ currentDataProperties }) => {
  const { criteria, order } = currentDataProperties;
  const currentStats = stats[criteria][order];
  const min = currentStats[0][criteria];
  const max = currentStats[currentStats.length - 1][criteria];
  const ranges = getRanges();
  const distribution = distributePlayers();

  function parseNumber(num) {
    return parseInt(num, 10) ? parseInt(num, 10) : parseFloat(num);
  }

  function getRanges() {
    const calculateRange = (min, max) => {
      const numberOfBars = 4;
      const diff = max - min;
      const iterator = diff / numberOfBars;
      const ranges = [];

      for (let i = 1; i < numberOfBars + 1; i++) {
        ranges.push(min + iterator * i);
      }

      return ranges;
    };
    return calculateRange(parseNumber(min), parseNumber(max));
  }

  function placeInArray(arr, item) {
    for (let i = 0; i < arr.length; i++) {
      if (item > arr[i]) {
        return i;
      }
    }
  }

  function distributePlayers() {
    const distribution = { 0: 0, 1: 0, 2: 0, 3: 0 };

    currentStats.forEach(player => {
      const place = placeInArray(getRanges(), player[criteria]);
      distribution[place] = distribution[place] + 1;
    });

    return distribution;
  }

  const data = [
    { x: max, x0: ranges[0], y: distribution[0] },
    { x: ranges[0], x0: ranges[1], y: distribution[1] },
    { x: ranges[1], x0: ranges[2], y: distribution[2] }
  ];

  return (
    <XYPlot width={300} height={300} yDomain={[0, 25]} xDomain={[min, 45, max]}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <VerticalRectSeries data={data} style={{ stroke: '#fff' }} />
    </XYPlot>
  );
};

export default Histogram;
