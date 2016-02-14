'use strict'

// require modules used in testing and add to global object
// this file is injected by mocha.opts

// npm
//----------------------------------------------------------
global.withFixtures = require('fixtures-fs')
global.bytes = require('pretty-bytes')

// chai
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
global.assert = chai.assert

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
global.dirSize = require('../../lib/dir-size')
global.linkTarget = require('../../lib/link-target')
global.proms = require('../../lib/proms')
global.size = require('../../lib/size')
