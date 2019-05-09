import React, { useEffect } from "react";
import axios from "axios";
import stats from '../data/ranked_stats.json'



const App = () => {

const getData = ()=> {
    return stats.sb.descending.map((item, index)=> {
        return (
            <tr>  
                <td >{item.full_name}</td>
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
  useEffect(() => {

  }, []);

  return (
    <table>
    <tbody>
    <tr>
      <td>Player Name</td>
      <td>Avg</td>
      <td>Home Runs</td>
      <td>RBIs</td>
      <td>Runs</td>
      <td>SB</td>
      <td>OPS</td>
    </tr>
    { getData() }
    </tbody>
    </table>
  );
};

export default App;
