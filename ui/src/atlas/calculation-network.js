import _ from 'lodash';
import Promise from 'bluebird';
import uuid from 'uuid/v4';

export default class CalculationNetwork {
  constructor({
    parameters,
    cells,
    willRecalculate = _.noop,
    didRecalculate = _.noop,
  }) {
    /* eslint-disable */
    this.parameters = parameters;
    this.cells = cells;
    this.willRecalculate = willRecalculate;
    this.didRecalculate = didRecalculate;
    this.results = _.mapValues(cells, _.constant(null));
    this.dependents = {};
    _.forEach(cells, ({ dependencies }, key) => {
      _.forEach(dependencies, (dep) => {
        this.dependents[dep] = this.dependents[dep] || [];
        this.dependents[dep].push(key);
      });
    });
    _.forEach(parameters, (param, key) => {
      this.set(key, param.default || null);
    });
  }

  /**
   * TODO: cache it or calculate it in constructor if not support add cell dynamically
  */
  recalculateKeys() {
    const set = {};
    const inSet = _.propertyOf(set);
    const addKeys = (keys) => {
      _.chain(keys)
        .reject(inSet)
        .forEach((key) => {
          set[key] = true;
          addKeys(this.dependents[key]);
        })
        .value();
    };

    addKeys(_.keys(this.dirtyFlags));
    return _.filter(_.keys(set), _.propertyOf(this.cells));
  }

  recalculate() {
    const taskId = uuid();
    const expandedKeys = this.recalculateKeys();
    const results = _.mapValues(_.omit(this.results, expandedKeys), Promise.resolve);
    let remainingKeys = expandedKeys;

    this.currentTaskId = taskId;
    delete this.dirtyFlags;

    while (remainingKeys.length > 0) {
      const remainingKeysNew = [];
      _.forEach(remainingKeys, (key) => {
        const {
          dependencies,
          factory,
        } = this.cells[key];
        const depResults = _.map(dependencies, _.propertyOf(results));

        if (_.every(depResults, Boolean)) {
          this.willRecalculate({ key, taskId });
          results[key] = Promise
            .all(depResults)
            .spread(factory)
            .then((value) => {
              const isAbandoned = this.currentTaskId !== taskId;
              if (!isAbandoned) {
                this.results[key] = value;
              }
              this.didRecalculate({
                key,
                taskId,
                value,
                isAbandoned,
              });
              return value;
            }, (error) => {
              this.didRecalculate({
                key,
                taskId,
                error,
                isAbandoned: this.currentTaskId !== taskId,
              });
            });
        } else {
          remainingKeysNew.push(key);
        }
      });
      remainingKeys = remainingKeysNew;
    }
  }

  set(key, value) {
    if (_.has(this.parameters, key) && !_.isEqual(value, this.results[key])) {
      this.results[key] = value;
      if (!this.dirtyFlags) {
        this.dirtyFlags = {};
        setTimeout(() => this.recalculate(), 0);
      }
      this.dirtyFlags[key] = value;
    }
  }

  get(key) {
    return this.results[key];
  }
}
