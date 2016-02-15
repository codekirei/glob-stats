'use strict'

// import
//----------------------------------------------------------
// npm
const bytes = require('pretty-bytes')
const co = require('co')

// local
const proms = require('./proms')

// jsdoc
function* dirSize(path) {
  const raw = yield proms.folderSize(path)
  return {
    raw
  , pretty: bytes(raw)
  }
}

// export
//----------------------------------------------------------
module.exports = co.wrap(dirSize)
