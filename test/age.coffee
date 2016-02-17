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

    t.deepEqual
      have: age timeB, timeA
      want:
        raw: diff
        pretty: '1 second'

  # ----------------------------------------------------------

  it 'only use first 2 units in pretty string', ->

    diff = 111111111
    timeA = new Date()
    clock.tick(diff)
    timeB = new Date()

    t.deepEqual
      have: age timeB, timeA
      want:
        raw: diff
        pretty: '1 day 6 hours'
