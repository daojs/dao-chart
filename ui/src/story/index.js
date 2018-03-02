import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';
import Section from './section';
import Slicers from './slicers';

export default class Story extends Component {
  static propTypes = {
    description: PropTypes.string,
    slicers: PropTypes.objectOf(any),
    items: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    description: '',
    slicers: {},
    items: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      slicers: this.props.slicers,
    };
  }

  onSlicerChange(args) {
  // update slicer here
    const { dimensionMap, dataObj } = args;
    const slicers = _.cloneDeep(this.state.slicers);

    _.each(dataObj, (val, dim) => {
      if (dimensionMap[dim].toSlicer) {
        _.set(slicers, `${dimensionMap[dim].toSlicer}.value.values`, [val]);
      }
    });

    this.setState({
      slicers,
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.description}</h1>
        <Slicers slicers={this.state.slicers} />
        {_.map(this.props.items, section => (<Section
          onSlicerChange={args => this.onSlicerChange(args)}
          section={section}
          slicers={this.state.slicers}
          key={section.id}
        />))}
      </div>);
  }
}
