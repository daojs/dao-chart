import _ from 'lodash';
import Promise from 'bluebird';
import lineConverter from './line';

const type2Converter = {
  line: lineConverter,
};

export default function (meta) {
  const { chartType } = meta;
  if (_.has(type2Converter, chartType)) {
    return type2Converter[chartType](meta);
  }
  return Promise.resolve({});
}
