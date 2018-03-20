import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { getLayout, setLayout } from '../repository';
import AtlasSlicers from '../slicers/atlas-slicers';
import Atlas from '../atlas';
import Chart from '../component';

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

export default class AtlasStory extends Component {
  static propTypes = {
    components: PropTypes.objectOf(any),
    story: PropTypes.objectOf(any).isRequired,
  }

  static defaultProps = {
    components: {},
  }

  constructor(props) {
    super(props);

    /* eslint-disable immutable/no-mutation */
    this.state = {
      layout: [],
    };
    /* eslint-enable */
  }

  componentDidMount() {
    const { id: storyId, dashboard: { sections } } = this.props.story;
    getLayout({
      storyId,
      sectionIds: _.map(sections, 'id'),
    }).then((layout) => {
      this.setState({ layout });
    });
  }

  onLayoutChange = (newLayout) => {
    this.setState({ layout: newLayout });
  }

  saveLayout = (newLayout) => {
    const { id: storyId } = this.props.story;
    setLayout({
      storyId,
      storyLayout: newLayout,
    });
  }

  render() {
    const { dashboard } = this.props.story;
    const { slicers, sections, description } = dashboard;
    const { components } = this.props;

    return (
      <Atlas
        story={this.props.story}
        renderContent={({
          read,
          write,
          isUpdating,
        }) => (
          <React.Fragment>
            <h1>{description}</h1>
            <AtlasSlicers
              slicers={_.map(slicers, (slicer) => {
                const { key, from, type } = slicer;
                return {
                  key,
                  type,
                  value: read(key),
                  options: from ? read(from) : null,
                };
              })}
              onSlicerChange={params => _.each(params, (val, key) => write(key, val))}
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
              {_.map(sections, (section) => {
                const Section = components[section.chartType] || Chart;
                const { source } = read(section.from) || {};
                const { description: text } = section;
                const content = (Section && source) ? (<Section
                  chartType={section.chartType}
                  data={read(section.from)}
                  source={source}
                  title={{
                    text,
                  }}
                  isUpdating={isUpdating(section.from)}
                  style={{
                  height: sectionHeight(this.state.layout, section.id),
                }}
                />) : null;
                return (
                  <div key={section.id}>
                    {content}
                  </div>
                );
              })}
            </ResponsiveReactGridLayout>
          </React.Fragment>
        )}
      />
    );
  }
}
