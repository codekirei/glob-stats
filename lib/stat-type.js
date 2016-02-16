'use strict'

// import
//----------------------------------------------------------
const isexe = require('isexe')

// jsdoc
function* statType(stat, path) {
  if (stat.isDirectory()) return 'dir'
  if (stat.isSymbolicLink()) return 'symlink'
  if (stat.isFile()) return (yield isexe(path)) ? 'exe' : 'file'
}

// export
//----------------------------------------------------------
module.exports = statType
