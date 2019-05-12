const request = require('request');
const convert = require('xml-js');
const fs = require('fs');
const xpath = require('xpath');
const Dom = require('xmldom').DOMParser;

const options = {
  method: 'GET',
  url: 'http://www.cafeconleche.org/examples/baseball/1998statistics.xml'
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);

  function filterXML() {
    const doc = new Dom().parseFromString(body);
    return xpath.select('//PLAYER', doc);
  }

  function convertToJSON(nodes) {
    const playerArray = [];
    nodes.forEach(node => {
      const item = convert.xml2js(node.toString(), {
        compact: true,
        ignoreAttributes: true
      });
      const {
        GIVEN_NAME,
        SURNAME,
        AT_BATS,
        HITS,
        HOME_RUNS,
        RBI,
        DOUBLES,
        TRIPLES,
        STEALS,
        RUNS,
        WALKS,
        SACRIFICE_FLIES,
        HIT_BY_PITCH
      } = item.PLAYER;

      if (!AT_BATS) return;

      const givenName = GIVEN_NAME._text;
      const surname = SURNAME._text;
      const fullName = `${givenName} ${surname}`;
      const ab = parseInt(AT_BATS._text, 10);
      const hits = parseInt(HITS._text, 10);
      const hr = parseInt(HOME_RUNS._text, 10);
      const rbi = parseInt(RBI._text, 10);
      const runs = parseInt(RUNS._text, 10);
      const sb = parseInt(STEALS._text, 10);
      const doubles = parseInt(DOUBLES._text, 10);
      const triples = parseInt(TRIPLES._text, 10);
      const walks = parseInt(WALKS._text, 10);
      const hitByPitch = parseInt(HIT_BY_PITCH._text, 10);
      const sacrificeFlies = parseInt(SACRIFICE_FLIES._text, 10);
      const singles = hits - (doubles + triples + hr);

      let avg = (hits / ab).toFixed(3).slice(1);
      if (Number.isNaN(avg)) {
        avg = '.000';
      }

      const obp =
        (hits + walks + hitByPitch) /
        (ab + walks + hitByPitch + sacrificeFlies);

      const slg = (singles + doubles * 2 + triples * 3 + hr * 4) / ab;

      let ops = parseFloat(obp + slg).toFixed(3);

      if (ops[0] === '0') ops = ops.slice(1);
      if (Number.isNaN(ops)) {
        ops = '.000';
      }
      playerArray.push({
        given_name: givenName,
        surname,
        full_name: fullName,
        ab,
        avg,
        hr,
        rbi,
        runs,
        walks,
        hit_by_pitch: hitByPitch,
        sb,
        obp,
        slg,
        ops
      });
    });
    return playerArray;
  }

  function sortPlayers(arr, criteria, { limit, ascending }) {
    function checkForAB() {
      return arr.filter(player => {
        return player.ab + player.walks + player.hit_by_pitch > 501;
      });
    }

    const filteredArr = checkForAB();

    const sortedPlayers = filteredArr.sort((a, b) => {
      if (ascending) {
        return a[criteria] - b[criteria];
      }
      return b[criteria] - a[criteria];
    });

    const filteredPlayers = [];

    for (let i = 0; i < limit; i += 1) {
      filteredPlayers.push(sortedPlayers[i]);
    }

    return filteredPlayers;
  }

  function rankPlayers(playerArray) {
    return {
      avg: {
        descending: sortPlayers(playerArray, 'avg', { limit: 25 }),
        ascending: sortPlayers(playerArray, 'avg', {
          limit: 25,
          ascending: true
        })
      },
      hr: {
        descending: sortPlayers(playerArray, 'hr', { limit: 25 }),
        ascending: sortPlayers(playerArray, 'hr', {
          limit: 25,
          ascending: true
        })
      },
      rbi: {
        descending: sortPlayers(playerArray, 'rbi', { limit: 25 }),
        ascending: sortPlayers(playerArray, 'rbi', {
          limit: 25,
          ascending: true
        })
      },
      runs: {
        descending: sortPlayers(playerArray, 'runs', { limit: 25 }),
        ascending: sortPlayers(playerArray, 'runs', {
          limit: 25,
          ascending: true
        })
      },
      sb: {
        descending: sortPlayers(playerArray, 'sb', { limit: 25 }),
        ascending: sortPlayers(playerArray, 'sb', {
          limit: 25,
          ascending: true
        })
      },
      ops: {
        descending: sortPlayers(playerArray, 'ops', { limit: 25 }),
        ascending: sortPlayers(playerArray, 'ops', {
          limit: 25,
          ascending: true
        })
      }
    };
  }

  function writeFile(playerList) {
    fs.writeFile(
      './ranked_stats.json',
      JSON.stringify(rankPlayers(playerList), null, 4),
      err => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File has been created');
      }
    );
  }

  const nodes = filterXML();
  const playerList = convertToJSON(nodes);
  writeFile(playerList);




});
