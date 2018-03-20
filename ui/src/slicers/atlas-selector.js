import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import _ from 'lodash';

const { Option } = Select;

export default class Selector extends Component {
  static propTypes = {
    slicer: PropTypes.objectOf(PropTypes.any).isRequired,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: _.noop,
  }

  onChange(value) {
    this.props.onChange(_.defaultsDeep({}, { value }, this.props.slicer));
  }

  render() {
    const { slicer } = this.props;
    const {
      key,
      label = key,
      value,
      options = [],
    } = slicer;
    const opts = _.map(options, item => ({ value: item, text: item }));
    return (
      <div>
        {label}
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          defaultValue={value}
          onChange={args => this.onChange(args)}
        >
          {_.map(opts, (opt) => {
            const { value: optKey, text } = opt;
            return (<Option key={optKey} value={optKey}>{text}</Option>);
          })}
        </Select>
      </div>);
  }
}
