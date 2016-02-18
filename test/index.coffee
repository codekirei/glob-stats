describe 'index :', ->

  # ----------------------------------------------------------
  # shared
  # ----------------------------------------------------------

  root = 'globDir'
  glob = p.join root, '*'
  file = p.join root, 'file'

  statBase =
    isDirectory: -> false
    isSymbolicLink: -> false
    isFile: -> false
  stat = (ob) -> Object.assign {}, statBase, ob

  # ----------------------------------------------------------
  # hooks
  # ----------------------------------------------------------

  before ->
    sinon.stub proms
      , 'getStats'
      , -> Promise.resolve stat isFile: -> true
    mock globDir: file: mock.file()

  after ->
    mock.restore()
    proms.getStats.restore()

  # ----------------------------------------------------------
  # cases
  # ----------------------------------------------------------

  it 'return {glob: <String>, root: <String>, contents: <Object>}', ->
    t.deepEqual
      have: yield globStats glob
      want:
        glob: glob
        root: root + sep
        contents:
          file: "#{file}": true
          dir: {}
          exe: {}
          symlink: {}
