'use strict'

// import
//----------------------------------------------------------
// npm
const co = require('co')
const globby = require('globby')
const isexe = require('isexe')

// local
const cachedParser = require('./lib/cached-parser')
const proms = require('./lib/proms')

// jsdoc
function* globStats(glob, opts) {

  // create output skeleton (will flesh out contents below)
  //----------------------------------------------------------
  const out =
    { glob
    , root: glob.slice(0, glob.indexOf('*'))
    , contents:
      { files: {}
      , exes: {}
      , dirs: {}
      , symlinks: {}
      }
    }

  // get paths and stats from glob
  //----------------------------------------------------------
  const paths = yield globby(glob)
  const stats = yield proms.P.all(paths.map(path => proms.getStats(path)))

  // generate stat parsing fn based on opts
  //----------------------------------------------------------
  const parseStat = cachedParser(opts)

  // filter paths into output
  //----------------------------------------------------------
  yield proms.P.map(stats, co.wrap(function* (stat, i) {

    // grab path associated with stats
    const path = paths[i]

    // convenience fn to add path to out.contents
    function* addTo(type, promise) {
      return promise
        ? out.contents[type][path] = yield promise
        : out.contents[type][path] = yield parseStat(stat)
    }

    // handle dir/symlink/file/exe
    if (stat.isDirectory())
      return yield addTo('dirs', parseStat(stat, path))

    if (stat.isSymbolicLink())
      return yield addTo(
        'symlinks'
      , Object.assign(
          {}
        , yield proms.linkTarget(path)
        , yield parseStat(stat)
        )
      )

    if (stat.isFile())
      return (yield isexe(path))
        ? yield addTo('exes')
        : yield addTo('files')
  }))

  // return constructed output
  //----------------------------------------------------------
  return out
}

// export
//----------------------------------------------------------
module.exports = co.wrap(globStats)
