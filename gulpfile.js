/**
 *
 * Gulpfile
 *
 * Summary:
 * This file will jumpstart and automate your projects! It provides several
 * useful functions (tasks) that can be run in the terminal to help speed up
 * development as well as build your project. Check out https://gulpjs.com
 * for docs and more information.
 *
 * Tasks:
 * Check out the following tasks available:
 * `gulp`
 * `gulp copy`
 * `gulp styles`
 * `gulp scripts`
 * `gulp images`
 * `gulp clean`
 * `gulp build`
 *
 * Folders and Files:
 * The project's source code is stored in the src directory and contains
 * preprocessed files (e.g. sass). The tmp directory contains our preprocessed
 * files to use for local development and testing. Finally the dist directory
 * contains concatenated and minified files optimized for production.
 *
 *  ├── dist
 *  │   ├── style.min.css
 *  │   ├── main.min.js
 *  │   └── *.html
 *  ├── node_modules
 *  ├── src
 *  |   ├── fonts/
 *  |   ├── img/
 *  |   ├── js/
 *  |   ├── scss/
 *  |   └── *.html
 *  └── tmp
 *      ├── css/
 *      ├── fonts/
 *      ├── img/
 *      ├── js/
 *      └── *.html
 *
 * Plugins:
 * gulp         => load gulp (of course!)
 * browserSync  => live CSS reloading and browser syncing
 * sass         => compile Sass into CSS
 * autoprefixer => prefix CSS
 * cleanCSS     => minify CSS
 * concat       => concatenate JS
 * uglify       => minify JS
 * imagemin     => compress images
 * newer        => pass through only files that have been changed
 * rename       => easily rename, add suffixes/prefixes to files
 * del          => delete specified files and/or folders
 * plumber      => Prevent pipe breaking caused by errors
 * 
 * Todo:
 * 1. Include SourceMaps for tmp and dist
 * 2. Switch to ES6 syntax (e.g. arrow function notation)
 * 3. Upgrade to Gulp4
 * 4. Add relative file paths
 * 
 */

const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss     = require('gulp-clean-css');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const rename       = require('gulp-rename');
const del          = require('del');
const plumber      = require('gulp-plumber');

/**
 * 
 * Gulp Tasks for Development
 * 
 * Summary:
 * These tasks take the contents from the src folder, modifies them
 * for development, and places them in the tmp folder. This folder
 * contains a working version of the application and is available
 * to test, debug, or showcase features not ready for production.
 * 
 */

 // Set up BrowserSync and run a local server from tmp
gulp.task('serve', function() {
  browserSync.init({
    server: "./tmp"
  });
});

// Copy src files to tmp directory
gulp.task('copy', function() {
  return gulp.src('src/**/*')
  .pipe(newer('tmp'))
  .pipe(gulp.dest('tmp'));
});

// Copy and compile Sass files to tmp and auto-inject into browser
gulp.task('styles', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./tmp/css'))
    .pipe(browserSync.stream());
});

// Copy JS to tmp and auto-inject into browser
gulp.task('scripts', function() {
  return gulp.src('src/js/main.js')
    .pipe(plumber())
    .pipe(gulp.dest('tmp/js'))
    .pipe(browserSync.stream());
});

// Copy and compress images for development
gulp.task('images', function() {
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(plumber())
    .pipe(newer('dist/img'))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest('tmp/img'));
});

// Remove all files and folders from TMP
gulp.task('clean', function() {
  return del('tmp/**/*')
});

// Default task to start the server and watch files for changes
gulp.task('default', ['serve', 'copy'], function() {
  // If any scss files change, run styles task
  gulp.watch('src/scss/**/*.scss', ['styles']);
  // If any javascript files change, run scripts task
  gulp.watch('src/js/**/*.js', ['scripts']);
  // If any HTML files change, copy the content, and reload the page
  gulp.watch('src/*.html', ['copy']).on('change', browserSync.reload);
});

/**
 * 
 * Gulp Tasks For Distribution
 * 
 * Summary:
 * These tasks take the contents from the src folder, modifies them
 * for production, and places them in the dist folder. This folder
 * will contain an optimized version of our application and will be
 * available to the general public.
 * 
 */

// Compile, autoprefix, and minify Sass files for distribution
gulp.task('styles:build', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({basename: 'style'}))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'))
});

// Concatenate, uglify all JS files for distribution
gulp.task('scripts:build', function() {
  return gulp.src(['src/js/**/*.js'])
    .pipe(plumber())
    .pipe(gulp.dest('dist/js'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'))
});

// Copy and compress all images for distribution
gulp.task('images:build', function() {
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(plumber())
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest('dist/img'));
});

// Copy all font files for distribution
gulp.task('fonts:build', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(plumber())
  .pipe(gulp.dest('dist/fonts'));
});

// Copy all HTML files for distribution
gulp.task('html:build', function() {
  return gulp.src('src/*.html')
  .pipe(plumber())
  .pipe(gulp.dest('dist'));
})

// Remove all files/folders from dist
gulp.task('clean:build', function() {
  return del('dist/**/*');
});

// Build our application for distribution!
gulp.task('build', [
  'clean:build',
  'html:build', 
  'styles:build', 
  'scripts:build', 
  'images:build', 
  'fonts:build'
]);
