
const getSummaryMetrics = (data) => {
  return ({
    totalThreats: 0,
    airThreats: 0,
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
