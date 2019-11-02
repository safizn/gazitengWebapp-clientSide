const path = require('path')
const { script } = require('./script.config.js')

const ownConfig = {
  directory: {
    root: path.normalize(`${__dirname}/..`),
    get deploymentScript() {
      return path.dirname(require.resolve(`@dependency/deploymentScript/package.json`))
    },
    get source() {
      return path.join(ownConfig.directory.root, './source')
    },
    get test() {
      return path.join(ownConfig.directory.root, './test')
    },
    get script() {
      return path.join(ownConfig.directory.root, './script')
    },
    get distribution() {
      return path.join(ownConfig.directory.root, './distribution')
    },
    get resource() {
      return path.join(ownConfig.directory.root, './resource')
    },
    get packageManager() {
      return path.join(ownConfig.directory.root, './packageManager')
    },
  },
  entrypoint: {
    get programmaticAPI() {
      return './script.js'
    },
  },
  get script() {
    return [...script, ...[{ type: 'directory', path: ownConfig.directory.script }, { type: 'directory', path: path.join(ownConfig.directory.root, 'node_modules') }]]
  },
  build: {
    get compile() {
      return [
        path.relative(ownConfig.directory.root, ownConfig.directory.source),
        path.relative(ownConfig.directory.root, ownConfig.directory.resource),
        path.relative(ownConfig.directory.root, ownConfig.directory.packageManager),
      ]
    },
    repositoryURL: 'https://github.com/AppScriptIO/gazitengWebapp-clientSide',
  },
  distribution: {
    get native() {
      return path.join(ownConfig.directory.distribution, 'nativeClientSide')
    },
    get polyfill() {
      return path.join(ownConfig.directory.distribution, 'polyfillClientSide')
    },
  },
  transpilation: {
    babelConfigKey: 'serverRuntime.BabelConfig.js',
    get babelConfig() {
      const { getBabelConfig } = require('@dependency/javascriptTranspilation')
      return getBabelConfig(ownConfig.transpilation.babelConfigKey, { configType: 'json' })
    },
  },
  databaseVersion: 1,
}

module.exports = ownConfig
