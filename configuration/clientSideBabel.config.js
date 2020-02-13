const configuration = require('./'),
  { getBabelConfig } = require('@deployment/javascriptTranspilation')

module.exports = getBabelConfig(configuration.transpilation.find(item => item.target == 'clientSide').babelConfigKey, { configType: 'functionApi' })
