'use strict'

// import
//----------------------------------------------------------
const size = require('./size')
const age = require('./age')
const dirSize = require('./dir-size')

// jsdoc
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
module.exports =
  { parseStat
  }
