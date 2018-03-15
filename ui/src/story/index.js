import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { getLayout, setLayout } from '../repository';
import Section from './section';
import Slicers from '../slicers';

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g; // eslint-disable-line

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const rowHeight = 30; // px
const marginX = 10; // px
const marginY = 10; // px

const sectionHeight = (layout, sectionId) => {
  const sectionLayout = _.find(layout, { i: sectionId.toString() }) || {};
  const rows = _.get(sectionLayout, 'h', 0);
  const height = (rows * (rowHeight + marginY)) - marginY;
  return `${_.max([height, 0])}px`;
};

export default class Story extends Component {
  static propTypes = {
    description: PropTypes.string,
    slicers: PropTypes.objectOf(any),
    slicerMeta: PropTypes.objectOf(any),
    items: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number.isRequired,
  }

  static defaultProps = {
    description: '',
    slicers: {},
    slicerMeta: {
      slicers: [],
      metric: '',
    },
    items: [],
  }

  constructor(props) {
    super(props);

    /* eslint-disable immutable/no-mutation */
    this.state = {
      slicers: this.props.slicers,
      layout: [],
    };
    /* eslint-enable */
  }

  componentDidMount() {
    getLayout({
      storyId: this.props.id,
      sectionIds: _.map(this.props.items, 'id'),
    }).then((layout) => {
      this.setState({ layout });
    });
  }

  onSlicerChange = (slicers) => {
    this.setState({
      slicers: _.defaultsDeep({}, slicers, this.state.slicers),
    });
  }

  onDrill = (args) => {
  // update slicer here
  // move to section, just merge new slicer here include values and others
    const { serieInfo, dataObj, section } = args;
    const slicers = _.cloneDeep(this.state.slicers);

    const data = { ...serieInfo.serie, ...dataObj };
    const metricDimensions = _.get(serieInfo, 'metric.dimensions', {});
    const dimensionMap = { ...section.dimensions, ...metricDimensions };
    _.each(data, (val, dim) => {
      if (_.get(dimensionMap, `${dim}.toSlicer`)) {
        _.set(slicers, `${dimensionMap[dim].toSlicer}.value.values`, [val]);
      }
    });

    this.setState({
      slicers,
    });
  }

  onLayoutChange = (newLayout) => {
    this.setState({ layout: newLayout });
  }

  saveLayout = (newLayout) => {
    setLayout({
      storyId: this.props.id,
      storyLayout: newLayout,
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.props.description}</h1>
        <Slicers
          slicers={this.state.slicers}
          meta={this.props.slicerMeta}
          onSlicerChange={this.onSlicerChange}
        />
        <ResponsiveReactGridLayout
          className="layout"
          layouts={{ lg: this.state.layout }}
          breakpoints={{ lg: 1200 }}
          cols={{ lg: 12 }}
          rowHeight={rowHeight}
          margin={[marginX, marginY]}
          onDrag={this.onLayoutChange}
          onResize={this.onLayoutChange}
          onDragStop={this.saveLayout}
          onResizeStop={this.saveLayout}
        >
          {_.map(this.props.items, section => (
            <div key={section.id}>
              <Section
                onSlicerChange={this.onDrill}
                section={section}
                slicers={this.state.slicers}
                style={{
                  height: sectionHeight(this.state.layout, section.id),
                }}
              />
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </React.Fragment>);
  }
}
