import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';

const array2Tree = (items, primaryKey, parentKey) =>
  _.reduce(items, (memo, item) => {
    const itemId = _.result(item, primaryKey);
    const parentId = _.result(item, parentKey);

    if (_.isEmpty(memo[itemId])) {
      // Add a preliminary item, its data will be added later
      _.extend(memo, { [itemId]: { children: [] } });
    }

    _.extend(memo[itemId], item);

    if (_.isEmpty(memo[parentId])) {
      _.extend(memo, { [parentId]: { children: [] } });
    }

    memo[parentId].children.push(memo[item[primaryKey]]);

    return memo;
  }, {});

export default class Treemap extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
    primaryKey: PropTypes.string,
    parentKey: PropTypes.string,
  }

  static defaultProps = {
    primaryKey: 'id',
    parentKey: 'parentId',
  }

  render() {
    const { source, primaryKey, parentKey } = this.props;
    const dimensions = _.first(source);

    const newSource = _.reduce(source.slice(1), (memo, row) => [
      ...memo,
      _.zipObject(dimensions, row),
    ], []);

    const tree = array2Tree(newSource, primaryKey, parentKey);

    const option = {
      tooltip: {},
      series: {
        type: 'treemap',
        data: tree[0].children,
      },
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
