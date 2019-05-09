import React, { useState } from "react";
import axios from "axios";
import stats from '../data/ranked_stats.json'



const App = () => {

  const [currentDataProperties, setCurrentDataProperties] = useState({criteria: "avg", order: "descending"});

  const getData = ()=> {
    const {criteria, order} = currentDataProperties;
    const currentData = stats[criteria][order];

    return currentData.map((item, index)=> {
        return (
            <tr>  
                <td>{item.full_name}</td>
                <td>{item.avg}</td>
                <td>{item.hr}</td>
                <td>{item.rbi}</td>
                <td>{item.runs}</td>
                <td>{item.sb}</td>
                <td>{item.ops}</td>
            </tr>
        )
    })
}

const handleSort = (criteria)=> {
  //console.log(Object.keys)
  setCurrentDataProperties({criteria, order: "descending"});
}


  return (
    <table>
    <tbody>
    <tr>
      <td>Player Name</td>
      <td onClick = {()=> handleSort("hr")}>Avg</td>
      <td onClick = {()=> handleSort("hr")}>HRs</td>
      <td onClick = {()=> handleSort("rbi")}>RBIs</td>
      <td onClick = {()=> handleSort("runs")}>Runs</td>
      <td onClick = {()=> handleSort("sb")}>SB</td>
      <td onClick = {()=> handleSort("ops")}>OPS</td>
    </tr>
    { getData() }
    </tbody>
    </table>
  );
};

export default App;
