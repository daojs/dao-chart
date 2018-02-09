import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import convert from '../converters';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { option: {} };
    this.convertOption(props.meta);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.meta, this.props.meta)) {
      this.convertOption(nextProps.meta);
    }
  }

  convertOption(meta) {
    convert(meta).then((option) => {
      this.setState({ option });
    });
  }

  render() {
    const props = _.omit(this.props, 'meta');
    return (<ReactEcharts
      option={this.state.option}
      {...props}
    />);
  }
}
