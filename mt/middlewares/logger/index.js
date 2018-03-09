const log4js = require('log4js');

module.exports = ({logsDir = './logs/'} = {}) => async(ctx, next) => {
  log4js.configure({
    appenders: {
      query: { type: 'file', filename: `${logsDir}query-${new Date().toLocaleDateString()}.log` },
      common: { type: 'file', filename: `${logsDir}common-${new Date().toLocaleDateString()}.log` },
      metrics: { type: 'file', filename: `${logsDir}metrics-${new Date().toLocaleDateString()}.log` }
    },
    categories: {
      default: { appenders: ['common'], level: 'info' },
      common: { appenders: ['common'], level: 'info' },
      query: { appenders: ['query'], level: 'info' },
      metrics: { appenders: ['metrics'], level: 'info' }
    }
  });

  await next();
};
