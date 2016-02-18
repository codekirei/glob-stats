'use strict'

// import
//----------------------------------------------------------
// npm
const bytes = require('pretty-bytes')

// local
const proms = require('./proms')

/**
  Get details pertaining to the size of dir and its contents.

  @param {String} path - path to dir
  @returns {Object} {raw: <Number>, pretty: <String>}
 */
function* dirSize(path) {
  const raw = yield proms.folderSize(path)
  return {
    raw
  , pretty: bytes(raw)
  }
}

// export
//----------------------------------------------------------
module.exports = dirSize
