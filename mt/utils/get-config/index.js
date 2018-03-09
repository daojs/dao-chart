const _ = require('lodash');

const isProduction = process.env.NODE_ENV === 'production';

const config = require(`../../config/${isProduction ? 'production' : 'dev'}.json`);

module.exports = key => _.result(config, key);
