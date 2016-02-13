'use strict'

// import
//----------------------------------------------------------
// node
const p = require('path')

// npm
const co = require('co')
const isExe = require('isexe')

// local
const proms = require('./proms')

// jsdoc
function* linkTarget(path) {

  const target = { target: yield proms.readLink(path) }
  const relTarget = p.resolve(p.dirname(path), target.target)
  const stats = yield proms.getStats(relTarget)

  if (stats.isDirectory()) target.type = 'dir'
  else if (stats.isFile())
    target.type = (yield isExe(relTarget)) ? 'exe' : 'file'

  return target
}

// export
//----------------------------------------------------------
module.exports = co.wrap(linkTarget)
