'use strict'

// import
//----------------------------------------------------------
// npm
const co = require('co')
const bytes = require('pretty-bytes')

// local
const prom = require('./promises')

// jsdoc
function* dirSize(path) {
  const raw = yield prom.folderSize(path)
  return {
    raw
  , pretty: bytes(raw)
  }
}

// export
//----------------------------------------------------------
module.exports = co.wrap(dirSize)
