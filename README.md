# Simple Gulp Workflow

## Summary
This file will jumpstart and automate your projects! It provides several
useful functions (tasks) that can be run in the terminal to help speed up
development as well as build your project. Check out https://gulpjs.com
for docs and more information.

## Tasks:
Check out the following tasks available:
-  gulp 
-  gulp copy 
-  gulp styles 
-  gulp scripts 
-  gulp images 
-  gulp clean 
-  gulp build`

## Folders and Files:
The project's source code is stored in the src directory and contains
preprocessed files (e.g. sass). The tmp directory contains our preprocessed
files to use for local development and testing. Finally the dist directory
contains concatenated and minified files optimized for production.
```
├── dist
│   ├── style.min.css
│   ├── main.min.js
│   └──  .html
├── node_modules
├── src
|   ├── fonts/
|   ├── img/
|   ├── js/
|   ├── scss/
|   └──  .html
└── tmp
  ├── css/
  ├── fonts/
  ├── img/
  ├── js/
  └──  .html
```

## Plugins:
- gulp         => load gulp (of course!)
- browserSync  => live CSS reloading and browser syncing
- sass         => compile Sass into CSS
- autoprefixer => prefix CSS
- cleanCSS     => minify CSS
- concat       => concatenate JS
- uglify       => minify JS
- imagemin     => compress images
- newer        => pass through only files that have been changed
- rename       => easily rename, add suffixes/prefixes to files
- del          => delete specified files and/or folders
- plumber      => Prevent pipe breaking caused by errors

## Todo:
1. Include SourceMaps for tmp and dist
2. Switch to ES6 syntax (e.g. arrow function notation)
3. Upgrade to Gulp4
4. Add relative file paths
