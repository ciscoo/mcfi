'use strict';

import gulp from 'gulp';
import del from 'del';
import cp from 'child_process';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const bs = browserSync.create();

gulp.task('jekyll:build', () => {
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('error', error => $.util.log($.util.colors.red(error.message)))
    .on('close', reload);
})

gulp.task('jekyll', ['jekyll:build'], reload);

gulp.task('clean', (cb) =>
  del(['src/_site/**/*'], {dot: false}, cb)
);

gulp.task('images', () =>
  gulp.src('src/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('src/_site/images'))
);

gulp.task('scripts:vendor', () =>
	gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'
	])
    .pipe(gulp.dest('src/_site/js'))
);

gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  const SASS_OPTIONS = {
    includePaths: ['node_modules/bootstrap-sass/assets/stylesheets/'],
    precision: 10,
  };

  return gulp.src([
    'src/_sass/**/*.scss'
  ])
    .pipe($.sourcemaps.init())
    .pipe($.sass(SASS_OPTIONS).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('src/_site/css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['clean', 'scripts:vendor', 'styles', 'images', 'jekyll:build'], () => {
  bs.init({
    notify: true,
    server: {
      baseDir: 'src/_site'
    },
    port: 3000
  });

  gulp.watch(['src/**/*.html'], ['jekyll']);
  gulp.watch(['src/_sass/**/*.scss'], ['styles']);
  gulp.watch(['src/scripts/**/*.js'], ['scripts:vendor', reload]);
  gulp.watch(['src/images/**/*'], ['images', reload])
})

gulp.task('build', ['clean'], cb =>
  runSequence(
    'styles',
    ['scripts:vendor', 'images', 'jekyll:build'],
    cb
  )
);

gulp.task('default', ['build']);
