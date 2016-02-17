describe 'stat-type :', ->

  # ----------------------------------------------------------
  # shared
  # ----------------------------------------------------------

  base =
    isDirectory: -> false
    isSymbolicLink: -> false
    isFile: -> false

  stat = (ob) -> Object.assign {}, base, ob

  mocked = false

  # ----------------------------------------------------------
  # hooks
  # ----------------------------------------------------------

  afterEach ->
    if mocked
      mocked = false
      mock.restore()

  # ----------------------------------------------------------
  # cases
  # ----------------------------------------------------------

  it 'dir', -> t.equal
    have: yield statType stat isDirectory: -> true
    want: 'dir'

  # ----------------------------------------------------------

  it 'symlink', -> t.equal
    have: yield statType stat isSymbolicLink: -> true
    want: 'symlink'

  # ----------------------------------------------------------

  it 'file', ->

    mock file: mock.file()
    mocked = true

    t.equal
      have: yield statType stat(isFile: -> true), 'file'
      want: 'file'

  # ----------------------------------------------------------

  it 'exe', ->

    mock exe: mock.file mode: 755
    mocked = true

    t.equal
      have: yield statType stat(isFile: -> true), 'exe'
      want: 'exe'
