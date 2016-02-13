'use strict'

// import
//----------------------------------------------------------
const co = require('co')
const getFolderSize = require('get-folder-size')
const bytes = require('pretty-bytes')

// promises
//----------------------------------------------------------
const Promise = require('bluebird')
Promise.config(
  { longStackTraces: true
  }
)
const folderSize = Promise.promisify(getFolderSize)

// jsdoc
function* dirSize(path) {
  const raw = yield folderSize(path)
  return {
    raw
  , pretty: bytes(raw)
  }
}

// export
//----------------------------------------------------------
module.exports = co.wrap(dirSize)
