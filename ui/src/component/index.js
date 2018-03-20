import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Pie from './pie';
import Line from './line';
import LineWithDataZoom from './line-datazoom';
import Map from './map';
import Spin from './spine';
import Bar from './bar';
import Donut from './donut';

const chartMapper = {
  pie: Pie,
  line: Line,
  lineWithDataZoom: LineWithDataZoom,
  map: Map,
  spin: Spin,
  bar: Bar,
  donut: Donut,
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
