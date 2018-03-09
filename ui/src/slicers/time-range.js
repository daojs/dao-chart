import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';
import _ from 'lodash';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

export default class TimeRangePicker extends PureComponent {
  static propTypes = {
    slicer: PropTypes.objectOf(PropTypes.any).isRequired,
    dimension: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: _.noop,
  }

  onChange(values) {
    // merge new slicer status
    const [start, end] = values;
    const value = { start: start.format(dateFormat), end: end.format(dateFormat) };
    this.props.onChange({
      slicer: _.defaultsDeep({}, { value }, this.props.slicer),
      dimension: this.props.dimension,
    });
  }

  render() {
    const { dimension, slicer = {} } = this.props;
    const { value } = slicer;
    const { start, end } = value;
    return (
      <div>
        {dimension}
        <RangePicker
          defaultValue={[moment(start, dateFormat), moment(end, dateFormat)]}
          format={dateFormat}
          onChange={args => this.onChange(args)}
        />
      </div>);
  }
}
