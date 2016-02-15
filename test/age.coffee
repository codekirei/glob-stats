describe 'age :', ->

  # ----------------------------------------------------------
  # hooks
  # ----------------------------------------------------------

  beforeEach -> clock.freeze()
  afterEach -> clock.restore()

  # ----------------------------------------------------------
  # cases
  # ----------------------------------------------------------

  it 'return {raw: <Number>, pretty: <String>}', ->

    diff = 1000
    timeA = new Date()
    clock.tick(diff)
    timeB = new Date()

    expected =
      raw: diff
      pretty: '1 second'

    actual = age timeB, timeA

    assert.deepEqual actual, expected

  # ----------------------------------------------------------

  it 'only use first 2 units in pretty string', ->

    diff = 111111111
    timeA = new Date()
    clock.tick(diff)
    timeB = new Date()

    expected =
      raw: diff
      pretty: '1 day 6 hours'

    actual = age timeB, timeA

    assert.deepEqual actual, expected
