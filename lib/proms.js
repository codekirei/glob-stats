'use strict'

// import
//----------------------------------------------------------
const Promise = require('bluebird')
const fs = require('fs')
const getFolderSize = require('get-folder-size')

// config
//----------------------------------------------------------
Promise.config(
  { longStackTraces: true
  }
)

// fns
//----------------------------------------------------------
const folderSize = Promise.promisify(getFolderSize)
const getStats = Promise.promisify(fs.lstat)
const readLink = Promise.promisify(fs.readlink)

// export
//----------------------------------------------------------
module.exports =
  { folderSize
  , getStats
  , P: Promise
  , readLink
  }
