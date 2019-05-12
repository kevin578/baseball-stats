import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import short from 'short-uuid';
import stats from '../data/ranked_stats.json';

const TableContainer = styled.table`
  background: #eaf7ed;
  margin-top: 40px;
  width: 500px;
  border-collapse: collapse;
  border-radius: 4px;
  margin-bottom: 40px;
  margin-left: 40px;
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
  background: ${props => (props.selected ? '#daefdf' : 'transparent')};
`;

const Cell = styled.td`
  height: 20px;
  padding: 20px;
`;

const Row = styled.tr`
  background: ${props =>
    props.background === 'even' ? '#daefdf' : 'transparent'};
`;

const Table = ({ handleSort, currentDataProperties }) => {
  
  function renderRows() {
    const { criteria, order } = currentDataProperties;
    const currentData = stats[criteria][order];

    return currentData.map((item, index) => {
      return (
        <Row key={short.uuid()} background={index % 2 === 0 ? 'even' : 'odd'}>
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
  }

  return (
    <TableContainer>
      <tbody>
        <TitleRow>
          <TitleCell>Player Name</TitleCell>
          <TitleCell
            selected={currentDataProperties.criteria === 'avg'}
            onClick={() => handleSort('avg')}
          >
            Avg
          </TitleCell>
          <TitleCell
            selected={currentDataProperties.criteria === 'hr'}
            onClick={() => handleSort('hr')}
          >
            HRs
          </TitleCell>
          <TitleCell
            selected={currentDataProperties.criteria === 'rbi'}
            onClick={() => handleSort('rbi')}
          >
            RBIs
          </TitleCell>
          <TitleCell
            selected={currentDataProperties.criteria === 'runs'}
            onClick={() => handleSort('runs')}
          >
            Runs
          </TitleCell>
          <TitleCell
            selected={currentDataProperties.criteria === 'sb'}
            onClick={() => handleSort('sb')}
          >
            SB
          </TitleCell>
          <TitleCell
            selected={currentDataProperties.criteria === 'ops'}
            onClick={() => handleSort('ops')}
          >
            OPS
          </TitleCell>
        </TitleRow>

        {renderRows()}
        
      </tbody>
    </TableContainer>
  );
};

Table.defaultProps = {
  handleSort: () => 'The handleSort function prop was not passed',
  currentDataProperties: {
    criteria: 'avg',
    order: 'descending'
  }
};

Table.propTypes = {
  handleSort: PropTypes.func,
  currentDataProperties: PropTypes.shape({
    criteria: PropTypes.string,
    order: PropTypes.string
  })
};

export default Table;
