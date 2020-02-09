const projectConfig = require('../../configuration'),
  path = require('path'),
  filesystem = require('fs')

// • Run
let exportDistributionArray = [] // different distributions.
exportDistributionArray.push(require('../../source/script.js'))
module.exports = exportDistributionArray
