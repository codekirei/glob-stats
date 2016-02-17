describe 'stat-type :', ->

  # ----------------------------------------------------------
  # shared vars
  # ----------------------------------------------------------

  base =
    isDirectory: -> false
    isSymbolicLink: -> false
    isFile: -> false

  stat = (ob) -> Object.assign {}, base, ob

  t = (prop, ob) -> assert[prop] ob.have, ob.want

  # ----------------------------------------------------------
  # cases
  # ----------------------------------------------------------

  it 'dir', -> t 'equal',
    have: yield statType stat isDirectory: -> true
    want: 'dir'

  # ----------------------------------------------------------

  it 'symlink', -> t 'equal',
    have: yield statType stat isSymbolicLink: -> true
    want: 'symlink'

  # ----------------------------------------------------------

  it 'file', ->
    mock file: mock.file mode: 644
    have = yield statType stat(isFile: -> true), 'file'
    mock.restore()
    t 'equal',
      have: have
      want: 'file'

  # ----------------------------------------------------------

  it 'exe', ->
    mock exe: mock.file mode: 755
    have = yield statType stat(isFile: -> true), 'exe'
    mock.restore()
    t 'equal',
      have: have
      want: 'exe'
