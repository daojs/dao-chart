import _ from 'lodash';

export function validate(source) {
  if (!source) {
    throw new Error('No source');
  }
  const dimensions = _.first(source);
  if (_.isEmpty(dimensions)) {
    throw new Error('Dimension invalid');
  }
  return true;
}
