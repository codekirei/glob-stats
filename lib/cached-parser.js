'use strict'

// import
//----------------------------------------------------------
const size = require('./size')
const age = require('./age')
const dirSize = require('./dir-size')

// jsdoc
function cachedParser(opts) {
  if (!opts) return trueFn
  if (opts.size && !opts.age) return sizeFn
  if (!opts.size && opts.age) return ageFn
  if (opts.size && opts.age) return bothFn
}

function trueFn() { return Promise.resolve(true) }

function* sizeFn(stat, path) {
  return {
    size: path
      ? yield dirSize(path)
      : size(stat.size)
  }
}

function ageFn(stat) {
  const now = new Date()
  return {
    age: age(now, stat.mtime)
  }

}

function* bothFn(stat, path) {
  return Object.assign(
    {}
  , yield sizeFn(stat, path)
  , ageFn(stat))
}

// export
//----------------------------------------------------------
module.exports = cachedParser
