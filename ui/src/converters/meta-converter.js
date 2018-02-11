import _ from 'lodash';

export default function metaConverter(option, meta) {
  return _.defaults({
    title: {
      // text: 'Title from metaConverter',
      text: meta.brief,
    },
  }, option);
}
