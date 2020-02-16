const path = require('path');
const filesystem = require('fs');
const projectConfig = require('../../configuration');

module.exports = [{
  path: path.join(projectConfig.directory.source),
}];
