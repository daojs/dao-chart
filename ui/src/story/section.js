import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';
import Radium from 'radium';
import { getMetrics } from '../repository';
import Chart from '../component';

const sectionPadding = 12; // px

const styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #eee',
    padding: `${sectionPadding}px`,
    boxSizing: 'border-box',
    ':hover': {
      boxShadow: '0 0 5px #aaa',
    },
  },
};

const chartHeight = (sectionHeight) => {
  const height = (parseInt(sectionHeight, 10) || 0) - (sectionPadding * 2);
  return `${_.max([height, 0])}px`;
};


/**
 * slicers: {},
 * section: {
 *   metrics: [],
 *   dimensions: {},
 *   chartType: 'line',
 * },
 * onSlicerChange = function
*/
class Section extends Component {
  static propTypes = {
    section: PropTypes.objectOf(any).isRequired,
    slicers: PropTypes.objectOf(any),
    onSlicerChange: PropTypes.func,
    style: PropTypes.objectOf(any).isRequired,
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
    this.dimensionMap = {};
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
      dimensionMap: this.dimensionMap,
    });
  }

  updateMetrics({
    slicers = {},
    section = {},
  }) {
    getMetrics({ slicers, section }).then(({ source, dimensionMap }) => {
      this.dimensionMap = dimensionMap;
      this.setState({ source });
    });
  }

  render() {
    const { chartType, description } = this.props.section;
    const { height } = this.props.style;


    return (
      <div style={[styles.section, { height }]}>
        {_.isEmpty(this.state.source) ? null :
        <Chart
          source={this.state.source}
          onSlicerChange={args => this.onSlicerChange(args)}
          title={{
            text: description,
          }}
          chartType={chartType}
          style={{
            height: chartHeight(this.props.style.height),
          }}
        />}
      </div>);
  }
}

export default Radium(Section);
