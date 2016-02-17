describe 'index :', ->

  # ----------------------------------------------------------
  # shared
  # ----------------------------------------------------------

  glob = 'globDir/*'
  path = 'file'

  # ----------------------------------------------------------
  # hooks
  # ----------------------------------------------------------

  before ->
    mock globDir:
      dir: mock.directory()
      file: mock.file
      exe: mock.file mode: 755
      symlink: mock.symlink path: path

  after ->
    mock.restore()

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
            file: true
          dir:
            dir: true
          exe:
            exe: true
          symlink:
            symlink:
              target:
                path: path
                type: 'file'
