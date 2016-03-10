# MCFI
This repo just holds the views part of the overall application. I gave up trying to get Visual Studio and the project running. All values within these views are **hard coded** and should be removed/replaced when/if migrated over to MVC.

Part of an ongoing [UW-Parkside Software Engineering II](http://green.uwp.edu/departments/computer.science/courses/csci476.cfm) project.

## Prerequisites

This project uses:

* [Node.js](https://nodejs.org/en/)
* [Jekyll](https://jekyllrb.com/)

Following the appropriate installation guide to get both up and running on your system.


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

This will build the project and launch your default browser showing the built project. Any change you make in the styles, javascript, or html, will be reflected instantly in your browser.


## Contributing


1. [Fork](https://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/mcfi.git
   # Navigate to the newly cloned directory
   cd mcfi
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/ciscoo/mcfi.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description against the `master` branch.
