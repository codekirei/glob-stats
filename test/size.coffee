describe 'size :', ->

  it 'return {raw: <Number>, pretty: <String>}', ->
    byteCt = 10
    actual = size byteCt
    expected =
      raw: byteCt
      pretty: bytes byteCt
    assert.deepEqual actual, expected
