'use strict'

// import
//----------------------------------------------------------
// node
const p = require('path')

// local
const proms = require('./proms')
const statType = require('./stat-type')

/**
  Get details about the target of a symlink.

  @param {String} linkPath - path of symlink itself
  @returns {Object} {target: {path: <String>, type: <String>}}
 */
function* linkTarget(linkPath) {
  const path = yield proms.readLink(linkPath)
  const abs = p.resolve(p.dirname(linkPath), path)
  const stats = yield proms.getStats(abs)
  const type = yield statType(stats, abs)

  return {target: {path, type}}
}

// export
//----------------------------------------------------------
module.exports = linkTarget
