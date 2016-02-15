describe 'dir-size :', ->

  # ----------------------------------------------------------
  # shared vars
  # ----------------------------------------------------------

  num = 42

  # ----------------------------------------------------------
  # hooks
  # ----------------------------------------------------------

  before ->
    sinon.stub(proms, 'folderSize').returns(Promise.resolve num)

  after ->
    proms.folderSize.restore()

  # ----------------------------------------------------------
  # cases
  # ----------------------------------------------------------

  it 'return {raw: <Number>, pretty: <String}', ->
    assert.deepEqual(
      raw: num
      pretty: bytes num
    , yield dirSize()
    )
