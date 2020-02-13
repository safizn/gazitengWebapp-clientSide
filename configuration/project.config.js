const path = require('path');
const script = require('./script.config.js');

const ownConfig = {
  directory: {
    root: path.normalize(`${__dirname}/..`),
    get deploymentScript() {
      return path.dirname(require.resolve('@deployment/deploymentScript/package.json'));
    },
    get source() {
      return path.join(ownConfig.directory.root, './source');
    },
    get test() {
      return path.join(ownConfig.directory.root, './test');
    },
    get script() {
      return path.join(ownConfig.directory.root, './script');
    },
    get distribution() {
      return path.join(ownConfig.directory.root, './distribution');
    },
    get resource() {
      return path.join(ownConfig.directory.root, './resource');
    },
    get packageManager() {
      return path.join(ownConfig.directory.root, './packageManager');
    },
  },
  get script() {
    return [
      ...script(),
      ...[
        { type: 'directory', path: ownConfig.directory.script },
        { type: 'directory', path: path.join(ownConfig.directory.root, 'node_modules') },
      ],
    ];
  },
  // TODO: Update build tool to build clientside project - where different distributions are added into their respective distribution folders and entrypoint is built to add targetAgent for each distro
  build: {
    get compile() {
      return [
        path.relative(ownConfig.directory.root, ownConfig.directory.source),
        path.relative(ownConfig.directory.root, ownConfig.directory.resource),
        path.relative(ownConfig.directory.root, ownConfig.directory.packageManager),
      ];
    },
    clientSideDistribution: {
      polyfill: {
        targetAgent({ agent /* instance of `useragent` module */ }) {
          switch (agent.family) {
            case 'Chrome':
            case 'Chromium':
            case 'Chrome Headless':
              return agent.satisfies('<49.0.0');
            case 'Opera':
            case 'OPR':
              return agent.satisfies('<36.0.0');
            case 'Vivaldi':
              return agent.satisfies('<1');
            case 'Safari':
            case 'Mobile Safari':
              return agent.satisfies('<10.0.0');
            case 'Firefox':
              return agent.satisfies('<51.0.0');
            case 'Edge':
              return agent.satisfies('<15.0.63');
            case 'Other':
            default:
              // for `postman` --> agent.source.toLowerCase().includes('postman')
              return false; // default for native version rather than previous choice of polyfill as defalult
          }
        },
      },
    },
    repositoryURL: 'https://github.com/AppScriptIO/gazitengWebapp-clientSide',
  },
  transpilation: [{
    target: 'serverSide',
    babelConfigKey: 'serverRuntime.BabelConfig.js',
    get babelConfig() {
      const { getBabelConfig } = require('@deployment/javascriptTranspilation');
      return getBabelConfig(ownConfig.transpilation.find(item => item.target == 'serverSide').babelConfigKey, { configType: 'json' });
    },
  }, {
    target: 'clientSide',
    babelConfigKey: 'nativeClientSideRuntime.BabelConfig.js',
    get babelConfig() {
      const { getBabelConfig } = require('@deployment/javascriptTranspilation');
      return getBabelConfig(ownConfig.transpilation.find(item => item.target == 'clientSide').babelConfigKey, { configType: 'json' });
    },
  }],
  databaseVersion: 1,
};

module.exports = ownConfig;
