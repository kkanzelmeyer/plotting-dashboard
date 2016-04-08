import { Set } from 'immutable';

const getSummaryMetrics = (data) => {
  let ids = new Set();
  let airThreats = new Set();

  data.forEach((row) => {
    if (row.has('id')) {
      ids = ids.add(row.get('id'));
    }
    if (row.get('objType') === 'AIRBREATHER') {
      airThreats = airThreats.add(row.get('id'));
    }
  });

  return ({
    trackIds: ids.sort(),
    airThreats: airThreats,
    ramThreats: 0,
    radars: [
      {
        name: '',
        id: 0
      }
    ],
    time: 0,
    avgTqVel: 0,
    avgTzPos: 0
  });
};

export default getSummaryMetrics;
