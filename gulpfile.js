const gulp = require('gulp');
const runSequence = require('run-sequence');
const download = require('gulp-downloader');
const gunzip = require('gulp-gunzip');
const chmod = require('gulp-chmod');
const rename = require('gulp-rename');
const mocha = require('gulp-spawn-mocha');
const process = require('process');

gulp.task('install-gecko-driver', function() {

  // wires is the previous project name of geckodriver
  const GECKO_DRIVER_BINARY_NAME = 'wires';
  const GECKO_DRIVER_VERSION = '0.7.1';
  const GECKO_DRIVER_FOLDER = `${__dirname}/dist`;

  // GeckoDriver must be in the path, so Selenium client can locate it
  const oldPath = process.env.PATH;
  process.env.PATH = `${oldPath}:${GECKO_DRIVER_FOLDER}`;

  const os = getOsName();

  return download(`https://github.com/mozilla/geckodriver/releases/download/\
v${GECKO_DRIVER_VERSION}/${GECKO_DRIVER_BINARY_NAME}-${GECKO_DRIVER_VERSION}\
-${os}.gz`)
    .pipe(gunzip())
    .pipe(chmod(755))
    .pipe(rename(GECKO_DRIVER_BINARY_NAME))
    .pipe(gulp.dest(GECKO_DRIVER_FOLDER));
});

function getOsName() {
  switch (process.platform) {
    case 'darwin':
      return 'OSX';
    case 'linux':
      return 'linux64'; // Warning: No 32 bits binary is available
    default:
      throw new Error('Unsupported OS');
  }
}

gulp.task('run-test', function() {
  return gulp.src(
    'index.js', { read: false }
    )
    .pipe(mocha());
});

gulp.task('test', function(cb) {
  runSequence(
    'install-gecko-driver',
    'run-test'
  );
});
