
# file-pipe

  Use gulp plugins on individual files

## Example

```js
var filepipe = require('file-pipe');
var insert = require('gulp-insert');

filepipe(__dirname + '/index.js')
  .pipe(insert.prepend('/* Brought to you by file-pipe! */'))
  .pipe(insert.append('/* Good bye for now! */'))
  .run(function(err, str) {
    if (err) throw err;
    // ...
  })
```

## API

### `filepipe([path])`

Create a `filepipe` with an optional `path`

### `pipe(fn|stream)`

Add a gulp stream or function. Functions will be wrapped by `map-stream`

### `run([path], fn)`

Run the file pipe, calling `fn` when finished or there is an error. Optionally pass a `path` which overrides the initial path.

Here's an example of the override:

```js
var writer = filepipe()
  .pipe(insert.prepend('/* Brought to you by file-pipe! */'))
  .pipe(insert.append('/* Good bye for now! */'))

writer.run(__dirname + '/index.js', function(err, str) {
  if (err) throw err;
  // ...
})
```

## License 

(The MIT License)

Copyright (c) 2014 Matthew Mueller &lt;mattmuelle@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
