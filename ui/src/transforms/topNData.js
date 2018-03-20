import _ from 'lodash';

export function topNData({
  take,
  source,
  metric,
  axisDimensions,
  seriesMapper,
}) {
  const revenues = _.map(
    _.unzip(source),
    item => (_.includes(axisDimensions, item[0]) ? undefined :
      ({ [item[0]]: _.sumBy(item.slice(1), val => (_.isObject(val) ? val[metric] : val)) })),
  );

  const rets = _.sortBy(_.compact(revenues), item => _.values(item)[0]);
  const data = _.flatten(_.map(
    rets.slice(-take),
    ret => _.map(ret, (val, key) => ([key, val])),
  ));
  return {
    source: [['serie', metric], ...data],
    seriesMapper,
  };
}
