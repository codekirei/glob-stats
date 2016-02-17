describe 'link-target :', ->

  # ----------------------------------------------------------
  # shared
  # ----------------------------------------------------------

  path = 'foo'

  # ----------------------------------------------------------
  # hooks
  # ----------------------------------------------------------

  before ->
    sinon.stub(proms, 'readLink').returns(Promise.resolve path)
    sinon.stub(proms, 'getStats').returns(Promise.resolve isDirectory: -> true)
    sinon.stub(p, 'resolve')

  after ->
    [ proms.readLink
    , proms.getStats
    , p.resolve
    ].forEach (stub) -> stub.restore()

  # ----------------------------------------------------------
  # cases
  # ----------------------------------------------------------

  it 'return {target: {path: <String>, type: <String>}}', ->
    t.deepEqual
      have: yield linkTarget()
      want:
        target:
          path: path
          type: 'dir'
