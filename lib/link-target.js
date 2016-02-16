'use strict'

// import
//----------------------------------------------------------
// node
const p = require('path')

// npm
const co = require('co')

// local
const proms = require('./proms')
const statType = require('./stat-type')

// jsdoc
function* linkTarget(linkPath) {

  const path = yield proms.readLink(linkPath)
  const rel = p.resolve(p.dirname(linkPath), path)
  const stats = yield proms.getStats(rel)
  const type = yield statType(stats, rel)

  return {target: {path, type}}
}

// export
//----------------------------------------------------------
module.exports = co.wrap(linkTarget)
