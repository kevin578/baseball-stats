import React, { useState } from 'react';
import styled from 'styled-components';
import short from 'short-uuid';
import stats from '../data/ranked_stats.json';

const Table = styled.table`
  background: #eaf7ed;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 700px;
  border-collapse: collapse;
  border-radius: 4px;
  margin-bottom: 40px;
`;

const TitleRow = styled.tr`
  height: 40px;
`;

const TitleCell = styled.th`
  width: ${props => props.width};
  text-align: left;
  border-bottom: 2px solid #353535;
  padding: 20px;
  cursor: pointer;
`;

const Cell = styled.td`
  height: 20px;
  padding: 20px;
`;

const Row = styled.tr`
  background: ${props =>
    props.background === 'even' ? '#daefdf' : 'transparent'};
`;

const App = () => {
  const [currentDataProperties, setCurrentDataProperties] = useState({
    criteria: 'avg',
    order: 'descending'
  });

  const getData = () => {
    const { criteria, order } = currentDataProperties;
    const currentData = stats[criteria][order];

    return currentData.map((item, index) => {
      return (
        <Row key={short.uuid()} background = {index % 2 === 0 ? "even":"odd"}>
          <Cell>{item.full_name}</Cell>
          <Cell>{item.avg}</Cell>
          <Cell>{item.hr}</Cell>
          <Cell>{item.rbi}</Cell>
          <Cell>{item.runs}</Cell>
          <Cell>{item.sb}</Cell>
          <Cell>{item.ops}</Cell>
        </Row>
      );
    });
  };

  const handleSort = criteria => {
    let order = 'descending';
    if (
      criteria === currentDataProperties.criteria &&
      currentDataProperties.order === 'descending'
    ) {
      order = 'ascending';
    }
    setCurrentDataProperties({ criteria, order });
  };

  

  return (
    <Table>
      <tbody>
        <TitleRow>
          <TitleCell>Player Name</TitleCell>
          <TitleCell onClick={() => handleSort('avg')}>Avg</TitleCell>
          <TitleCell onClick={() => handleSort('hr')}>HRs</TitleCell>
          <TitleCell onClick={() => handleSort('rbi')}>RBIs</TitleCell>
          <TitleCell onClick={() => handleSort('runs')}>Runs</TitleCell>
          <TitleCell onClick={() => handleSort('sb')}>SB</TitleCell>
          <TitleCell onClick={() => handleSort('ops')}>OPS</TitleCell>
        </TitleRow>
        {getData()}
      </tbody>
    </Table>
  );
};

export default App;
