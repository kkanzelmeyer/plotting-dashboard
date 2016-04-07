
const getSummaryMetrics = (data) => {
  let ids = new Set();
  let airThreats = new Set();

  data.forEach((row) => {
    if (row.has('id')) {
      ids.add(row.get('id'));
    }
    if (row.get('objType') === 'AIRBREATHER') {
      airThreats.add(row.get('id'));
    }
  });

  return ({
    totalThreats: ids.size,
    airThreats: airThreats.size,
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
