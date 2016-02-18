'use strict'

// import
//----------------------------------------------------------
const isexe = require('isexe')

/**
  Determines if an entity is a dir, symlink, exe, or file bases on fs.Stats.

  @param {Object} stat - fs.Stats
  @param {String} [path] - path to entity (needed for file/exe)
  @returns {String} 'file', 'exe', 'symlink', or 'dir'
 */
function* statType(stat, path) {
  if (stat.isDirectory()) return 'dir'
  if (stat.isSymbolicLink()) return 'symlink'
  if (stat.isFile()) return (yield isexe(path)) ? 'exe' : 'file'
}

// export
//----------------------------------------------------------
module.exports = statType
