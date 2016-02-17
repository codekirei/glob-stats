describe 'index :', ->

  # ----------------------------------------------------------
  # shared
  # ----------------------------------------------------------

  glob = 'globDir/*'

  statBase =
    isDirectory: -> false
    isSymbolicLink: -> false
    isFile: -> false

  stat = (ob) -> Object.assign {}, statBase, ob

  typeMap =
    'globDir/dir': stat isDirectory: -> true
    'globDir/file': stat isFile: -> true
    'globDir/exe': stat isFile: -> true

  # ----------------------------------------------------------
  # hooks
  # ----------------------------------------------------------

  before ->
    sinon.stub proms, 'getStats', (_path) -> typeMap[_path]
    mock
      globDir:
        dir: mock.directory()
        file: mock.file()
        exe: mock.file mode: 755

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
        root: 'globDir/'
        contents:
          file:
            'globDir/file': true
          dir:
            'globDir/dir': true
          exe:
            'globDir/exe': true
          symlink: {}
