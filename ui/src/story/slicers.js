import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Slicers extends PureComponent {
  static propTypes = {
    slicers: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  render() {
    return (
      <div>
        <h4>Current slicers is:</h4>
        {JSON.stringify(this.props.slicers)}
      </div>
    );
  }
}
