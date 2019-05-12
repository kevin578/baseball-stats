import React, { useState } from 'react';
import styled from 'styled-components';
import Table from './Table';
import BarChart from './BarChart';
import Histogram from './Histogram';
import media from './mediaQueries';

const Page = styled.div`
  display: flex;
  ${media.tablet`display: block;`}
`;

const TableContainer = styled.div`
`;

const ChartContainer = styled.div`
  margin-left: 40px;
  margin-top: 40px;
  width: 500px;
  ${media.smallLaptop`width: 400px;`}
  ${media.tablet`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  `}
  ${media.phone`width: 90%`}
`;

const App = () => {
  const [currentDataProperties, setCurrentDataProperties] = useState({
    criteria: 'avg',
    order: 'descending'
  });

  function handleSort(newCriteria) {
    let order = 'descending';
    if (
      newCriteria === currentDataProperties.criteria &&
      currentDataProperties.order === 'descending'
    ) {
      order = 'ascending';
    }
    setCurrentDataProperties({ criteria: newCriteria, order });
  }

  return (
    <Page>
      <TableContainer>
        <Table
          currentDataProperties={currentDataProperties}
          handleSort={handleSort}
        />
      </TableContainer>
      <ChartContainer>
        <BarChart currentDataProperties={currentDataProperties} />
        <Histogram currentDataPrhoperties={currentDataProperties} />
      </ChartContainer>
    </Page>
  );
};

export default App;
