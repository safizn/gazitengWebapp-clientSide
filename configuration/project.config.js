const path = require('path');

const ownConfig = {
  directory: {
    root: path.normalize(`${__dirname}/..`),
    get deploymentScript() {
      return path.dirname(require.resolve('@deployment/deploymentScript/package.json'));
    },
    get source() {
      return path.join(ownConfig.directory.root, './source');
    },
  },
  transpilation: {
    target: 'clientSide',
    babelConfigKey: 'nativeClientSideRuntime.BabelConfig.js',
    get babelConfig() {
      const { getBabelConfig } = require('@deployment/javascriptTranspilation');
      return getBabelConfig(ownConfig.transpilation.find(item => item.target == 'clientSide').babelConfigKey, { configType: 'json' });
    },
  },
  databaseVersion: 1,
};

module.exports = ownConfig;
