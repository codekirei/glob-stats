describe 'cached-parser :', ->

  # ----------------------------------------------------------
  # shared vars
  # ----------------------------------------------------------

  stat =
    size: 42
    mtime: 0

  # ----------------------------------------------------------
  # cases
  # ----------------------------------------------------------

  it 'no opts', ->
    assert.equal(
      yield cachedParser()()
    , true
    )

  # ----------------------------------------------------------

  it 'opts.size for file', ->
    assert.deepEqual(
      size: size stat.size
    , yield cachedParser(size: true) stat
    )

  # ----------------------------------------------------------

  it 'opts.size for dir', ->
    sinon.stub(proms, 'folderSize').returns(Promise.resolve stat.size)
    assert.deepEqual(
      size:
        raw: stat.size
        pretty: bytes stat.size
    , yield cachedParser(size: true) stat, '.'
    )
    proms.folderSize.restore()

  # ----------------------------------------------------------

  it 'opts.age', ->
    clock.freeze()
    clock.tick(10000000000)
    assert.deepEqual(
      age: age new Date(), stat.mtime
    , cachedParser(age: true) stat
    )
    clock.restore()

  # ----------------------------------------------------------

  it 'opts.size and opts.age', ->
    ob = yield cachedParser(age: true, size: true) stat
    assert.property(ob, 'age')
    assert.property(ob, 'size')
