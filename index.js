'use strict'

// import
//----------------------------------------------------------
// npm
const co = require('co')
const globby = require('globby')

// local
const cachedParser = require('./lib/cached-parser')
const linkTarget = require('./lib/link-target')
const proms = require('./lib/proms')
const statType = require('./lib/stat-type')

// jsdoc
function* globStats(glob, opts) {

  // create output skeleton (will flesh out contents below)
  //----------------------------------------------------------
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

  // cache stat parsing fn based on opts
  //----------------------------------------------------------
  const parseStat = cachedParser(opts)

  // get paths from glob
  //----------------------------------------------------------
  const paths = yield globby(glob)

  // parse paths and filter into output
  //----------------------------------------------------------
  for (const path of paths) {

    const stat = yield proms.getStats(path)
    const type = yield statType(stat, path)

    function* handler() { return yield parseStat(stat) }

    function* dirHandler() { return yield parseStat(stat, path) }

    function* symlinkHandler() {
      return Object.assign(
        {}
      , yield parseStat(stat)
      , yield linkTarget(path)
      )
    }

    const handlers =
      { file: handler
      , exe: handler
      , dir: dirHandler
      , symlink: symlinkHandler
      }

    out.contents[type][path] = yield handlers[type]()
  }

  // return completed output
  //----------------------------------------------------------
  return out
}

// export
//----------------------------------------------------------
module.exports = co.wrap(globStats)
