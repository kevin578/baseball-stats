import React, { useState } from 'react';
import styled from 'styled-components';
import Table from './Table';
import BarChart from './BarChart';

const Page = styled.div`
  display: flex;
`;

const TableContainer = styled.div`
`;

const ChartContainer = styled.div`
  margin-left: 40px;
  margin-top: 40px;
`;

const App = () => {



  const [currentDataProperties, setCurrentDataProperties] = useState({
    criteria: 'avg',
    order: 'descending'
  });

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
    <Page>
      <TableContainer>
        <Table currentDataProperties = {currentDataProperties} handleSort = {handleSort}/>;
      </TableContainer>
      <ChartContainer>
        <BarChart currentDataProperties = {currentDataProperties}/>
      </ChartContainer>
    </Page>
  );
};

export default App;
