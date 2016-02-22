'use strict'

// import
//----------------------------------------------------------
const parseStat = require('./parse-stat')
const linkTarget = require('./link-target')

/**
  Build an object of handler fns based on flags in opts.

  @param {Object} [opts] - which details to include
  @returns {Object} object with handler functions for each type
 */
function handlers(opts) {

  const parser = parseStat(opts)

  function* handler(stat) { return yield parser(stat) }

  function* dirHandler(stat, path) { return yield parser(stat, path) }

  function* symlinkHandler(stat, path) {
    return Object.assign(
      {}
    , yield parser(stat)
    , yield linkTarget(path)
    )
  }

  return {
    file: handler
  , exe: handler
  , dir: dirHandler
  , symlink: symlinkHandler
  }

}

// export
//----------------------------------------------------------
module.exports = handlers
