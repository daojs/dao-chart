import Promise from 'bluebird';

export const fetch = (/* meta */) => {
  const mockData = {
    metrics: [
      'price',
    ],
    dimensions: [
      'product',
      'location',
      'time',
    ],
    primaryDim: 'time',
    value: [
      [1.3, 'apple', 'beijing', 2013],
      [1.8, 'apple', 'beijing', 2014],
      [3.3, 'apple', 'beijing', 2015],
      [4.3, 'apple', 'beijing', 2016],
      [2.3, 'apple', 'beijing', 2017],
      [3.4, 'apple', 'beijing', 2018],
      [3.7, 'apple', 'suzhou', 2013],
      [4.0, 'apple', 'suzhou', 2014],
      [5.7, 'apple', 'suzhou', 2015],
      [4.3, 'apple', 'suzhou', 2016],
      [1.1, 'apple', 'suzhou', 2017],
      [2.7, 'apple', 'suzhou', 2018],
      [6.3, 'banana', 'beijing', 2013],
      [9.3, 'banana', 'beijing', 2014],
      [9.4, 'banana', 'beijing', 2015],
      [11.5, 'banana', 'beijing', 2016],
      [12.1, 'banana', 'beijing', 2017],
      [12.3, 'banana', 'beijing', 2018],
      [8.7, 'banana', 'suzhou', 2013],
      [7.7, 'banana', 'suzhou', 2014],
      [8.7, 'banana', 'suzhou', 2015],
      [7.8, 'banana', 'suzhou', 2016],
      [5.3, 'banana', 'suzhou', 2017],
      [7.6, 'banana', 'suzhou', 2018],
    ],
  };
  return Promise.resolve(mockData);
};
