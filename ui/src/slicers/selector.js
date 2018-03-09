import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import _ from 'lodash';

const { Option } = Select;

export default class Selector extends Component {
  static propTypes = {
    slicer: PropTypes.objectOf(PropTypes.any).isRequired,
    dimension: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: _.noop,
  }

  onChange(values) {
    const value = {
      ...this.props.slicer.value,
      values,
    };
    const slicer = { ...this.props.slicer, value };
    this.props.onChange({ slicer, dimension: this.props.dimension });
  }

  render() {
    const { dimension, slicer = {} } = this.props;
    const { value } = slicer;
    const options = _.map(slicer.enums || value.values, item => ({ value: item, text: item }));
    return (
      <div>
        {dimension}
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          defaultValue={_.get(this.props, 'slicer.value.values')}
          onChange={args => this.onChange(args)}
        >
          {_.map(options, (opt) => {
            const { value: key, text } = opt;
            return (<Option key={key} value={key}>{text}</Option>);
          })}
        </Select>
      </div>);
  }
}
