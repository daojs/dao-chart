import _ from 'lodash';

export function joinResults({
  results,
  axisDimensions,
}) {
  const concatHeaders = _.map(results, ({ source }) => _.slice(source[0], axisDimensions.length));
  const counter = _.countBy(concatHeaders);
  // update serieName for duplicate
  _.each(results, ({ source, seriesMapper }) => {
    _.each(_.slice(source[0], axisDimensions.length), (header, index) => {
      if (_.get(counter, header) > 1) {
        const name = _.uniqueId(header);
        source[0][index + axisDimensions.length] = name; //eslint-disable-line
        seriesMapper[name] = seriesMapper[header]; // eslint-disable-line
        delete seriesMapper[header]; //eslint-disable-line
      }
    });
  });

  // merge results
  const mergedResult = _.reduce(results, (memo, result) => {
    if (_.isEmpty(memo)) {
      return result;
    }

    const { source, seriesMapper } = result;
    const { source: memoSource, seriesMapper: memoSeriesMapper } = memo;
    const headers = source[0].concat(memoSource[0].slice(axisDimensions.length));
    const srcIndexTag = 'indextag#1';
    const memoIndexTag = 'indextag#2';
    const srcObj = _.map(source.slice(1), (item, index) =>
      _.zipObject([...source[0], srcIndexTag], [...item, index / source.length]));
    const memoSrcObj = _.map(memoSource.slice(1), (item, index) =>
      _.zipObject([...memoSource[0], memoIndexTag], [...item, index / memoSource.length]));
    const groupedObjs = _.groupBy(
      memoSrcObj.concat(srcObj),
      item => JSON.stringify(_.pick(item, axisDimensions)),
    );
    const list = _.map(_.values(groupedObjs), items => _.merge(...items));
    const sortedList = list.sort((item1, item2) => {
      const index1 = _.at(item1, [srcIndexTag, memoIndexTag]);
      const index2 = _.at(item2, [srcIndexTag, memoIndexTag]);
      if (!_.isUndefined(index1[0]) && !_.isUndefined(index2[0])) {
        return index1[0] > index2[0] ? 1 : -1;
      }
      if (!_.isUndefined(index1[1]) && !_.isUndefined(index2[1])) {
        return index1[1] > index2[1] ? 1 : -1;
      }
      return 0;
    });
    const retData = _.map(sortedList, item => _.at(item, headers));
    return {
      source: [headers, ...retData],
      seriesMapper: {
        ...seriesMapper,
        ...memoSeriesMapper,
      },
    };
  }, {});

  return mergedResult;
}
