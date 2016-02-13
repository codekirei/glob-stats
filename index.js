'use strict'

// import
//----------------------------------------------------------
const Promise    = require('bluebird')
const bytes      = require('pretty-bytes')
const co         = require('co')
const folderSize = require('get-folder-size')
const fs         = require('fs')
const globby     = require('globby')
const isexe      = require('isexe')
const ms         = require('pretty-ms')
const p          = require('path')

// promisification
//----------------------------------------------------------
const getStats = Promise.promisify(fs.lstat)
const readLink = Promise.promisify(fs.readlink)
const fSize = Promise.promisify(folderSize)

// top level vars
//----------------------------------------------------------
const now = Date.now()

// jsdoc
function* linkTarget(path) {

  const target = { target: yield readLink(path) }
  const relTarget = p.resolve(p.dirname(path), target.target)
  const stats = yield getStats(relTarget)

  if (stats.isDirectory()) target.type = 'dir'
  else if (stats.isFile())
    target.type = (yield isexe(relTarget)) ? 'exe' : 'file'

  return target
}

// jsdoc
function age(mtime) {
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

function size(raw) {
  return {
    raw
  , pretty: bytes(raw)
  }
}

function* dirSize(path) {
  const raw = yield fSize(path)
  return {
    raw
  , pretty: bytes(raw)
  }
}

// jsdoc
function* globContents(potentialGlob) {

  // ensure glob and compute common root
  //----------------------------------------------------------
  const glob = potentialGlob.indexOf('*') >= 0
    ? potentialGlob
    : p.join(potentialGlob, '*')
  const root = glob.slice(0, glob.indexOf('*'))

  // create output skeleton
  //----------------------------------------------------------
  const out =
    { glob
    , root
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
  const stats = yield Promise.all(paths.map(path => getStats(path)))

  // filter paths and stats into output
  //----------------------------------------------------------
  yield Promise.map(stats, co.wrap(function* (stat, i) {

    const path = paths[i]

    if (stat.isDirectory()) out.contents.dirs[path] =
      { age: age(stat.mtime)
      , size: yield dirSize(path)
      }

    else if (stat.isSymbolicLink()) {
      out.contents.symlinks[path] = yield linkTarget(path)
      out.contents.symlinks[path].stats = stat
    }

    else if (stat.isFile()) (yield isexe(path))
      ? out.contents.exes[path] =
          { age: age(stat.mtime)
          , size: size(stat.size)
          }
      : out.contents.files[path] =
          { age: age(stat.mtime)
          , size: size(stat.size)
          }
  }))

  // return constructed output
  //----------------------------------------------------------
  return out
}

// export
//----------------------------------------------------------
module.exports = co.wrap(globContents)
