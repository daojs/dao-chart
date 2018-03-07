import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';
import { getMetrics } from '../repository';
import Chart from '../component';

/**
 * slicers: {},
 * section: {
 *   metrics: [],
 *   dimensions: {},
 *   chartType: 'line',
 * },
 * onSlicerChange = function
*/
export default class Section extends Component {
  static propTypes = {
    section: PropTypes.objectOf(any).isRequired,
    slicers: PropTypes.objectOf(any),
    onSlicerChange: PropTypes.func,
  }

  static defaultProps = {
    slicers: {},
    onSlicerChange: _.noop,
  }

  constructor(props) {
    super(props);
    this.state = {
      source: [],
    };
    this.seriesMapper = {};
  }

  componentDidMount() {
    this.updateMetrics(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { slicers: nextSlicers, section: { metrics: nextMetrics } } = nextProps;
    const { slicers, section: { metrics } } = this.props;
    if (!_.isEqual([nextSlicers, nextMetrics], [slicers, metrics])) {
      this.updateMetrics(nextProps);
    }
  }

  onSlicerChange(args) {
    // TODO: if there is private slicer in section, process it here
    // call parent slicer change
    this.props.onSlicerChange({
      ...args,
      section: this.props.section,
      seriesMapper: this.seriesMapper,
    });
  }

  updateMetrics({
    slicers = {},
    section = {},
  }) {
    getMetrics({ slicers, section }).then(({ source, seriesMapper }) => {
      this.seriesMapper = seriesMapper;
      this.setState({ source });
    });
  }

  render() {
    const { chartType, description } = this.props.section;

    return (
      <div>
        {_.isEmpty(this.state.source) ? null :
        <Chart
          source={this.state.source}
          onSlicerChange={args => this.onSlicerChange(args)}
          title={{
            text: description,
          }}
          chartType={chartType}
        />}
      </div>);
  }
}
