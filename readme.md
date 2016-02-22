# `glob-stats`

[![Build Status][1]][2]
[![Coverage Status][3]][4]

<b>[About](#about)</b> | 
<b>[Installation](#installation)</b> | 
<b>[Usage](#usage)</b> | 
<b>[License](#license)</b>

---

## About

A Node.JS module that returns a Promise that returns [glob](https://github.com/sindresorhus/globby) contents filtered into files, dirs, executables, and symlinks.
Can also optionally include stats about the size and/or age of each entity.

## Installation

Install and require as a standard Node module.

**Install**

```
  $ npm install --save glob-stats
```

**Require**

```js
  var firstOpenPort = require('glob-stats')
```

## Usage

**globStats(glob, opts)**

- glob : *String* : glob to resolve
- (opts): *Object* : optional additional stats to include

**Opts**

Optional stats to include.
If `opts` is left undefined, each glob result will be assigned to `true` (except symlinks &mdash; see below).
If `opts.size` or `opts.age` are `true`, the respective stats will be provided as values.

```js
// default opts:
var globStatsOpts = {
  size: false,
  age: false
}
```

**Example &mdash; No Opts**

```js
var globStats = require('glob-stats')

globStats('a/glob/*')
  .then(res => {
    // do something with the results

    /* example results object
     * {
     *   glob: 'a/glob/*',
     *   root: 'a/glob/',
     *   contents: {
     *     file: { 'a/glob/index.js': true },
     *     exe: { 'a/glob/cli.js': true },
     *     dir: { 'a/glob/dir': true },
     *     symlink: {
     *       'a/glob/symlink': {
     *         target: {
     *           path: './index.js',
     *           type: 'file'
     *         }
     *       }
     *     }
     *   }
     * }
     */
  })
```

**Symlinks**

You may have noticed that `contents.symlink` is a little different. `glob-stats` automatically reads symlinks to determine the target path and type (`file`, `exe`, or `dir`). Nested symlinks are not currently supported.

**Example &mdash; Size and Age**

```js
var globStats = require('glob-stats')

globStats('a/different/glob/*', {size: true, age: true})
  .then(res => {
    // do something with the results

    /* example results object
     * {
     *   glob: 'a/different/glob/*',
     *   root: 'a/different/glob/',
     *   contents: {
     *     file: {
     *       'a/different/glob/file.js': {
     *         size: { raw: 1092, pretty: '1.09 kb' },
     *         age: { raw: 841042058, pretty: '9 days 17 hours' }
     *       }
     *     },
     *     exe: {},
     *     dir: {},
     *     symlink: {}
     *   }
     * }
     */
  })
```

As you can see, `size` is captured in an object with the raw byte count and a human-friendly size, while `age` is captured in an object with the raw milliseconds since modification (`fs.Stats.mtime`) and a human-readable representation of that number.

**Dir Sizes**

When `opts.size` is true, `glob-stats` recursively descends into directories to determine their size.
That means the reported size of directories includes both the size of the dir itself (usually the filesystem's block size) and the combined size of all the dir's contents.

## License

[MIT](https://github.com/codekirei/glob-stats/blob/master/license)

[1]: https://img.shields.io/travis/codekirei/glob-stats.svg?style=flat-square
[2]: https://travis-ci.org/codekirei/glob-stats
[3]: http://img.shields.io/coveralls/codekirei/glob-stats.svg?style=flat-square
[4]: https://coveralls.io/github/codekirei/glob-stats?branch=master
