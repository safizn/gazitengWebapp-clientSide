const { eslintJSLinter } = require('@deployment/javascriptStaticAnalysis');
const configuration = require('./');


// check notes in javascriptStaticAnalysis
// module.exports = Object.assign(eslintJSLinter.templateConfig, {
//   overrides: [
//     ...eslintJSLinter.clientSideEnvironment({ basePath: configuration.directory.source.clientSide}).overrides,
//     ...eslintJSLinter.serverSideEnvironment({ basePath: configuration.directory.source.serverSide}).overrides
//   ]
// })

module.exports = eslintJSLinter.clientSideEnvironment({ basePath: configuration.directory.source.clientSide });
