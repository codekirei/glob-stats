'use strict'

// import
//----------------------------------------------------------
const bytes = require('pretty-bytes')

/**
  Get details pertaining to the size of a non-dir entity.

  @param {Number} raw - raw size (fs.Stat.size)
  @returns {Object} {raw: <Number>, pretty: <String>}
 */
function size(raw) {
  return {
    raw
  , pretty: bytes(raw)
  }
}

// export
//----------------------------------------------------------
module.exports = size
