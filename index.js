'use strict'

// import
//----------------------------------------------------------
// npm
const co = require('co')
const globby = require('globby')

// local
const handlers = require('./lib/handlers')
const proms = require('./lib/proms')
const statType = require('./lib/stat-type')

/**
  Generator that reads a glob and filters the results by type.

  @param {String} glob - glob to read
  @param {Object} [opts] - flags for additional details to include in results
  @returns {Object} filtered results
 */
function* globStats(glob, opts) {

  const out =
    { glob
    , root: glob.slice(0, glob.indexOf('*'))
    , contents:
      { file: {}
      , exe: {}
      , dir: {}
      , symlink: {}
      }
    }

  const paths = yield globby(glob)
  const handle = handlers(opts)

  for (const path of paths) {
    const stat = yield proms.getStats(path)
    const type = yield statType(stat, path)
    out.contents[type][path] = yield handle[type](stat, path)
  }

  return out
}

// export
//----------------------------------------------------------
module.exports = co.wrap(globStats)
