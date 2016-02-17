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

  // get paths and stats from glob
  //----------------------------------------------------------
  const paths = yield globby(glob)
  const stats = yield proms.P.all(paths.map(path => proms.getStats(path)))

  // generate stat parsing fn based on opts
  //----------------------------------------------------------
  const parseStat = cachedParser(opts)

  // push paths into output
  //----------------------------------------------------------
  yield proms.P.map(stats, co.wrap(function* (stat, i) {

    const path = paths[i]
    const type = yield statType(stat, path)

    function* handler() {
      return yield parseStat(stat)
    }

    function* dirHandler() {
      return yield parseStat(stat, path)
    }

    function* symlinkHandler() {
      return Object.assign(
        {}
      , yield parseStat(stat)
      , yield linkTarget(path)
      )
    }

    const typeHandler =
      { file: handler
      , exe: handler
      , dir: dirHandler
      , symlink: symlinkHandler
      }

    out.contents[type][path] = yield typeHandler[type]()
  }))

  return out
}

// export
//----------------------------------------------------------
module.exports = co.wrap(globStats)
