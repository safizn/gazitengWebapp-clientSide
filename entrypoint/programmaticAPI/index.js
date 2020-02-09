const projectConfig = require('../../configuration'),
  path = require('path'),
  filesystem = require('fs')

// • Run
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
