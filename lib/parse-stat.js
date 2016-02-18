'use strict'

// import
//----------------------------------------------------------
const size = require('./size')
const age = require('./age')
const dirSize = require('./dir-size')

/**
  Build a parseStat fn based on flags in opts.

  @param {Object} [opts] - which details to include
  @returns {Function} generator fn that parses an entity's stats
 */
function parseStat(opts) {

  if (!opts) return () => Promise.resolve(true)

  return function* (stat, path) {
    return Object.assign(
      {}
      , opts.size
        ? { size: path
            ? yield dirSize(path)
            : size(stat.size)
          }
        : {}
      , opts.age
        ? { age: age(new Date(), stat.mtime)
          }
        : {}
    )
  }
}

// export
//----------------------------------------------------------
module.exports = parseStat
