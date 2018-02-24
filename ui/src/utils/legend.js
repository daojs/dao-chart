import _ from 'lodash';

export function getLegend({
  dimensions = [],
  defaultLegend = {},
}) {
  return _.defaults({}, defaultLegend, {
    data: dimensions.slice(1),
  });
}
