'use strict'

// import
//----------------------------------------------------------
const size = require('./size')
const age = require('./age')
const dirSize = require('./dir-size')

// jsdoc
function cachedParser(opts) {

  if (!opts) return trueFn

  let id = 0
  const vals =
    [ 'size'
    , 'age'
    ]

  vals.forEach((v, i) => {
    if (opts[v]) id += Math.pow(i + 1, 2)
  })

  switch (id) {
    case 1: return sizeFn
    case 4: return ageFn
    case 5: return bothFn
  }
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
