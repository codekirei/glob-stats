'use strict'

// import
//----------------------------------------------------------
const ms = require('pretty-ms')

/**
  Get details pertaining to the age of an entity.

  @param {Object} now - current Date() object
  @param {Object} mtime - fs.Stats.mtime
  @returns {Object} {raw: <Number>, pretty: <String>}
 */
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
