'use strict'

// import
//----------------------------------------------------------
const bytes = require('pretty-bytes')

// jsdoc
function size(raw) {
  return {
    raw
  , pretty: bytes(raw)
  }
}

// export
//----------------------------------------------------------
module.exports = size
