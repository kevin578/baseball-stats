import styled from 'styled-components';


const chartColor = '#545F66';

export const ChartContainer = styled.div`
  padding: 20px;
  background: #eaf7ed;
  border-radius: 4px;
  margin-bottom: 40px;
`;



export const styles = {
  barColor: chartColor,
  tickSize: 2,
  axisStyle: {
    line: { stroke: chartColor },
    text: { fill: chartColor }
  },
  chartWidth: 500,
  chartHeight: 400
};
