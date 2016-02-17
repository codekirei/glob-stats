describe 'handlers :', ->

  # ----------------------------------------------------------
  # shared
  # ----------------------------------------------------------

  handle = undefined

  base =
    isDirectory: -> false
    isSymbolicLink: -> false
    isFile: -> false

  stat = (ob) -> Object.assign {}, base, ob

  # ----------------------------------------------------------
  # hooks
  # ----------------------------------------------------------

  before ->
    handle = handlers()

  afterEach ->
    [ proms.readLink
    , proms.getStats
    ].forEach (stub) -> if stub.restore then stub.restore()

  # ----------------------------------------------------------
  # cases
  # ----------------------------------------------------------

  it 'file', -> t.equal
    have: yield handle.file stat isFile: -> true
    want: true

  # ----------------------------------------------------------

  it 'exe', -> t.equal
    have: yield handle.exe stat isFile: -> true
    want: true

  # ----------------------------------------------------------

  it 'dir', -> t.equal
    have: yield handle.dir stat isDirectory: -> true
    want: true

  # ----------------------------------------------------------

  it 'symlink', ->

    path = 'foo'

    sinon.stub proms, 'readLink', -> Promise.resolve path
    sinon.stub proms, 'getStats', -> Promise.resolve stat isDirectory: -> true

    t.deepEqual
      have: yield handle.symlink stat(isSymbolicLink: -> true)
      want:
        target:
          path: path
          type: 'dir'
