import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Pie from './pie';

const chartMapper = {
  pie: Pie,
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
