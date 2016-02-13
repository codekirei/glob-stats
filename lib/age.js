'use strict'

// import
//----------------------------------------------------------
const ms = require('pretty-ms')

// jsdoc
function age(now, mtime) {
  const diff = now - mtime
  const opts =
    { secDecimalDigits: 0
    , verbose: true
    }
  return {
    raw: diff
  , pretty: ms(diff, opts).split(' ').slice(0, 4).join(' ')
  }
}

// export
//----------------------------------------------------------
module.exports = age
