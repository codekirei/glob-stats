describe 'index :', ->

  # ----------------------------------------------------------
  # shared
  # ----------------------------------------------------------

  root    = 'globDir'
  glob    = p.join root, '*'
  dir     = p.join root, 'dir'
  file    = p.join root, 'file'
  exe     = p.join root, 'exe'
  symlink = p.join root, 'symlink'
  abs     = p.join process.cwd(), file
  target  = 'file'

  statBase =
    isDirectory: -> false
    isSymbolicLink: -> false
    isFile: -> false
  stat = (ob) -> Object.assign {}, statBase, ob

  typeMap = new Map [
    [dir, stat isDirectory: -> true]
    [symlink, stat isSymbolicLink: -> true]
  ]
  [file, exe, abs].forEach (type) ->
    typeMap.set type, stat isFile: -> true

  want =
    glob: glob
    root: root + sep
    contents:
      file: {}
      dir: {}
      exe: {}
      symlink: {}
  want.contents.file[file] = true
  want.contents.dir[dir] = true
  want.contents.exe[exe] = true
  want.contents.symlink[symlink] =
    target:
      type: 'file'
      path: target

  # ----------------------------------------------------------
  # hooks
  # ----------------------------------------------------------

  before ->

    sinon.stub proms
      , 'getStats'
      , (path) -> Promise.resolve typeMap.get path

    mock globDir:
      dir: mock.directory()
      file: mock.file()
      exe: mock.file mode: 755
      symlink: mock.symlink path: target

  after ->
    mock.restore()
    proms.getStats.restore()

  # ----------------------------------------------------------
  # cases
  # ----------------------------------------------------------

  it 'return {glob: <String>, root: <String>, contents: <Object>}', ->
    t.deepEqual
      have: yield globStats glob
      want: want
