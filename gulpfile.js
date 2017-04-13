'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect'); // runs local webserver
const open = require('gulp-open'); // open url in web browser

const config = {
  paths:{
    html: './src/*.html',
    dist: './dist'
  },
  port: 9900,
  devBaseUrl: 'http://localhost'
};

gulp.task('connect', () => {
  return connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  })
});

gulp.task('open', ['connect'], () => {
  console.log(`${config.devBaseUrl}:${config.port}/`);
  gulp.src('./dist/index.html')
      .pipe(open({
        uri: `${config.devBaseUrl}:${config.port}/`
      }))
});

gulp.task('html', () => {
  gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(connect.reload())
});

gulp.task('default', ['html', 'open']);
