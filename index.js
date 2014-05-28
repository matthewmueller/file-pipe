/**
 * Module dependencies
 */

var stripbom = require('strip-bom')
var fs = require('graceful-fs');
var pipe = require('multipipe');
var map = require('map-stream');
var File = require('vinyl');

/**
 * Export `filepipe`
 */

module.exports = filepipe;

/**
 * Initialize `filepipe`
 *
 * @param {String} path (optional)
 * @return {filepipe}
 */

function filepipe(path) {
  if (!(this instanceof filepipe)) return new filepipe(path);
  this.path = path;
  this.streams = [];
}

/**
 * Pass the file through a gulp
 * plugin or function
 *
 * @param {Stream|Function} stream
 * @return {filepipe}
 * @api public
 */

filepipe.prototype.pipe = function(stream) {
  stream = 'function' == typeof stream ? map(stream) : stream;
  this.streams.push(stream);
  return this;
};

/**
 * Run the filepipe
 *
 * @param {String} path (optional)
 * @param {Function} fn
 * @api public
 */

filepipe.prototype.run = function (path, fn) {
  if (1 == arguments.length) {
    fn = path;
    path = this.path;
  }

  if (!path) throw new Error('no file specified');

  var stream = this.stream(path);
  var streams = pipe.apply(null, this.streams);

  streams.on('error', function(err) {
    fn && fn(err);
  });
 
  return stream
    .pipe(streams)
    .pipe(map(done));

  function done(file, end) {
    fn && fn(null, file.contents.toString());
    end();
  }
};

/**
 * Make the readable stream 
 * compatible with gulp.
 *
 * @param {String} path
 * @return {Stream}
 * @api private
 */

filepipe.prototype.format = function(path) {
  var file = new File({ path: path });

  return map(function(buf, fn) {
    file.contents = buf;
    fn(null, file);
  });
};

/**
 * Create a readable stream that
 * is compatible with gulp.
 *
 * @param {String} path
 * @return {Stream}
 * @api private
 */

filepipe.prototype.stream = function(path) {
  return fs.createReadStream(path, 'utf8')
    .pipe(stripbom.stream())
    .pipe(this.format(path))
};


var insert = require('gulp-insert');

filepipe(__dirname + '/index.js')
  .pipe(insert.append('hi omg!!!'))
  .pipe(insert.prepend('hi omg!!!'))
  .run(function(err, str) {
    console.log(err, str);
  })

// var vinyl = require('vinyl-fs');

// vinyl.src([__dirname + '/duo.js'])
//   .pipe(map(function(file, fn) {
//     console.log(file);
//   }))
