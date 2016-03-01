'use strict';

import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('clean', () =>
  del(['dist'], {dot: true})
);

gulp.task('copy', () =>
	gulp.src([
		'src/**/*.html',
	]).pipe(gulp.dest('dist'))
);

gulp.task('images', () =>
  gulp.src('src/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
);

gulp.task('scripts', () =>
	gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'
	])
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write())
    .pipe($.concat('app.min.js'))
    .pipe($.uglify({preserveComments: 'some'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
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
    'src/styles/**/*.scss'
  ])
    .pipe($.sourcemaps.init())
    .pipe($.sass(SASS_OPTIONS).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('serve', ['copy', 'scripts', 'styles', 'images'], () => {
  browserSync({
    notify: false,
    server: ['dist'],
    port: 3000
  });

  gulp.watch(['src/**/*.html'], ['copy', reload]);
  gulp.watch(['src/styles/**/*.scss'], ['styles', reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts', reload]);
  gulp.watch(['src/images/**/*'], ['images', reload])
})

gulp.task('build', ['clean'], cb =>
  runSequence(
    'styles',
    ['scripts', 'images', 'copy'],
    cb
  )
);

gulp.task('default', ['build']);
