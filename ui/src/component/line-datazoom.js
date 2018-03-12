import React, { PureComponent } from 'react';
import Line from './line';

export default class LineWithDataZoom extends PureComponent {
  render() {
    return (
      <Line hasDataZoom {...this.props} />
    );
  }
}
