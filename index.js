'use strict'

// import
//----------------------------------------------------------
// npm
const co     = require('co')
const globby = require('globby')
const isexe  = require('isexe')

// local
const age     = require('./lib/age')
const dirSize = require('./lib/dir-size')
const proms   = require('./lib/proms')
const size    = require('./lib/size')

// jsdoc
function* globStats(glob, opts) {

  // create output skeleton
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

  const now = Date.now()

  // get paths and stats from glob
  //----------------------------------------------------------
  const paths = yield globby(glob)
  const stats = yield proms.P.all(paths.map(path => proms.getStats(path)))

  // filter paths and stats into output
  //----------------------------------------------------------
  yield proms.P.map(stats, co.wrap(function* (stat, i) {

    const path = paths[i]

    if (stat.isDirectory()) out.contents.dirs[path] =
      { age: age(now, stat.mtime)
      , size: yield dirSize(path)
      }

    else if (stat.isSymbolicLink()) {
      out.contents.symlinks[path] = yield proms.linkTarget(path)
      out.contents.symlinks[path].stats = stat
    }

    else if (stat.isFile()) (yield isexe(path))
      ? out.contents.exes[path] =
          { age: age(now, stat.mtime)
          , size: size(stat.size)
          }
      : out.contents.files[path] =
          { age: age(now, stat.mtime)
          , size: size(stat.size)
          }
  }))

  // return constructed output
  //----------------------------------------------------------
  return out
}

// export
//----------------------------------------------------------
module.exports = co.wrap(globStats)
