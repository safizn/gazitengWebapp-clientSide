const projectConfig = require('../../configuration'),
  path = require('path'),
  filesystem = require('fs')

// • Run
if (filesystem.existsSync(projectConfig.directory.distribution)) {
  let subdirectoryList = filesystem
    .readdirSync(projectConfig.directory.distribution, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  let exportDistributionArray = [] // different distributions.
  for (let directoryName of subdirectoryList) {
    let modulePath = path.join(
      projectConfig.directory.distribution,
      directoryName,
      path.relative(projectConfig.directory.root, projectConfig.directory.source),
      projectConfig.entrypoint.programmaticAPI,
    )
    exportDistributionArray.push(require(modulePath))
  }
  module.exports = exportDistributionArray
} else {
  // • Transpilation (babelJSCompiler)
  const { Compiler } = require('@dependency/javascriptTranspilation')
  let compiler = new Compiler({ callerPath: __dirname })
  compiler.requireHook({ restrictToTargetProject: true, matchTargetFile: true })
  let modulePath = path.join(projectConfig.directory.source, projectConfig.entrypoint.programmaticAPI)
  let exportDistributionArray = [require(modulePath)]
  // process.on('exit', () => {
  //   console.log(compiler.loadedFiles.map(value => value.filename))
  //   console.log(compiler.babelRegisterConfig.ignore)
  // })
  module.exports = exportDistributionArray
}
