import React, {useEffect} from "react";
import axios from 'axios';
import data from '../data/1998_stats.json';
import _ from 'lodash';



const App = () => {
    const players = {
        AL_EAST: [],
        AL_CENTRAL: [],
    }
    useEffect(()=> {
        let obj = JSON.parse(data).SEASON.LEAGUE[0].DIVISION[0];
        console.log(obj)

    }, [])


  return <div>Hello</div>;
};

export default App;
