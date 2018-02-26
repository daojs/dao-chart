import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Pie from './pie';

const chartMapper = {
  pie: props => (<Pie {...props} />),
};

export default class extends PureComponent {
  static propTypes = {
    chartType: PropTypes.string.isRequired,
  }

  render() {
    const { chartType, ...others } = this.props;
    return (<div>{chartMapper[chartType](others)}</div>);
  }
}
