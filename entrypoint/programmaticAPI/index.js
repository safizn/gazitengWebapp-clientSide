const path = require('path');
const filesystem = require('fs');
const projectConfig = require('../../configuration');

// • Run
if (filesystem.existsSync(projectConfig.directory.distribution)) {
  const subdirectoryList = filesystem
    .readdirSync(projectConfig.directory.distribution, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  const exportDistributionArray = []; // different distributions.
  for (const directoryName of subdirectoryList) {
    const distributionPath = path.join(
      projectConfig.directory.distribution,
      directoryName,
      path.relative(projectConfig.directory.root, projectConfig.directory.source),
    );

    // TODO: should create a targetAgent.json file that will contain instructions for the agents the distribution is targeting.
    exportDistributionArray.push({ path: distributionPath, targetAgent: require(distributionPath, 'targetAgent.json') });
  }
  module.exports = exportDistributionArray;
} else {
  // • Transpilation (babelJSCompiler)
  const { Compiler } = require('@deployment/javascriptTranspilation');
  console.log('heeelooo');
  const compiler = new Compiler({ callerPath: __dirname });
  compiler.requireHook({ restrictToTargetProject: true });

  const exportDistributionArray = [{
    path: path.join(projectConfig.directory.source), // client side code location
    // Note: no targetAgent during development.
  }];

  // process.on('exit', () => {
  //   console.log(compiler.loadedFiles.map(value => value.filename))
  //   console.log(compiler.config.ignore)
  // })
  module.exports = exportDistributionArray;
}
