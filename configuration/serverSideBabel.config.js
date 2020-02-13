const { getBabelConfig } = require('@deployment/javascriptTranspilation');
const configuration = require('./');

module.exports = getBabelConfig(configuration.transpilation.find(item => item.target == 'serverSide').babelConfigKey, { configType: 'functionApi' });
