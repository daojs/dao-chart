import _ from 'lodash';
import Line from './line';


export default class Cumulative extends Line {
  getSource() {
    const rawSource = this.props.source;
    const paddingZero = _.chain(rawSource)
      .first()
      .size()
      .range()
      .map(() => 0)
      .value();
    return [
      rawSource[0],
      paddingZero,
      ...rawSource.slice(1),
    ];
  }

  getOption() {
    return _.defaultsDeep({
      xAxis: {
        axisLabel: {
          showMinLabel: false,
          align: 'right',
        },
      },
    }, super.getOption());
  }
}
