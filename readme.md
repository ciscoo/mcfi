# MCFI
This repo just holds the views part of the overall application. I gave up trying to get Visual Studio and the project running. All values within these views are **hard coded** and should be removed/replaced when/if migrated over to MVC.

Part of an ongoing [UW-Parkside Software Engineering II](http://green.uwp.edu/departments/computer.science/courses/csci476.cfm) project.

## Prerequisites

This project uses the [Node.js](https://nodejs.org/en/) to build/compile, primarily the [Sass](http://sass-lang.com/) part. Following the appropiate installation guide to get Node.js up and running on your system.


## Installation
After you've cloned the repo, the following will get you up and running all systems:

### Install gulp.js
[gulp.js](http://gulpjs.com/) is a fantastic streaming build system built on Node.js. Install it with the following in your terminal:

```
$ npm install --global gulp-cli
```

### Install Dependencies

Navigate over to the repo's directory root and run the following to install the projects dependencies:

```
$ npm install
```

## gulp

Run the following in your terminal:

```
$ gulp serve
```

This will build the project and launch your default browser showing the built project. Any change you make in the styles, javascript, or html, will be reflected instantly in your browser. How? [Browsersync](https://www.browsersync.io/) magic.
