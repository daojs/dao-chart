import _ from 'lodash';
import { fetch } from '../datasource';
import metaConverter from './meta-converter';
import dataConverter from './data-converter';
import lineConverter from './line';

const type2Converter = {
  line: lineConverter,
};

export default function (meta) {
  return fetch(meta).then(data => _.chain([{}])
    .map(option => metaConverter(option, meta, data))
    .map(option => dataConverter(option, meta, data))
    .map((option) => {
      const { chartType } = meta;
      if (_.has(type2Converter, chartType)) {
        return type2Converter[chartType](option, meta, data);
      }
      return option;
    })
    .first()
    .value());
}
