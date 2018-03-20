import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Row, Col } from 'antd';
import TimeRange from './atlas-time-range';
import Selector from './atlas-selector';

const slicerMapper = {
  enum: Selector,
  range: TimeRange,
};

export default class Slicers extends PureComponent {
  static propTypes = {
    slicers: PropTypes.arrayOf(PropTypes.any).isRequired,
    onSlicerChange: PropTypes.func.isRequired,
  }

  onChange({ key, value }) {
    this.changedSlicer[key] = value; //eslint-disable-line
  }

  updateSlicer() {
    this.props.onSlicerChange(this.changedSlicer);
  }

  render() {
    this.changedSlicer = {}; //eslint-disable-line
    const { slicers } = this.props;
    return (
      <div
        style={{
          margin: '30px',
        }}
      >
        {_.map(slicers, (slicer) => {
          const { type, key } = slicer;
          const Slicer = slicerMapper[type];
          if (!Slicer) {
            return null;
          }
          return (
            <Row
              key={key}
              style={{ margin: '20px' }}
            >
              <Col span={6}>
                <Slicer
                  slicer={slicer}
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
