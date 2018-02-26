import _ from 'lodash';

// Get every column of a 2-dim array
export const transpose = (arr = []) => _.chain(arr)
  .first()
  .keys()
  .map(colIndex => _.map(arr, row => row[colIndex]))
  .value();
