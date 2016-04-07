
export const getIds = (data) => {
  return data.map((row) => {
    if (row.has('id')) {
      let val = row.get('id');
      if (val) {
        return val;
      }
    }
  }).toSet().sort();
};

export const countAirThreats = (data) => {
  return data.filter((row) => {
    return row.get('objType') === 'AIRBREATHER';
  }).size;
};
