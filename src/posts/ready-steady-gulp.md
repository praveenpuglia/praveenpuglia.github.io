---
layout: post
title: Ready Steady Gulp!
date: 2015-06-28
---

Lately, if something has totally changed the way I work, it's [Gulp](http://gulpjs.com/) - _the streaming build system_ . There are lot of cool things you can do with gulp with great flexibility. Let's get started!

## Installation

[NodeJS and NPM must be installed.](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

Gulp needs to be installed both **globally** ( for command line usage ) and **locally** into our project( for creating project tasks )

#### Global Installation

```bash
sudo npm install -g gulp
```

#### Local Installation

```bash
cd path/to/your/project/root
npm install gulp --save-dev
```

## Hello World!

Assuming our project directory is `my-project`, create a `gulpfile.js` file in it. All gulp tasks reside in this file.
Now, we create our first task that prints _Hello_ .

```js
// require gulp. this is why we install gulp locally.
var gulp = require("gulp");

// say hello
gulp.task("sayHello", function () {
  console.log("Hello");
});
```

- First, we require `gulp` so we can use gulp's API for creating tasks.
- Next, we create a task using `gulp.task` method with the task name being `sayHello` and an anonymous function that defines what `sayHello` does. In this case, we just print Hello.

## Executing a Task

Most of the work with gulp happens on the command line. To run a task, we navigate to our project directory( or the directory containing `gulpfile.js` ) and ask gulp to run a specific task.

```text
my-project
    /gulpfile.js  <- YOU GOTTA BE WHERE THIS FILE IS
```

```bash
cd my-project
gulp sayHello
```

Did you see what happened? It might look something like this...

```bash
$ gulp sayHello
[15:30:28] Using gulpfile ~/code/my-project/gulpfile.js
[15:30:28] Starting 'sayHello'...
Hello
[15:30:28] Finished 'sayHello' after 83 μs
```

Following along? Great!

## Dependent Tasks

It's easy to make one task wait for another to finish. This is done by passing an array of tasks as the second parameter to `gulp.task` method.

```js
// say world after saying hello is done
gulp.task("sayWorld", ["sayHello"], function () {
  console.log("World!");
});
```

Move over to terminal and execute `gulp world`.

## The Default Task

If we move over to terminal and execute `gulp`, without specifying a task name, it looks for a task named `default`. Go ahead! give it a try.

```js
gulp.task("default", function () {
  console.log("La la la!");
});
```

## Exploring Gulp's API

Gulp has 3 other methods `.src`,`.dest` & `.watch` apart from `.task`. We'll look into those by trying to minify CSS, a real world use case for gulp.

Before we go ahead, we need to know a little more about how gulp works. Gulp generates a stream from the files we pass in via `gulp.src`  method. We then `pipe` the stream through various processors like minify, uglify, sass, sourcemaps etc. Remember, all the processing done, is still on the generated stream and not written to disk. To do that, we use `gulp.dest` .

### Minify CSS

Create a style.css in css directory and put the following content.

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
body,
html {
  height: 100%;
}
```

We will install [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css) plugin to do the minification.

```bash
npm install gulp-minify-css --save-dev
```

In gulpfile.js, we require this module just like we did it for gulp.

```js
var minify = require("gulp-minify-css");
```

```js
// minify css
gulp.task("css:minify", function () {
  gulp.src("css/style.css").pipe(minify()).pipe(gulp.dest("min"));
});
```

So what did we do?

- We create a new task named `css:minify`  (namespacing is good).
- We tell gulp which sources to use to build the stream to process using `gulp.src` and passing in the file path.
- We then `pipe` the generated stream through the `minify` process.
- Finally, we pipe the processed stream through `gulp.dest` which then writes the new, minified `style.css` inside `min` directory.

The last thing I want to mention is how to watch files for changes. In our example, we'll setup a `watch` task and look for changes in `.css` files. Whenever that happens, we would want the `css:minify` task to run automatically. Here's how.

```js
// watch for changes in source
gulp.task("watch", function () {
  gulp.watch("css/style.css", ["css:minify"]);
});
```

On terminal execute `gulp watch`. It may look like the the prompt has hanged but it's actually watching for file changes. Let's go ahead and add some new rules in **style.css**, save it and see what happens!

In the next post, I'll write about file include patterns, various recipes for doing things like sass compilation, generating sourcemaps, cleaning directories before running tasks and more. Stay tuned!
