import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Row, Col } from 'antd';
import TimeRange from './time-range';
import Selector from './selector';

const slicerMapper = {
  enum: Selector,
  range: TimeRange,
};

export default class Slicers extends PureComponent {
  static propTypes = {
    slicers: PropTypes.objectOf(PropTypes.any).isRequired,
    meta: PropTypes.objectOf(PropTypes.any).isRequired,
    onSlicerChange: PropTypes.func.isRequired,
  }

  onChange({ dimension, slicer }) {
    this.slicers = _.defaults({}, { [dimension]: slicer }, this.slicers); //eslint-disable-line
    // update slicers available enums with current slicers value
  }

  updateSlicer() {
    this.props.onSlicerChange(this.slicers);
  }

  render() {
    this.slicers = this.props.slicers; //eslint-disable-line
    const { slicers } = this.props.meta;
    return (
      <div
        style={{
          margin: '30px',
        }}
      >
        {_.map(slicers, (dimension) => {
          const slicerValue = this.props.slicers[dimension];
          const Slicer = slicerMapper[_.get(slicerValue, 'value.type')];
          return (
            <Row
              key={dimension}
              style={{ margin: '20px' }}
            >
              <Col span={6}>
                <Slicer
                  dimension={dimension}
                  slicer={slicerValue}
                  onChange={arg => this.onChange(arg)}
                />
              </Col>
            </Row>
          );
        })}
        <Button
          style={{ marginLeft: '20px' }}
          type="primary"
          onClick={() => this.updateSlicer()}
        >
          Load
        </Button>
      </div>
    );
  }
}
