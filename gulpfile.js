'use strict'
const gulp = require('gulp');
const connect = require('gulp-connect'); // runs local webserver
const open = require('gulp-open'); // open url in web browser

const config = {
  paths:{
    html: './src/**/*.html',
    dist: './dist'
  },
  port: 9900,
  devbaseUrl: 'http://localhost'
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
  gulp.src('dist/index.html')
      .pipe(open('', {
        url: `${config.devbaseUrl}:${config.port}/`
      }))
});

gulp.task('html', () => {
  gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(connect.reload())
});

gulp.task('default', ['html', 'open']);