import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getMetrics } from '../repository';
import Chart from '../component';

export default class Section extends Component {
  static propTypes = {
    config: PropTypes.objectOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      source: [],
      history: [],
    };
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
    const { name, slicer } = args;
    this.updateMetrics(_.defaults({
      selected: name,
    }, this.props.config));
    const { history } = this.state;
    this.setState({
      history: [...history, { name, slicer }],
    });
  }

  updateMetrics(config) {
    getMetrics(config).then((source) => {
      this.setState({ source });
    });
  }

  render() {
    const {
      section,
      title,
    } = this.props.config;

    const { dimensions, chartType } = section;

    return (
      <div>
        onEvent: {this.state.history.map(({ name, slicer }) => `${slicer.toSlicer}: ${name}`).join(' > ')}
        {_.isEmpty(this.state.source) ? null :
        <Chart
          source={this.state.source}
          onSlicerChange={args => this.onSlicerChange(args)}
          title={title}
          dimensions={dimensions}
          chartType={chartType}
        />}
      </div>);
  }
}
