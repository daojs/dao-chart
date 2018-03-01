import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Pie from './pie';
import Compare from './compare';

const chartMapper = {
  pie: Pie,
  compare: Compare,
};

export default class extends PureComponent {
  static propTypes = {
    chartType: PropTypes.string.isRequired,
  }

  render() {
    const { chartType, ...others } = this.props;
    const ChartComponent = chartMapper[chartType] || Pie;
    return (<ChartComponent {...others} />);
  }
}
