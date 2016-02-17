describe 'cached-parser :', ->

  # ----------------------------------------------------------
  # shared
  # ----------------------------------------------------------

  stat =
    size: 42
    mtime: 0

  # ----------------------------------------------------------
  # hooks
  # ----------------------------------------------------------

  afterEach ->
    [ proms.folderSize
    , clock
    ].forEach (stub) -> if stub.restore then stub.restore()

  # ----------------------------------------------------------
  # cases
  # ----------------------------------------------------------

  it 'neither size nor age', -> t.equal
    have: yield cachedParser()()
    want: true

  # ----------------------------------------------------------

  it 'just size (file)', -> t.deepEqual
    have: yield cachedParser(size: true) stat
    want: size: size stat.size

  # ----------------------------------------------------------

  it 'just size (dir)', ->

    sinon.stub(proms, 'folderSize').returns(Promise.resolve stat.size)

    t.deepEqual
      have: yield cachedParser(size: true) stat, '.'
      want:
        size:
          raw: stat.size
          pretty: bytes stat.size

  # ----------------------------------------------------------

  it 'just age', ->

    clock.freeze()
    clock.tick(10000000000)

    t.deepEqual
      have: cachedParser(age: true) stat
      want: age: age new Date(), stat.mtime

  # ----------------------------------------------------------

  it 'both size and age', ->

    have = yield cachedParser(opts = age: true, size: true) stat

    test = (k) -> t.property
      have: have
      want: k

    test k for k in Object.keys opts
