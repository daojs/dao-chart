import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';
import { getMetrics } from '../repository';
import Chart from '../component';

export default class Section extends Component {
  static propTypes = {
    config: PropTypes.objectOf(any).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { source: [], history: [] }; // eslint-disable-line immutable/no-mutation
  }

  componentDidMount() {
    this.updateMetrics(this.props.config);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.config, this.props.config)) {
      this.updateMetrics(nextProps.config);
    }
  }

  onSlicerChange(args) {
    // TODO: just placeholder here
    const { properties, value } = args;
    const { dimensions } = this.props.config;
    const slicer = _.omitBy(_.zipObject(properties, value), (val, key) => !_.get(dimensions, `${key}.toSlicer`));
    if (!_.isEmpty(slicer)) {
      this.updateMetrics(_.defaults({
        selected: slicer,
      }, this.props.config));
      const { history } = this.state;
      this.setState({
        history: [...history, slicer],
      });
    }
  }

  updateMetrics(config) {
    getMetrics(config).then((source) => {
      this.setState({ source });
    });
  }

  render() {
    const { chartType } = this.props.config;

    return (
      <div>
        onEvent: {this.state.history.map(slicer => JSON.stringify(slicer)).join(' > ')}
        {_.isEmpty(this.state.source) ? null :
        <Chart
          source={this.state.source}
          onSlicerChange={args => this.onSlicerChange(args)}
          chartType={chartType}
        />}
      </div>);
  }
}
