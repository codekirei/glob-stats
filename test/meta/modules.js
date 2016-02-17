'use strict'

// require modules used in testing and add to global object
// this file is injected by mocha.opts

// node
//----------------------------------------------------------
const p = require('path')
global.p = p
global.sep = p.sep

// npm
//----------------------------------------------------------
global.bytes = require('pretty-bytes')
global.co = require('co')
global.ms = require('pretty-ms')
global.mock = require('mock-fs')

// assertions
const assert = require('chai').assert
global.t = () => {
  const fns = {}
  for (const fn in assert) fns[fn] = ob => assert[fn](ob.have, ob.want)
  return fns
}()

// sinon
const sinon = require('sinon')
const clock = () => {
  let c
  return { freeze: () => c = sinon.useFakeTimers()
         , tick: ms => c.tick(ms)
         , restore: () => c.restore()
         }
}
global.sinon = sinon
global.clock = clock()

// local
//----------------------------------------------------------
global.globStats = require('../..')
global.age = require('../../lib/age')
global.parseStat = require('../../lib/parse-stat')
global.dirSize = require('../../lib/dir-size')
global.linkTarget = require('../../lib/link-target')
global.proms = require('../../lib/proms')
global.size = require('../../lib/size')
global.statType = require('../../lib/stat-type')
