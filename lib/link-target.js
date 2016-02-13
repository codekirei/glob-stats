'use strict'

// import
//----------------------------------------------------------
// node
const p = require('path')

// npm
const co = require('co')
const isExe = require('isexe')

// local
const prom = require('./promises')

// jsdoc
function* linkTarget(path) {

  const target = { target: yield prom.readLink(path) }
  const relTarget = p.resolve(p.dirname(path), target.target)
  const stats = yield prom.getStats(relTarget)

  if (stats.isDirectory()) target.type = 'dir'
  else if (stats.isFile())
    target.type = (yield isExe(relTarget)) ? 'exe' : 'file'

  return target
}

// export
//----------------------------------------------------------
module.exports = co.wrap(linkTarget)
