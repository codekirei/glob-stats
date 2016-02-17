describe 'dir-size :', ->

  # ----------------------------------------------------------
  # shared
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

  it 'return {raw: <Number>, pretty: <String}', -> t.deepEqual
    have: yield dirSize()
    want:
      raw: num
      pretty: bytes num
