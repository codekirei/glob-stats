describe 'cached-parser :', ->

  it 'no opts', ->
    assert.eventually.equal cachedParser()(), true

  it 'opts.size for file', ->
    sizeNum = 200
    stat = size: sizeNum
    expected = size: size stat.size
    actual = co(cachedParser(size: true)(stat))
    assert.eventually.deepEqual actual, expected

  it 'opts.size for dir'

  it 'opts.age'

  it 'opts.size and opts.age'
